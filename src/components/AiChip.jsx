import { forwardRef } from "react";
import { Cpu } from "lucide-react";

/** Glowing AI microchip with circuit traces - the convergence point of scene 4. */
const AiChip = forwardRef((_props, ref) => {
  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <div className="bloom absolute size-[26rem] max-w-[90vw] rounded-full opacity-70 blur-2xl" />

      <svg
        className="absolute size-[22rem] max-w-[88vw] text-primary/35"
        viewBox="0 0 320 320"
        fill="none"
        aria-hidden="true"
      >
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`rotate(${i * 90} 160 160)`}>
            <path
              d="M160 116V70M160 70h44v-30"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M132 116V88h-42V52"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle cx="204" cy="40" r="3" fill="currentColor" />
            <circle cx="90" cy="52" r="3" fill="currentColor" />
          </g>
        ))}
        <rect
          x="96"
          y="96"
          width="128"
          height="128"
          rx="18"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      <div className="relative flex size-32 items-center justify-center rounded-3xl bg-primary shadow-[var(--shadow-glow-strong)] sm:size-40">
        <div className="absolute inset-1.5 rounded-[1.35rem] border border-primary-foreground/25" />
        <span className="font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
          AI
        </span>
        <Cpu className="absolute -bottom-3 -right-3 size-8 rounded-xl bg-card p-1.5 text-primary shadow-[var(--shadow-glow)]" />
      </div>
    </div>
  );
});
AiChip.displayName = "AiChip";

export default AiChip;
