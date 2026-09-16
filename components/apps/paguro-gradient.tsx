"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import styles from "./paguro-hero.module.css";

const vertex = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uLightMode;
uniform float uDark;
out vec4 fragColor;
#define S(a,b,t) smoothstep(a,b,t)
mat2 Rot(float a){float s=sin(a),c=cos(a);return mat2(c,-s,s,c);} 
vec2 hash(vec2 p){p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));return fract(sin(p)*43758.5453);} 
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);float n=mix(mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),u.y);return 0.5+0.5*n;}
void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  float horizontal=S(edge0,edge1,blendX);
  float vertical=1.0-S(v1,v0,tuv.y);
  float greenWeight=(1.0-horizontal)*(1.0-vertical);
  float blueWeight=horizontal*vertical;
  float yellowWeight=1.0-greenWeight-blueWeight;
  // Keep warm accents smaller, giving most of their coverage to emerald.
  float reclaimed=yellowWeight*0.25;
  vec3 col=colDark*(greenWeight+reclaimed*0.8)
    +colLav*(blueWeight+reclaimed*0.2)+colOrg*(yellowWeight-reclaimed);

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){grainUv+=vec2(iTime*0.05);} 
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  if(uLightMode>0.5){
    float energy=max(max(col.r,col.g),col.b);
    vec3 hue=col/max(energy,0.001);
    float chroma=length(col-vec3(dot(col,vec3(0.333333))));
    float coverage=clamp(0.12+chroma*1.15+energy*0.18,0.0,0.88);
    col=mix(vec3(1.0),clamp(hue*0.58+col*0.18,0.0,1.0),coverage);
  }

  // A softly irregular rounded blob, with a stationary fading perimeter.
  vec2 edge=abs(uv-0.5)*2.0;
  float boundary=pow(pow(edge.x,4.0)+pow(edge.y,4.0),0.25);
  float alpha=1.0-smoothstep(0.68,1.0,boundary);
  col*=mix(1.0,0.72,uDark);
  o=vec4(col,alpha);
}
void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}
`;



export function PaguroGradient() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    let dispose = () => {};

    function setup() {
      dispose();
      if (!container || motion.matches) return;
      const canvas = document.createElement("canvas");
      // Explicitly probe WebGL2 so unsupported browsers retain the artwork.
      const context = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: false });
      if (!context) return;
      const renderer = new Renderer({ canvas, webgl: 2, alpha: true, antialias: false,
        premultipliedAlpha: false, dpr: Math.min(window.devicePixelRatio || 1, 1.5) });
      const gl = renderer.gl;
      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex, fragment,
        uniforms: {
          iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) },
          uTimeSpeed: { value: 0.18 }, uColorBalance: { value: 0 },
          uWarpStrength: { value: 1.1 }, uWarpFrequency: { value: 4 },
          uWarpSpeed: { value: 1.2 }, uWarpAmplitude: { value: 35 },
          uBlendAngle: { value: -25 }, uBlendSoftness: { value: 0.18 },
          uRotationAmount: { value: 160 }, uNoiseScale: { value: 2 },
          uGrainAmount: { value: 0.075 }, uGrainScale: { value: 2 },
          uGrainAnimated: { value: 0 }, uContrast: { value: 1.15 },
          uGamma: { value: 1 }, uSaturation: { value: 1.15 },
          uCenterOffset: { value: new Float32Array([0, 0]) }, uZoom: { value: 0.95 },
          uColor1: { value: new Float32Array([0.46, 0.62, 0.88]) },
          uColor2: { value: new Float32Array([0.98, 0.80, 0.28]) },
          uColor3: { value: new Float32Array([0.015, 0.27, 0.14]) },
          uLightMode: { value: 0 }, uDark: { value: 0 },
        },
      });
      if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) {
        geometry.remove(); program.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return;
      }
      const mesh = new Mesh(gl, { geometry, program });
      container.appendChild(canvas);
      let raf = 0, last = 0, elapsed = 0, visible = false, lost = false;
      const render = () => {
        if (lost) return;
        renderer.render({ scene: mesh });
        container.dataset.ready = "true";
      };
      const setTheme = () => {
        const theme = document.documentElement.dataset.theme;
        program.uniforms.uDark.value = theme === "dark" || (theme !== "light" && systemTheme.matches) ? 1 : 0;
        render();
      };
      const resize = () => {
        const rect = container.getBoundingClientRect();
        renderer.setSize(Math.max(1, Math.round(rect.width)), Math.max(1, Math.round(rect.height)));
        program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]);
        render();
      };
      const stop = () => { cancelAnimationFrame(raf); raf = 0; last = 0; };
      const loop = (now: number) => {
        raf = requestAnimationFrame(loop);
        if (!last) last = now;
        if (now-last < 1000/30) return;
        elapsed += Math.min(now-last, 100); last = now;
        program.uniforms.iTime.value = elapsed / 1000;
        render();
      };
      const update = () => {
        if (visible && !document.hidden && !lost) {
          if (!raf) raf = requestAnimationFrame(loop);
        } else stop();
      };
      const onLost = (event: Event) => {
        event.preventDefault(); lost = true; stop(); delete container.dataset.ready;
      };
      const onRestored = () => setup();
      const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
      observer.observe(container);
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);
      const themeObserver = new MutationObserver(setTheme);
      themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
      document.addEventListener("visibilitychange", update);
      systemTheme.addEventListener("change", setTheme);
      canvas.addEventListener("webglcontextlost", onLost);
      canvas.addEventListener("webglcontextrestored", onRestored);
      resize(); setTheme();
      dispose = () => {
        stop(); observer.disconnect(); resizeObserver.disconnect(); themeObserver.disconnect();
        document.removeEventListener("visibilitychange", update);
        systemTheme.removeEventListener("change", setTheme);
        canvas.removeEventListener("webglcontextlost", onLost);
        canvas.removeEventListener("webglcontextrestored", onRestored);
        canvas.remove(); delete container.dataset.ready;
        geometry.remove(); program.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    }
    setup();
    motion.addEventListener("change", setup);
    return () => { motion.removeEventListener("change", setup); dispose(); };
  }, []);
  return <div ref={ref} className={styles.gradient} aria-hidden="true" />;
}
