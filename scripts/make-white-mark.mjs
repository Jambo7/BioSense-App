// One-off script: converts the official `biosense-mark.png` (green S on solid
// white background) into a true alpha-transparent white-on-transparent PNG
// for use inside the sage-gradient nav CTA.
//
// Algorithm: per-pixel, set RGB to pure white and derive alpha from how
// far the source pixel is from white. White pixels → transparent. Sage
// pixels → opaque white. Antialiased edges get smooth alpha automatically.
//
// Run from the project root:
//   node scripts/make-white-mark.mjs

import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PUBLIC = path.resolve(__dirname, '..', 'public')
const SRC = path.join(PUBLIC, 'biosense-mark.png')
const OUT = path.join(PUBLIC, 'biosense-mark-white.png')

const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info
if (channels !== 4) throw new Error(`expected 4 channels, got ${channels}`)

const out = Buffer.alloc(data.length)

for (let i = 0; i < data.length; i += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]

  // "Inkiness" — how non-white the source pixel is. min(R,G,B) of pure
  // white is 255 (inkiness 0). Even the LIGHTEST sage in the brand mark's
  // gradient has min ~163 (inkiness ~92), so we want a gain that pushes
  // anything inky to fully opaque. ×6 means any pixel ≥ ~7 darker than
  // pure white becomes ~50% opaque, and anything ≥ 43 darker becomes
  // fully opaque — keeping a clean, slightly soft anti-aliased edge.
  const minChannel = Math.min(r, g, b)
  const inkiness = 255 - minChannel
  const alpha = Math.min(255, inkiness * 6)

  out[i] = 255
  out[i + 1] = 255
  out[i + 2] = 255
  out[i + 3] = alpha
}

await sharp(out, { raw: { width, height, channels: 4 } })
  .png({ compressionLevel: 9 })
  .toFile(OUT)

console.log(`wrote ${OUT} (${width}×${height})`)
