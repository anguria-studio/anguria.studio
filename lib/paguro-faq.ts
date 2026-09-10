/** One row as the observer saw it: which row, and whether it is on screen. */
export type Sighting = { index: number; intersecting: boolean };

/** A row's place in the cascade it arrived with. */
export type Arrival = { index: number; position: number };

/**
 * Which rows arrive on this observer callback, and in what order.
 *
 * Positions are BATCH-relative, not absolute indices: they restart at 0 every
 * call. A jump to #questions or a fast flick hands the observer all seven rows
 * at once and they cascade 0..6; a slow scroll hands it one row at a time and
 * each gets position 0, arriving the moment it appears instead of waiting out a
 * delay earned by rows that were already read.
 *
 * `played` is the once-per-load latch. An arrival is an arrival: scrolling back
 * up does not make a row arrive again, so a row that has run is never re-listed.
 */
export function arrivals(entries: readonly Sighting[], played: ReadonlySet<number>): Arrival[] {
  return entries
    .filter((entry) => entry.intersecting && !played.has(entry.index))
    // DOM order, not the order the observer happened to report them in: the
    // cascade has to run down the list, and entry order is not guaranteed.
    .sort((a, b) => a.index - b.index)
    .map((entry, position) => ({ index: entry.index, position }));
}

/**
 * The observer's opening report, split into rows that arrive now and rows to
 * hold blank until they do.
 *
 * The first callback is the only one that describes every observed row at once,
 * so it is the only moment at which "this row has not arrived yet" can be told
 * apart from "this row was not mentioned". Rows already inside the trigger band
 * arrive here, exactly as any later batch would, and so never spend a frame
 * hidden — that is what keeps a reload part-way down the page, or a jump to
 * #questions, from blinking. Everything else becomes pending: still visible in
 * the markup, blanked by CSS only once this split has run.
 */
export function firstBatch(entries: readonly Sighting[]): { arriving: Arrival[]; pending: number[] } {
  return {
    arriving: arrivals(entries, new Set()),
    pending: entries.filter((entry) => !entry.intersecting).map((entry) => entry.index).sort((a, b) => a - b),
  };
}
