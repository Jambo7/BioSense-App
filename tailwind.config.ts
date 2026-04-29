import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand backgrounds — warm cream + surface levels (sage-olive rebrand)
        bg:  '#F5F1EC',
        s1:  '#FAF7F2',
        s2:  '#EFEAE3',
        s3:  '#E5DFD6',
        s4:  '#D9D2C7',
        // Text — warm near-black hierarchy
        t1:  '#1A1A16',
        t2:  '#5A5751',
        t3:  '#8A8780',
        t4:  '#B8B5AE',
        // Brand accent — Sage / olive green
        accent:      '#6E9B5E',
        'accent-dim':'#5A7040',
        // Brand secondary — kept for legacy refs
        grape:       '#6E9B5E',
        'grape-dim': '#5A7040',
        // Semantic health colours (not brand colours)
        opt:  '#22C55E',
        near: '#3B82F6',
        attn: '#F59E0B',
        oor:  '#EF4444',
        urg:  '#DC2626',
      },
      fontFamily: {
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        mono:  ['var(--font-jetbrains)', 'SF Mono', 'monospace'],
      },
      borderColor: {
        DEFAULT: 'rgba(26,26,22,0.07)',
        subtle:  'rgba(26,26,22,0.11)',
        medium:  'rgba(26,26,22,0.16)',
        accent:  'rgba(110,155,94,0.25)',
        grape:   'rgba(110,155,94,0.25)',
      },
      backgroundColor: {
        'accent-subtle': 'rgba(110,155,94,0.08)',
        'grape-subtle':  'rgba(110,155,94,0.08)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1',   transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.85)' },
        },
        blink: {
          '0%, 80%, 100%': { opacity: '0.2', transform: 'scale(0.75)' },
          '40%':           { opacity: '1',   transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 380ms cubic-bezier(0.16,1,0.3,1) forwards',
        pulse:     'pulse 2s infinite',
        blink:     'blink 0.9s ease infinite',
      },
    },
  },
  plugins: [],
}
export default config
