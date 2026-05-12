import Image from 'next/image'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/biosense-wordmark.png'
const MARK_SRC = '/biosense-mark.png'
const LOGO_W = 1024
const LOGO_H = 215
const ASPECT = LOGO_W / LOGO_H // ≈ 4.76

interface BrandWordmarkProps {
  /** Rendered height in px. Width is derived from the original 1024×215 ratio. */
  height?: number
  className?: string
  priority?: boolean
}

/**
 * Official BioSense wordmark — full lockup (Bio + sage S mark + ense).
 * Always uses the supplied PNG so the proportions and colours are pixel-true
 * to the brand sheet. For separate icon-only use see {@link BrandMark}.
 */
export function BrandWordmark({ height = 26, className = '', priority }: BrandWordmarkProps) {
  const width = Math.round(height * ASPECT)
  return (
    <Image
      src={LOGO_SRC}
      alt="BioSense"
      width={width}
      height={height}
      priority={priority}
      className={cn('block select-none', className)}
      sizes={`${width}px`}
    />
  )
}

interface BrandMarkProps {
  /** Rendered size of the icon in px (square). */
  size?: number
  className?: string
  /** Kept for API compatibility — colour comes from the asset, so this is ignored. */
  tone?: 'sage' | 'ink' | 'white'
}

/**
 * The official sage "S" mark, served from a dedicated square asset.
 * Pixel-true to the brand sheet — no cropping or transforms.
 */
export function BrandMark({ size = 28, className = '' }: BrandMarkProps) {
  return (
    <Image
      src={MARK_SRC}
      alt="BioSense"
      width={size}
      height={size}
      className={cn('block select-none', className)}
      sizes={`${size}px`}
    />
  )
}

interface IntelligenceMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** When true, intensifies the animation (faster pulse + faster shimmer) to
   *  signal the AI is actively generating a response. */
  thinking?: boolean
  className?: string
}

const SIZES: Record<NonNullable<IntelligenceMarkProps['size']>, { outer: number; mark: number }> = {
  sm: { outer: 28, mark: 16 },
  md: { outer: 40, mark: 22 },
  lg: { outer: 56, mark: 32 },
  xl: { outer: 80, mark: 46 },
}

/**
 * Animated, "intelligent" badge built around the brand S mark.
 *
 *   ┌──────── breathing sage halo (extends past the badge) ────────┐
 *   │   ┌──── slow conic shimmer ring (subtle sage edge) ────┐    │
 *   │   │   ┌──── white capsule with soft sage rim ────┐     │    │
 *   │   │   │            sage S, breathing             │     │    │
 *   │   │   └──────────────────────────────────────────┘     │    │
 *   │   └────────────────────────────────────────────────────┘    │
 *   └─────────────────────────────────────────────────────────────┘
 *
 * The `thinking` prop swaps the two animations to faster variants so the mark
 * visibly "comes alive" while a reply is being generated.
 */
export function IntelligenceMark({
  size = 'md',
  thinking = false,
  className,
}: IntelligenceMarkProps) {
  const { outer, mark } = SIZES[size]
  const ringInset = -Math.max(2, Math.round(outer * 0.06))

  return (
    <span
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: outer, height: outer }}
      aria-hidden
    >
      {/* Constant ambient sage glow — the dominant visual. A soft, even
          halo that breathes slowly so the badge always looks "lit". */}
      <span
        className={cn(
          'absolute rounded-full pointer-events-none',
          thinking ? 'animate-mark-halo-fast' : 'animate-mark-halo',
        )}
        style={{
          inset: -Math.round(outer * 0.20),
          background:
            'radial-gradient(circle, rgba(168,191,163,0.65) 0%, rgba(168,191,163,0.30) 40%, transparent 75%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Subtle rotating drift — gives a hint of life on top of the
          constant glow. Peaks are kept low so it's a soft drift, not two
          bright travelling spots. */}
      <span
        className={cn(
          'absolute rounded-full pointer-events-none',
          thinking ? 'animate-mark-spin-fast' : 'animate-mark-spin',
        )}
        style={{
          inset: ringInset,
          background:
            'conic-gradient(from 0deg, transparent 0deg, rgba(168,191,163,0.30) 80deg, rgba(111,143,107,0.45) 105deg, rgba(168,191,163,0.30) 130deg, transparent 200deg, transparent 290deg, rgba(168,191,163,0.25) 320deg, transparent 360deg)',
          filter: 'blur(2px)',
        }}
      />

      {/* Inner white capsule with subtle sage rim + glassy highlight */}
      <span
        className="absolute inset-[2px] rounded-full bg-white ring-1 ring-inset ring-[rgba(168,191,163,0.40)]"
        style={{
          boxShadow:
            'inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -3px 8px rgba(168,191,163,0.20)',
        }}
      />

      {/* The brand S mark, breathing */}
      <BrandMark size={mark} className="relative z-10 animate-mark-breathe" />
    </span>
  )
}
