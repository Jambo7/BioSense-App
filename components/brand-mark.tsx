interface BrandMarkProps {
  size?: number
  className?: string
  tone?: 'sage' | 'ink' | 'white'
}

/**
 * BioSense mark — flowing double-loop infinity-style "8" rendered
 * in solid sage (matches moodboard brand identity sheet).
 */
export function BrandMark({ size = 28, className = '', tone = 'sage' }: BrandMarkProps) {
  const stroke = tone === 'sage' ? '#6F8F6B' : tone === 'white' ? '#FFFFFF' : '#1A1C1A'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BioSense"
    >
      <path
        d="M 18 4
           C 11 4   6  8.5  6 13.5
           C 6  17  10 19   18 20
           C 26 21 30 23.5  30 28
           C 30 32  25 33   18 32"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 18 4
           C 25 4   30  8   30 12.5
           C 30 17  26 19   18 20"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.55"
      />
    </svg>
  )
}

interface WordmarkProps {
  size?: number
  textSize?: number
  tone?: 'sage' | 'ink' | 'white'
  className?: string
}

export function BrandWordmark({ size = 26, textSize = 16, tone = 'ink', className = '' }: WordmarkProps) {
  const textColor = tone === 'white' ? '#FFFFFF' : tone === 'sage' ? '#5A7556' : '#1A1C1A'
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <BrandMark size={size} tone={tone === 'ink' ? 'sage' : tone} />
      <span
        className="font-sans font-semibold tracking-[-0.015em]"
        style={{ fontSize: textSize, color: textColor }}
      >
        BioSense
      </span>
    </span>
  )
}
