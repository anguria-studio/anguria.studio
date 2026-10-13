// Port of the scanning animation in Moppo/App/DesignSystem/MoppoMascot.swift.
// Keep the values and the behavior in step with the app.

export type MascotPose = { body: number[]; eyes: number[][]; pivot: number[] };
export type MascotGeometry = {
  right: MascotPose;
  front: MascotPose;
  left: MascotPose;
  tailWeights: number[];
  bounds: number[];
};

type Point = [number, number];

const T = {
  speed: 0.8,
  // Look
  gazeX: 21, gazeY: 31,
  holdMin: 0.7, holdMax: 1.4,
  eyeSquash: 0.05,
  eyeStiffness: 210,
  // Blink
  blinkEvery: 2.2,
  blinkOnMove: 0.25, blinkOnTurn: 0.55,
  blinkDuration: 0.17,
  // Body
  headShift: 60, tilt: 7,
  headStiffness: 145, headDamping: 0.62,
  // Mop tails
  tailStiffness: 200, tailDamping: 0.1,
  drag: 0.25,
  sway: 0.75, swayHz: 0.25, waveLength: 195, strandPhase: 0.8,
  // Turning around
  turnStiffness: 280, turnDamping: 0.85,
  turnTailStiffness: 180, turnTailDamping: 0.7,
  turnDrag: 0.8,
  eyeLead: 0.14,
  // Beams
  beamColor: [242, 179, 0] as const,
  beamLength: 1500, beamStartWidth: 30, beamSpread: 0.2, beamOpacity: 1,
  chargeTime: 0.3, fireTime: 0.21, sweepTime: 1, offTime: 0.25, restTime: 2.3,
  sweepRange: 55, maxUp: 40, maxDown: 45,
  recoil: 350, offSquash: 0.13,
  turnBetweenShots: 0.4, turnWhileShooting: 0.4,
  shotBlinkEvery: 1.1,
  flashSize: 460, flashWindow: 0.85,
  // Floor light
  floorFlatness: 0.1,
  poolGlowSize: 1.45, poolBrightness: 0.75, poolCore: 0.5,
};

const GAZE_SPOTS: Point[] = [
  [-1, 0], [1, 0], [-0.8, -0.8], [0.8, -0.8], [0, -1],
  [-0.7, 0.7], [0.7, 0.7], [0, 0], [0.2, 0.3], [-0.4, -0.2],
];

type Phase = "rest" | "turning" | "charge" | "fire" | "sweep" | "off";

class Spring {
  velocity = 0;
  constructor(public value: number) {}

  step(target: number, stiffness: number, damping: number, dt: number) {
    const acceleration = stiffness * (target - this.value) - 2 * damping * Math.sqrt(stiffness) * this.velocity;
    this.velocity += acceleration * dt;
    this.value += this.velocity * dt;
  }
}

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const easeInOut = (p: number) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
const rgba = ([r, g, b]: readonly number[], alpha: number) => `rgba(${r},${g},${b},${clamp(alpha, 0, 1)})`;

function point(values: number[], index: number): Point {
  return [values[index * 2], values[index * 2 + 1]];
}

/** Blends the three poses. `turn` is 1 for right, 0 for front, and -1 for left. */
function blend(right: Point, front: Point, left: Point, turn: number): Point {
  const [target, amount] = turn >= 0 ? [right, turn] : [left, -turn];
  return [front[0] + (target[0] - front[0]) * amount, front[1] + (target[1] - front[1]) * amount];
}

/** Draws a closed outline with curves through the midpoints of the samples. */
function traceRing(ctx: CanvasRenderingContext2D, points: Point[]) {
  const first = points[0], last = points[points.length - 1];
  ctx.moveTo((last[0] + first[0]) / 2, (last[1] + first[1]) / 2);
  for (let i = 0; i < points.length; i++) {
    const p = points[i], q = points[(i + 1) % points.length];
    ctx.quadraticCurveTo(p[0], p[1], (p[0] + q[0]) / 2, (p[1] + q[1]) / 2);
  }
  ctx.closePath();
}

