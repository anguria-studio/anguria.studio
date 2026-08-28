/**
 * The six home-page feature ids. Presentation keys, never shown to the user:
 * they bind a dictionary label (lib/dictionaries/en.ts) to an icon
 * (components/feature-icons.tsx), and their ORDER is the grid's reading order —
 * so it lives here rather than in each translation, where a translator could
 * accidentally reshuffle the layout.
 */
export const featureIds = [
  "swift",
  "glass",
  "privacy",
  "custom",
  "speed",
  "source",
] as const;

export type FeatureId = (typeof featureIds)[number];
