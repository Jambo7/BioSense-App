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

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(26,28,26,0.07)"
          strokeWidth={thickness}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={tones[tone]}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 700ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-sans font-bold text-ink leading-none" style={{ fontSize: size * 0.32 }}>
          {Math.round(clamped)}
        </div>
        {label && (
          <div className="text-caption text-ink-2 mt-1.5">{label}</div>
        )}
        {sublabel && (
          <div className="text-micro text-ink-3 mt-0.5">{sublabel}</div>
        )}
      </div>
    </div>
  )
}