type FloorSpot = { x: number; y: number; radiusX: number; radiusY: number; light: number };
type BeamShape = {
  origin: Point; fadeEnd: Point; end: Point;
  startHalfWidth: number; endHalfWidth: number;
  normal: Point; floor: FloorSpot | null;
};

/** The scanning behavior: Moppo looks around, turns, and fires short sweeps of amber beams. */
export class MoppoScanMotion {
  private turn = new Spring(1);
  private turnTail = new Spring(1);
  private eyeX = new Spring(0);
  private eyeY = new Spring(0);
  private headX = new Spring(0);
  private headY = new Spring(0);
  private headAngle = new Spring(0);
  private tailX = new Spring(0);
  private tailY = new Spring(0);
  private tailAngle = new Spring(0);

  // Moppo only rests facing right (1) or left (-1). It passes the front pose while it turns.
  private facing = 1;
  private pendingFacing: number | null = null;
  private pendingAt = 0;
  private gaze: Point = [0, 0];
  private micro: Point = [0, 0];
  private blinkElapsed: number | null = null;
  private pendingBlinkAt: number | null = null;
  private time = 0;
  private nextGaze = 0;
  private nextBlink = 2;

  // Beams. elevation is in degrees below (positive) or above (negative) the horizon.
  // The horizontal side comes from the turn, so the beams follow Moppo when it turns around.
  private phase: Phase = "rest";
  private phaseStart = 0;
  private phaseEnd = 0.5;
  private sweepFrom = 0;
  private sweepTo = 0;
  private elevation = 0;
  private turnInSweep = false;
  private nextShotBlink = 0;
  private beamLength = new Spring(0);
  private beamThickness = new Spring(0);
  private eyeGlow = new Spring(0);
  private squash = new Spring(0);

  /** Advances the animation by the real time since the last frame, in seconds. */
  advance(seconds: number) {
    const dt = clamp(seconds, 0, 0.05) * T.speed;
    const steps = Math.max(1, Math.ceil(dt / 0.004));
    for (let i = 0; i < steps; i++) this.update(dt / steps);
  }

  private update(dt: number) {
    this.time += dt;
    this.updateBeams(dt);
    if (this.pendingFacing !== null && this.time >= this.pendingAt) {
      this.facing = this.pendingFacing;
      this.pendingFacing = null;
    }
    if (this.pendingBlinkAt !== null && this.time >= this.pendingBlinkAt) {
      this.startBlink();
      this.pendingBlinkAt = null;
    }
    if (this.blinkElapsed !== null) {
      this.blinkElapsed = this.blinkElapsed + dt > T.blinkDuration ? null : this.blinkElapsed + dt;
    }

    this.turn.step(this.facing, T.turnStiffness, T.turnDamping, dt);
    this.turnTail.step(this.turn.value, T.turnTailStiffness, T.turnTailDamping, dt);
    this.eyeX.step(this.gaze[0] + this.micro[0], T.eyeStiffness, 0.85, dt);
    this.eyeY.step(this.gaze[1] + this.micro[1], T.eyeStiffness, 0.85, dt);
    this.headX.step(this.gaze[0] * T.headShift, T.headStiffness, T.headDamping, dt);
    this.headY.step(this.gaze[1] * T.headShift * 0.5, T.headStiffness, T.headDamping, dt);
    this.headAngle.step(this.gaze[0] * T.tilt, T.headStiffness, T.headDamping, dt);
    // The tails chase the head with a looser spring, so they trail behind and overshoot.
    this.tailX.step(this.headX.value, T.tailStiffness, T.tailDamping, dt);
    this.tailY.step(this.headY.value, T.tailStiffness, T.tailDamping, dt);
    this.tailAngle.step(this.headAngle.value, T.tailStiffness, T.tailDamping, dt);
  }

