/**
 * BloodDonut — segmented ring chart for biomarker tier breakdown.
 *
 * Shows three arcs (In range / Watch / Action) sized proportionally to
 * the marker counts, with the total marker count rendered in the middle.
 * Designed to be the visual centrepiece of the Insights hub.
 *
 * The chart is pure SVG (no external dependency) and inherits the brand
 * sage / amber / rose palette so it sits naturally inside any glass card.
 */

interface BloodDonutProps {
  t1: number          // In range
  t2: number          // Watch
  t3: number          // Action
  size?: number       // outer diameter, px
  thickness?: number  // ring stroke width, px
  /** When true, renders an empty ring + dashed muted style. */
  emptyState?: boolean
}

const TIER_COLOR = {
  t1: '#6F8F6B', // sage
  t2: '#D9A05B', // amber
  t3: '#C97A7A', // rose
} as const

export function BloodDonut({
  t1,
  t2,
  t3,
  size = 184,
  thickness = 14,
  emptyState = false,
}: BloodDonutProps) {
  const total = t1 + t2 + t3
  const empty = emptyState || total === 0

  const r = (size - thickness) / 2
  const c = 2 * Math.PI * r
  const cx = size / 2
  const cy = size / 2

  // With round linecaps, each rendered arc end extends visually by half the
  // stroke thickness past its dash endpoint. We a) shorten each dash by
  // exactly that amount on both sides so the proportions stay accurate,
  // and b) leave a small gap between segments so the rounded ends have
  // breathing room (rather than touching/overlapping into a hard seam).
  const tierCount = [t1, t2, t3].filter((n) => n > 0).length
  const gap = total > 0 && tierCount > 1 ? thickness * 0.45 : 0 // px along the arc
  const capInset = thickness / 2                                 // px per end

  let offset = 0
  const segments = (
    [
      ['t1', t1] as const,
      ['t2', t2] as const,
      ['t3', t3] as const,
    ]
      .filter(([, count]) => count > 0)
      .map(([key, count]) => {
        const arc = (count / total) * c
        const start = offset + capInset + gap / 2
        const length = Math.max(arc - thickness - gap, 0.0001)
        offset += arc
        return {
          key,
          color: TIER_COLOR[key as keyof typeof TIER_COLOR],
          length,
          start,
        }
      })
  )

  // Headline percentage = T1 / total (i.e. share of markers in range).
  const inRangePct = total > 0 ? Math.round((t1 / total) * 100) : 0

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="block -rotate-90 overflow-visible">
        <defs>
          {/* Soft drop shadow so the ring has a touch of depth on the
              glass card — sage-tinted, very low intensity. */}
          <filter id="donut-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" />
            <feOffset dy="1" result="off" />
            <feComponentTransfer in="off" result="dim">
              <feFuncA type="linear" slope="0.28" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="dim" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Faint background ring */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="rgba(26,28,26,0.06)"
          strokeWidth={thickness}
        />

        {/* Empty state: a single dashed sage ring at low opacity */}
        {empty && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(111,143,107,0.32)"
            strokeWidth={thickness}
            strokeDasharray="4 8"
            strokeLinecap="round"
          />
        )}

        {/* Live segments — rounded caps for a smooth, modern feel */}
        {!empty && (
          <g filter="url(#donut-shadow)">
            {segments.map((s) => (
              <circle
                key={s.key}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={thickness}
                strokeLinecap="round"
                strokeDasharray={`${s.length} ${c}`}
                strokeDashoffset={-s.start}
              />
            ))}
          </g>
        )}
      </svg>

      {/* Centre label — total markers + headline % in range */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
        {empty ? (
          <>
            <div className="font-sans text-[28px] font-bold text-ink-3 leading-none tabular-nums">
              0
            </div>
            <div className="text-[10.5px] uppercase tracking-wider text-ink-3 mt-1.5">
              No markers yet
            </div>
          </>
        ) : (
          <>
            <div className="font-sans text-[40px] font-bold text-ink leading-none tabular-nums tracking-tight">
              {inRangePct}
              <span className="text-[18px] font-semibold text-ink-2 ml-0.5">%</span>
            </div>
            <div className="text-[10.5px] uppercase tracking-wider text-sage-deep mt-1.5 font-semibold">
              In range
            </div>
            <div className="text-caption text-ink-3 mt-1">
              {total} marker{total === 1 ? '' : 's'}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
