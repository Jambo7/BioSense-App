/*
 * Generates public/bg-waves.svg — the app background.
 *
 * Replaces the old plant-pot photo (per client note: "the plant is causing
 * it") with a calm, slightly high-tech field of flowing topographic / wind-map
 * streamlines in soft sage, concentrated in the upper-right and fading down —
 * matching the reference mock (UI Updates_3rd June, image2).
 *
 * Pure Node (no deps) so it can be re-run anytime: `node scripts/build-waves-bg.cjs`.
 */
const fs = require('fs')
const path = require('path')

const W = 390
const H = 844

// Sage palette (lightest → deepest) cycled across the lines.
const PALETTE = ['#C8D6C5', '#A8BFA3', '#6F8F6B']

const N = 52 // number of streamlines
const X0 = -60
const X1 = 450
const STEP = 6

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v))

function lineY(baseY, x, k) {
  const t = (x - X0) / (X1 - X0) // 0 (left) → 1 (right)
  // Big shared S-sweep so all lines read as one flowing current.
  const sweep = 74 * Math.sin(t * Math.PI * 1.05 - 0.35)
  // Amplitude grows toward the right, so lines fan + bunch on that side.
  const amp = 5 + 34 * t
  const phase = k * 0.4
  const freq = 0.0115 + (k % 5) * 0.0006
  let wobble = amp * Math.sin(phase + x * freq)
  wobble += amp * 0.34 * Math.sin(phase * 1.7 + x * freq * 2.1 + 1.0)
  return baseY + sweep + wobble
}

function buildPath(baseY, k) {
  let d = ''
  for (let x = X0; x <= X1; x += STEP) {
    const y = lineY(baseY, x, k)
    d += (d === '' ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1) + ' '
  }
  return d.trim()
}

const lines = []
for (let k = 0; k < N; k++) {
  const baseY = -40 + (k * 400) / N // spread across the top ~half
  const color = PALETTE[k % PALETTE.length]
  // Top lines read strongest; opacity tapers as the bundle descends.
  const op = clamp(0.22 - (baseY / 360) * 0.14, 0.045, 0.22)
  const sw = (0.55 + (k % 3) * 0.16).toFixed(2)
  lines.push(
    `  <path d="${buildPath(baseY, k)}" stroke="${color}" stroke-width="${sw}" ` +
      `stroke-opacity="${op.toFixed(3)}" fill="none" stroke-linecap="round"/>`,
  )
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" fill="none" preserveAspectRatio="xMidYMin slice">
  <defs>
    <radialGradient id="bloom" cx="78%" cy="10%" r="55%">
      <stop offset="0%" stop-color="#B8CFB3" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="#A8BFA3" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#A8BFA3" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="wash" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#6F8F6B" stop-opacity="0.05"/>
      <stop offset="45%" stop-color="#FAFAF8" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FAFAF8" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fadeBottom" x1="50%" y1="0%" x2="50%" y2="100%">
      <stop offset="0%" stop-color="#FAFAF8" stop-opacity="0"/>
      <stop offset="100%" stop-color="#FAFAF8" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <!-- base wash -->
  <rect width="${W}" height="${H}" fill="url(#wash)"/>
  <!-- soft upper-right bloom -->
  <ellipse cx="${W * 0.78}" cy="80" rx="220" ry="150" fill="url(#bloom)"/>

  <!-- flowing streamlines -->
  <g>
${lines.join('\n')}
  </g>

  <!-- gently fade the bundle into the page toward the bottom -->
  <rect x="0" y="380" width="${W}" height="${H - 380}" fill="url(#fadeBottom)"/>
</svg>
`

const out = path.join(__dirname, '..', 'public', 'bg-waves-v2.svg')
fs.writeFileSync(out, svg)
console.log(`done -> ${out} (${svg.length} bytes, ${N} lines)`)