  private updateBeams(dt: number) {
    this.stepBeamPhase();
    const phase = this.phase;
    const isFiring = phase === "charge" || phase === "fire" || phase === "sweep" || phase === "off";
    if (isFiring) {
      const { direction } = this.beamDirection();
      this.gaze = [direction[0] * 0.9, direction[1] * 0.9];
      this.micro = [0, 0];
    } else if (phase === "rest" && this.time >= this.nextGaze) {
      this.pickGaze();
      this.nextGaze = this.time + rand(T.holdMin, T.holdMax);
    }
    if (!isFiring && this.time >= this.nextBlink) {
      this.startBlink();
      this.nextBlink = this.time + rand(T.blinkEvery * 0.6, T.blinkEvery * 1.4);
    }
    // Blinks while shooting cut the beams for a moment.
    if (phase === "sweep" && this.time >= this.nextShotBlink) {
      this.startBlink();
      this.nextShotBlink = this.time + rand(T.shotBlinkEvery * 0.5, T.shotBlinkEvery * 1.5);
    }
    if (phase === "sweep") {
      this.elevation = this.clampElevation(this.sweepFrom + (this.sweepTo - this.sweepFrom) * easeInOut(this.phaseProgress));
    }

    const progress = this.phaseProgress;
    const isOn = phase === "fire" || phase === "sweep";
    const glowTarget = phase === "charge" || isOn || (phase === "off" && progress < 0.6) ? 1 : 0;
    const lengthTarget = isOn || (phase === "off" && progress < 0.4) ? 1 : 0;
    const thicknessTarget = isOn ? 1 : phase === "off" ? 0.08 : 0;
    this.eyeGlow.step(glowTarget, 500, 0.9, dt);
    this.beamLength.step(lengthTarget, 500, 0.85, dt);
    this.beamThickness.step(thicknessTarget, 600, 0.8, dt);
    this.squash.step(phase === "off" ? T.offSquash : 0, 300, 0.45, dt);
  }

  private get phaseProgress() {
    return Math.min(1, (this.time - this.phaseStart) / Math.max(0.001, this.phaseEnd - this.phaseStart));
  }

  private stepBeamPhase() {
    // Turn around in the middle of a sweep. The beams follow the turn to the new side and keep sweeping.
    if (this.phase === "sweep" && this.turnInSweep && this.pendingFacing === null
      && this.time >= this.phaseStart + (this.phaseEnd - this.phaseStart) * 0.35) {
      this.turnInSweep = false;
      this.turnAround();
      this.pickSweep(this.elevation);
      this.setPhase("sweep", T.sweepTime);
      return;
    }
    if (this.time < this.phaseEnd) return;
    switch (this.phase) {
      case "rest":
        if (Math.random() < T.turnBetweenShots) {
          this.turnAround();
          this.setPhase("turning", T.eyeLead + 0.35);
        } else {
          this.startCharge();
        }
        break;
      case "turning":
        this.startCharge();
        break;
      case "charge": {
        this.setPhase("fire", T.fireTime);
        // Firing pushes the head back, away from the beams.
        const { direction } = this.beamDirection();
        this.headX.velocity -= direction[0] * T.recoil;
        this.headY.velocity -= direction[1] * T.recoil * 0.5;
        break;
      }
      case "fire":
        this.setPhase("sweep", T.sweepTime);
        this.turnInSweep = Math.random() < T.turnWhileShooting;
        this.nextShotBlink = this.time + rand(T.shotBlinkEvery * 0.5, T.shotBlinkEvery * 1.5);
        break;
      case "sweep":
        this.setPhase("off", T.offTime);
        break;
      case "off":
        this.setPhase("rest", T.restTime);
        break;
    }
  }

  private setPhase(next: Phase, duration: number) {
    this.phase = next;
    this.phaseStart = this.time;
    this.phaseEnd = this.time + duration;
  }

  private startCharge() {
    // Aim toward the side Moppo faces, then sweep up or down within the allowed angles.
    this.pickSweep(rand(-T.maxUp, T.maxDown));
    this.elevation = this.sweepFrom;
    this.setPhase("charge", T.chargeTime);
  }

  private pickSweep(start: number) {
    this.sweepFrom = start;
    const direction = start > (T.maxDown - T.maxUp) / 2 ? -1 : 1;
    this.sweepTo = this.clampElevation(start + direction * T.sweepRange * rand(0.6, 1));
  }

  private clampElevation(value: number) {
    return clamp(value, -T.maxUp, T.maxDown);
  }

