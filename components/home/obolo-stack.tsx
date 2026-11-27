import type { CSSProperties } from "react";
import styles from "./home-bento.module.css";

const layers = [
  { depth: 94, color: "#00a1aa" },
  { depth: 18, color: "#f98099" },
  { depth: 16, color: "#05bde5" },
  { depth: 12, color: "#c66db0" },
  { depth: 11, color: "#a392eb" },
  { depth: 8, color: "#888990" },
  { depth: 6, color: "#43a160" },
];

export function OboloStack() {
  let top = 224;

  return (
    <svg className={styles.oboloChart} width={320} height={297} viewBox="0 0 320 297" aria-hidden="true">
      <g className={styles.oboloChartGrid} fill="none" strokeWidth="1.5">
        <path d="M160 158 276 224 160 290 44 224Z" strokeDasharray="5 5" />
        <path strokeOpacity=".55" d="M63.33 213 179.33 279 M82.67 202 198.67 268 M102 191 218 257 M121.33 180 237.33 246 M140.67 169 256.67 235 M63.33 235 179.33 169 M82.67 246 198.67 180 M102 257 218 191 M121.33 268 237.33 202 M140.67 279 256.67 213" />
      </g>

      {layers.map(({ depth, color }, index) => {
        top -= depth;
        return (
          <g key={color} className={styles.oboloTier} transform={`translate(160 ${top})`} data-stack-base={index === 0 ? true : undefined}>
            <g
              className={styles.oboloLayer}
              style={{ "--layer-index": index } as CSSProperties}
              fill={color}
              stroke={color}
              strokeWidth="2"
              strokeLinejoin="round"
              data-bento-part="stack-layer"
              data-bento-end={index === layers.length - 1 ? true : undefined}
            >
              <path fillOpacity=".18" d={`M-84 0 0 48 V${48 + depth} L-84 ${depth}Z`} />
              <path fillOpacity=".27" d={`M0 48 84 0 V${depth} L0 ${48 + depth}Z`} />
              <path fillOpacity=".23" d="M0 -48 84 0 0 48 -84 0Z" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
