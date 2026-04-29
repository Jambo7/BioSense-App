import { cn } from '@/lib/utils'

interface ScoreRingProps {
  value: number
  max?: number
  size?: number
  thickness?: number
  label?: string
  sublabel?: string
  tone?: 'sage' | 'rose' | 'amber' | 'ink'
  className?: string
  glow?: boolean
  centerSize?: number
}

/**
 * Circular SVG progress ring. Hero element across the moodboard
 * (Recovery, Energy, Health Score, Biological Age).
 *
 * Track is `--sand-deep`; arc colour follows tone.
 */
export function ScoreRing({
  value,
  max = 100,
  size = 132,
  thickness = 9,
  label,
  sublabel,
  tone = 'sage',
  className,
  glow = false,
  centerSize,
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(value, max))
  const pct = clamped / max
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const dashOffset = c * (1 - pct)

  const tones = {
    sage:  '#6F8F6B',
    rose:  '#C97A7A',
    amber: '#D9A05B',
    ink:   '#1A1C1A',
  }

  const glowTones = {
    sage:  'rgba(168,191,163,0.45)',
    rose:  'rgba(201,122,122,0.35)',
    amber: 'rgba(217,160,91,0.35)',
    ink:   'rgba(26,28,26,0.20)',
  }

  const numberSize = centerSize ?? size * 0.32

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      {glow && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glowTones[tone]} 0%, transparent 65%)`,
            transform: 'scale(1.35)',
          }}
        />
      )}
      <svg width={size} height={size} className="-rotate-90 relative">
        <defs>
          <linearGradient id={`ring-grad-${tone}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor={tones[tone]} stopOpacity="0.85" />
            <stop offset="100%" stopColor={tones[tone]} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(26,28,26,0.06)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-grad-${tone})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 900ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className="font-sans font-bold text-ink leading-none tabular-nums"
          style={{ fontSize: numberSize, letterSpacing: '-0.03em' }}
        >
          {Math.round(clamped)}
        </div>
        {label && (
          <div
            className="italic-accent text-base mt-2 leading-none"
            style={{ fontSize: numberSize * 0.34 }}
          >
            {label}
          </div>
        )}
        {sublabel && (
          <div className="text-micro uppercase tracking-[0.14em] text-ink-3 mt-1.5">{sublabel}</div>
        )}
      </div>
    </div>
  )
}