  /** Mid turn, Moppo faces the viewer, so the beams point out of the screen and look short. */
  private beamDirection(): { direction: Point; reach: number } {
    const e = (this.elevation * Math.PI) / 180;
    const side = clamp(this.turn.value, -1, 1);
    const x = side * Math.cos(e), y = Math.sin(e);
    const length = Math.hypot(x, y);
    if (length === 0) return { direction: [0, 1], reach: 0.2 };
    return { direction: [x / length, y / length], reach: Math.max(0.2, length) };
  }

  private pickGaze() {
    let spot: Point;
    do {
      spot = GAZE_SPOTS[Math.floor(Math.random() * GAZE_SPOTS.length)];
    } while (Math.hypot(spot[0] - this.gaze[0], spot[1] - this.gaze[1]) < 0.6);
    this.gaze = [spot[0] * rand(0.8, 1), spot[1] * rand(0.8, 1)];
    if (Math.random() < T.blinkOnMove) this.startBlink();
  }

  private turnAround() {
    if (this.pendingFacing !== null) return;
    const next = -this.facing;
    // The eyes look toward the new side first. Then the body turns.
    this.gaze = [next * 0.9, rand(-0.3, 0.2)];
    this.micro = [0, 0];
    this.pendingFacing = next;
    this.pendingAt = this.time + T.eyeLead;
    this.nextGaze = this.time + T.eyeLead + rand(T.holdMin, T.holdMax) + 0.4;
    if (Math.random() < T.blinkOnTurn) this.pendingBlinkAt = this.time + T.eyeLead * 0.5;
  }

  private startBlink() {
    if (this.blinkElapsed === null) this.blinkElapsed = 0;
  }

  private get eyeOpenness() {
    if (this.blinkElapsed === null) return 1;
    const p = this.blinkElapsed / T.blinkDuration;
    if (p < 0.35) return 1 - (p / 0.35) * 0.94;
    if (p < 0.5) return 0.06;
    return 0.06 + ((p - 0.5) / 0.5) * 0.94;
  }

  // Drawing

  /**
   * Draws one frame in glyph coordinates. The caller sets the transform from glyph units to canvas pixels.
   * `floorY` is the floor in glyph units. The beams stop there, so they do not cross the text below Moppo.
   */
  draw(ctx: CanvasRenderingContext2D, geometry: MascotGeometry, bodyColor: string, floorY: number) {
    const { right, front, left, tailWeights } = geometry;
    const headTurn = this.turn.value, tailTurn = this.turnTail.value;
    const pivot = blend(point(right.pivot, 0), point(front.pivot, 0), point(left.pivot, 0), headTurn);

    const body: Point[] = [];
    for (let i = 0; i < tailWeights.length; i++) {
      const weight = tailWeights[i];
      const pointTurn = headTurn + (tailTurn - headTurn) * T.turnDrag * weight;
      body.push(this.deform(blend(point(right.body, i), point(front.body, i), point(left.body, i), pointTurn), weight, pivot));
    }

    const openness = this.eyeOpenness;
    const gazeOffset: Point = [this.eyeX.value * T.gazeX, this.eyeY.value * T.gazeY];
    const eyes: Point[][] = [];
    const eyeCenters: Point[] = [];
    for (let e = 0; e < 2; e++) {
      const count = right.eyes[e].length / 2;
      const eye: Point[] = [];
      for (let i = 0; i < count; i++) {
        eye.push(blend(point(right.eyes[e], i), point(front.eyes[e], i), point(left.eyes[e], i), headTurn));
      }
      const c: Point = [eye.reduce((s, p) => s + p[0], 0) / count, eye.reduce((s, p) => s + p[1], 0) / count];
      // The eye on the far side of the gaze narrows a little, which reads as turning.
      const side = e === 0 ? -1 : 1;
      const squash = 1 - T.eyeSquash * Math.max(0, -side * this.eyeX.value) - T.eyeSquash * 0.4 * Math.abs(this.eyeX.value);
      eyes.push(eye.map(([x, y]) => this.deform(
        [c[0] + (x - c[0]) * squash + gazeOffset[0], c[1] + (y - c[1]) * openness + gazeOffset[1]], 0, pivot)));
      eyeCenters.push(this.deform([c[0] + gazeOffset[0], c[1] + gazeOffset[1]], 0, pivot));
    }

    const beams = this.beamShapes(eyeCenters, openness, floorY);
    // The lit floor goes behind Moppo, so the tails cover it where they overlap.
    this.drawFloorLight(ctx, beams);

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    traceRing(ctx, body);
    ctx.fill();
    // The eyes are holes, so they show whatever is behind Moppo.
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    eyes.forEach((eye) => traceRing(ctx, eye));
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    this.drawBeams(ctx, beams, eyes, eyeCenters, openness);
  }

