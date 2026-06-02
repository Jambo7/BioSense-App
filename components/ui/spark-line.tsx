import { cn } from '@/lib/utils'

interface SparkLineProps {
  values: number[]
  width?: number
  height?: number
  tone?: 'sage' | 'rose' | 'amber' | 'violet' | 'sky' | 'teal' | 'ink' | 'sand'
  showFill?: boolean
  showDots?: boolean
  highlightLast?: boolean
  className?: string
}

/**
 * Smooth-curve spark line. Used everywhere on the dashboard and
 * reports for trend strips and biomarker history.
 */
export function SparkLine({
  values,
  width = 120,
  height = 36,
  tone = 'sage',
  showFill = true,
  showDots = false,
  highlightLast = false,
  className,
}: SparkLineProps) {
  if (values.length < 2) return <div style={{ width, height }} className={className} />

  const tones = {
    sage:   { stroke: '#6F8F6B', fill: 'rgba(111,143,107,0.16)' },
    rose:   { stroke: '#C97A7A', fill: 'rgba(201,122,122,0.14)' },
    amber:  { stroke: '#D9A05B', fill: 'rgba(217,160,91,0.14)' },
    violet: { stroke: '#8B7BB8', fill: 'rgba(139,123,184,0.16)' },
    sky:    { stroke: '#6B93C4', fill: 'rgba(107,147,196,0.16)' },
    teal:   { stroke: '#5BA89B', fill: 'rgba(91,168,155,0.16)' },
    ink:    { stroke: '#1A1C1A', fill: 'rgba(26,28,26,0.08)' },
    sand:   { stroke: '#B8A890', fill: 'rgba(184,168,144,0.14)' },
  }

  const min = Math.min(...values)
  const max = Math.max(...values)
  const range = max - min || 1
  const pad = 3
  const innerW = width - pad * 2
  const innerH = height - pad * 2

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * innerW
    const y = pad + innerH - ((v - min) / range) * innerH
    return [x, y] as const
  })

  // Catmull-Rom → cubic Bézier for smooth curves
  const path = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p[0]} ${p[1]}`
      const p0 = arr[i - 2] ?? arr[i - 1]
      const p1 = arr[i - 1]
      const p2 = p
      const p3 = arr[i + 1] ?? p
      const cp1x = p1[0] + (p2[0] - p0[0]) / 6
      const cp1y = p1[1] + (p2[1] - p0[1]) / 6
      const cp2x = p2[0] - (p3[0] - p1[0]) / 6
      const cp2y = p2[1] - (p3[1] - p1[1]) / 6
      return `C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2[0]} ${p2[1]}`
    })
    .join(' ')

  const areaPath = `${path} L ${pad + innerW} ${pad + innerH} L ${pad} ${pad + innerH} Z`
  const t = tones[tone]
  const last = points[points.length - 1]

  return (
    <svg width={width} height={height} className={cn('block', className)}>
      {showFill && <path d={areaPath} fill={t.fill} />}
      <path d={path} fill="none" stroke={t.stroke} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
      {showDots && points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={1.75} fill={t.stroke} />
      ))}
      {highlightLast && (
        <>
          <circle cx={last[0]} cy={last[1]} r={4.5} fill="#fff" />
          <circle cx={last[0]} cy={last[1]} r={3} fill={t.stroke} />
        </>
      )}
    </svg>
  )
}

interface BarStripProps {
  values: number[]
  labels?: string[]
  highlightIndex?: number
  highlightTone?: 'rose' | 'sage' | 'amber' | 'violet' | 'sky' | 'teal'
  height?: number
  className?: string
}

/**
 * Compact bar strip (e.g. day-of-week pattern snapshot in moodboard
 * weekly report — Mon–Sun bars with worst day highlighted).
 */
export function BarStrip({
  values,
  labels,
  highlightIndex,
  highlightTone = 'rose',
  height = 56,
  className,
}: BarStripProps) {
  const max = Math.max(...values, 1)
  const tones = {
    sage:   '#6F8F6B',
    rose:   '#C97A7A',
    amber:  '#D9A05B',
    violet: '#8B7BB8',
    sky:    '#6B93C4',
    teal:   '#5BA89B',
  }
  const hl = tones[highlightTone]

  return (
    <div className={cn('flex items-end gap-2 w-full', className)} style={{ height }}>
      {values.map((v, i) => {
        const isHl = i === highlightIndex
        const pct = (v / max) * 100
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
            <div
              className="w-full rounded-md transition-all"
              style={{
                height: `${Math.max(pct, 6)}%`,
                background: isHl ? hl : 'rgba(168,191,163,0.55)',
              }}
            />
            {labels?.[i] && (
              <div
                className={cn('text-[9.5px]', isHl ? 'font-semibold' : 'text-ink-3')}
                style={isHl ? { color: hl } : undefined}
              >
                {labels[i]}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
