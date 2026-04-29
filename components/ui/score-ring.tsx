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
  breathe?: boolean
  centerSize?: number
}

/**
 * Multi-stop gradient ring with optional halo glow + slow breathing animation.
 * The hero metric across the moodboard (Recovery, Energy, Health Score…)
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
  breathe = false,
  centerSize,
}: ScoreRingProps) {
  const clamped = Math.max(0, Math.min(value, max))
  const pct = clamped / max
  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const dashOffset = c * (1 - pct)

  // Multi-stop gradients per tone — adds dimensionality to the arc
  const stops = {
    sage:  [
      { o: '0%',   c: '#B8CFB3' },
      { o: '55%',  c: '#7DA379' },
      { o: '100%', c: '#5A7556' },
    ],
    rose:  [
      { o: '0%',   c: '#E5B5B5' },
      { o: '55%',  c: '#CD8B8B' },
      { o: '100%', c: '#A85454' },
    ],
    amber: [
      { o: '0%',   c: '#EDC68A' },
      { o: '55%',  c: '#D9A05B' },
      { o: '100%', c: '#A77530' },
    ],
    ink:   [
      { o: '0%',   c: '#5A5C5A' },
      { o: '100%', c: '#1A1C1A' },
    ],
  }

  const glowTones = {
    sage:  'rgba(168,191,163,0.55)',
    rose:  'rgba(201,122,122,0.40)',
    amber: 'rgba(217,160,91,0.40)',
    ink:   'rgba(26,28,26,0.20)',
  }

  const labelColors = {
    sage:  '#5A7556',
    rose:  '#A8504D',
    amber: '#A77530',
    ink:   '#1A1C1A',
  }

  const numberSize = centerSize ?? size * 0.32
  const gradId = `ring-grad-${tone}-${size}`

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      {/* Outer halo */}
      {glow && (
        <div
          className={cn('absolute inset-0 rounded-full pointer-events-none', breathe && 'breathe')}
          style={{
            background: `radial-gradient(circle, ${glowTones[tone]} 0%, transparent 65%)`,
            transform: 'scale(1.40)',
          }}
        />
      )}

      {/* Inner soft fill behind the number for premium depth */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size - thickness * 2.4,
          height: size - thickness * 2.4,
          background: 'radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.35) 70%, transparent 100%)',
        }}
      />

      <svg width={size} height={size} className="-rotate-90 relative">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            {stops[tone].map((s) => (
              <stop key={s.o} offset={s.o} stopColor={s.c} />
            ))}
          </linearGradient>
        </defs>
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(26,28,26,0.05)"
          strokeWidth={thickness}
        />
        {/* Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={thickness}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 1100ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div
          className="font-sans font-bold leading-none tabular-nums"
          style={{
            fontSize: numberSize,
            letterSpacing: '-0.035em',
            color: '#1A1C1A',
          }}
        >
          {Math.round(clamped)}
        </div>
        {label && (
          <div
            className="italic-accent leading-none mt-2"
            style={{ fontSize: numberSize * 0.34, color: labelColors[tone] }}
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