  private beamShapes(eyeCenters: Point[], openness: number, floorY: number): BeamShape[] {
    const thickness = Math.max(0, this.beamThickness.value) * openness;
    const length = T.beamLength * Math.max(0, this.beamLength.value);
    if (length <= 1 || thickness <= 0.005) return [];
    const { direction, reach } = this.beamDirection();
    const normal: Point = [-direction[1], direction[0]];
    const spread = T.beamSpread * thickness;
    const startHalfWidth = (T.beamStartWidth * thickness) / 2;
    const reachLength = length * reach;

    return eyeCenters.map((o) => {
      const fadeEnd: Point = [o[0] + direction[0] * reachLength, o[1] + direction[1] * reachLength];
      let drawn = reachLength;
      let floor: FloorSpot | null = null;
      const toFloor = direction[1] > 0.02 ? (floorY - o[1]) / direction[1] : -1;
      // Every downward beam reaches the floor. Past the beam's length its light has faded out,
      // so a far spot fades in as the angle gets steeper instead of appearing at once.
      if (toFloor > 0 && toFloor < reachLength * 3) {
        drawn = reachLength * 3;
        const farHalfWidth = startHalfWidth + drawn * spread;
        const far: Point = [o[0] + direction[0] * drawn, o[1] + direction[1] * drawn];
        // The oval's ends are where the two edges of the beam meet the floor.
        const edgeX = (side: number) => {
          const start: Point = [o[0] + normal[0] * startHalfWidth * side, o[1] + normal[1] * startHalfWidth * side];
          const tip: Point = [far[0] + normal[0] * farHalfWidth * side, far[1] + normal[1] * farHalfWidth * side];
          if (tip[1] <= floorY || tip[1] <= start[1]) return tip[0];
          const u = Math.max(0, (floorY - start[1]) / (tip[1] - start[1]));
          return start[0] + (tip[0] - start[0]) * u;
        };
        const x1 = edgeX(1), x2 = edgeX(-1);
        const across = startHalfWidth + Math.min(toFloor, reachLength) * spread;
        // The beam fades along its length, so a far floor gets less light. Light at an angle also spreads out.
        const light = T.poolBrightness * Math.max(0, 1 - toFloor / reachLength) * Math.min(1, direction[1] * 1.4) * thickness;
        floor = {
          x: (x1 + x2) / 2, y: floorY,
          radiusX: Math.max(1, Math.abs(x2 - x1) / 2), radiusY: across * T.floorFlatness, light,
        };
      }
      const end: Point = [o[0] + direction[0] * drawn, o[1] + direction[1] * drawn];
      return { origin: o, fadeEnd, end, startHalfWidth, endHalfWidth: startHalfWidth + drawn * spread, normal, floor };
    });
  }

