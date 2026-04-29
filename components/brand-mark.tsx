import Image from 'next/image'
import { cn } from '@/lib/utils'

const LOGO_SRC = '/biosense-wordmark.png'
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
 * Just the sage "S" mark from the official wordmark, extracted via CSS clip.
 * Useful in tight spaces (favicons, small headers) where the full wordmark
 * would be too long. Because it's clipped from the same asset, the colour
 * and proportions match the brand sheet exactly.
 *
 * The "S" sits roughly in the horizontal middle of the wordmark — we crop a
 * square window around it.
 */
export function BrandMark({ size = 28, className = '' }: BrandMarkProps) {
  // Slice the middle ~21.5% of the wordmark width (where the S sits)
  // and scale the underlying image so that slice fills our square box.
  const fullW = size / 0.215            // total scaled width of the underlying image
  const fullH = fullW / ASPECT          // matching scaled height
  const offsetX = (fullW - size) / 2 * -1
  const offsetY = (fullH - size) / 2 * -1
  return (
    <span
      className={cn('relative inline-block overflow-hidden align-middle', className)}
      style={{ width: size, height: size }}
      aria-label="BioSense"
    >
      <Image
        src={LOGO_SRC}
        alt=""
        width={Math.round(fullW)}
        height={Math.round(fullH)}
        className="absolute max-w-none"
        style={{ left: offsetX, top: offsetY }}
        sizes={`${Math.round(fullW)}px`}
      />
    </span>
  )
}