  private drawFloorLight(ctx: CanvasRenderingContext2D, beams: BeamShape[]) {
    const core = T.poolCore;
    for (const beam of beams) {
      const spot = beam.floor;
      if (!spot) continue;
      const light = clamp(spot.light, 0, 1);
      if (light <= 0.01) continue;
      ctx.save();
      ctx.translate(spot.x, spot.y);
      ctx.scale(spot.radiusX * T.poolGlowSize, spot.radiusY * T.poolGlowSize);
      // A hot, paler core that fades to the beam color at the edge.
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      pool.addColorStop(0, rgba([255, 150 + 80 * core, 140 * core], light * (0.4 + 0.6 * core)));
      pool.addColorStop(0.35, rgba(T.beamColor, light * 0.75));
      pool.addColorStop(1, rgba(T.beamColor, 0));
      ctx.fillStyle = pool;
      ctx.beginPath();
      ctx.arc(0, 0, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawBeams(ctx: CanvasRenderingContext2D, beams: BeamShape[], eyes: Point[][], eyeCenters: Point[], openness: number) {
    const glow = clamp(this.eyeGlow.value, 0, 1);
    if (glow > 0.01) {
      ctx.fillStyle = rgba(T.beamColor, glow);
      ctx.beginPath();
      eyes.forEach((eye) => traceRing(ctx, eye));
      ctx.fill();
    }
    if (beams.length === 0) return;

    // Facing the viewer mid turn, each beam blooms into a soft disc over its eye.
    const thickness = Math.max(0, this.beamThickness.value) * openness;
    const facingViewer = Math.max(0, 1 - Math.abs(this.turn.value) / T.flashWindow)
      * Math.min(1, Math.max(0, this.beamLength.value)) * thickness;
    if (T.flashSize > 0 && facingViewer > 0.01) {
      const f = facingViewer * facingViewer * (3 - 2 * facingViewer);
      const radius = T.beamStartWidth / 2 + T.flashSize * f;
      for (const o of eyeCenters) {
        const disc = ctx.createRadialGradient(o[0], o[1], 0, o[0], o[1], radius);
        disc.addColorStop(0, rgba(T.beamColor, T.beamOpacity * f));
        disc.addColorStop(0.55, rgba(T.beamColor, T.beamOpacity * f * 0.6));
        disc.addColorStop(1, rgba(T.beamColor, 0));
        ctx.fillStyle = disc;
        ctx.beginPath();
        ctx.arc(o[0], o[1], radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (const shape of beams) {
      const { origin: o, end, normal: n, startHalfWidth: w0, endHalfWidth: w1, floor } = shape;
      ctx.save();
      // The beam keeps its straight shape. The floor hides it below the floor line, except inside the lit oval,
      // so the beam's foot follows the oval's rim. Both outlines run in the same direction, so they make one region.
      if (floor) {
        ctx.beginPath();
        ctx.rect(-100000, -100000, 200000, 100000 + floor.y);
        ctx.ellipse(floor.x, floor.y, floor.radiusX, floor.radiusY, 0, 0, Math.PI * 2);
        ctx.clip();
      }
      const fade = ctx.createLinearGradient(o[0], o[1], shape.fadeEnd[0], shape.fadeEnd[1]);
      fade.addColorStop(0, rgba(T.beamColor, T.beamOpacity));
      fade.addColorStop(1, rgba(T.beamColor, 0));
      ctx.fillStyle = fade;
      ctx.beginPath();
      ctx.moveTo(o[0] + n[0] * w0, o[1] + n[1] * w0);
      ctx.lineTo(end[0] + n[0] * w1, end[1] + n[1] * w1);
      ctx.lineTo(end[0] - n[0] * w1, end[1] - n[1] * w1);
      ctx.lineTo(o[0] - n[0] * w0, o[1] - n[1] * w0);
      // A round end behind the eye.
      const aim = Math.atan2(-n[0], n[1]);
      ctx.arc(o[0], o[1], w0, aim + Math.PI / 2, aim - Math.PI / 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /** Bends the posed shape. Points near the head follow the head, and points near the tips lag and sway. */
  private deform(p: Point, w: number, pivot: Point): Point {
    // Powering down the beams flattens the body a little.
    const dx = (p[0] - pivot[0]) * (1 + this.squash.value * 0.6);
    const dy = (p[1] - pivot[1]) * (1 - this.squash.value);
    const radius = Math.hypot(dx, dy), theta = Math.atan2(dy, dx);
    const wave = ((T.sway * Math.PI) / 180) * w
      * Math.sin(2 * Math.PI * T.swayHz * this.time - (radius / T.waveLength) * 2 * Math.PI + theta * T.strandPhase);
    const angle = ((this.headAngle.value + (this.tailAngle.value - this.headAngle.value) * T.drag * w) * Math.PI) / 180 + wave;
    const offsetX = this.headX.value + (this.tailX.value - this.headX.value) * T.drag * w;
    const offsetY = this.headY.value + (this.tailY.value - this.headY.value) * T.drag * w;
    const c = Math.cos(angle), s = Math.sin(angle);
    return [pivot[0] + dx * c - dy * s + offsetX, pivot[1] + dx * s + dy * c + offsetY];
  }
}
