/*
 * Builds public/bg-dna.png — the app background.
 *
 * Takes the generated glowing-DNA-helix art and composes it onto a tall
 * portrait canvas so the helix tucks into the TOP-LEFT corner (mirrored from
 * the source, which has it on the right) and fades softly into the app's
 * cream — same "anchored in a corner" placement the old plant pot had, but
 * a cool, slightly-neon high-tech feel instead.
 *
 * Re-run: `node scripts/build-dna-bg.cjs`
 */
const sharp = require('sharp')
const path = require('path')

const SRC = process.argv[2] // absolute path to the generated raw art
const SIDE = (process.argv[3] || 'right').toLowerCase() // 'left' | 'right'
// Versioned filename so new builds bust the browser / service-worker /
// Next image caches (they key on the URL).
const OUT = path.join(__dirname, '..', 'public', 'bg-dna-v3.png')

const W = 1080
const H = 2340 // ~9:19.5 tall phone portrait

// Where the helix should reach before fully dissolving into cream.
const FEATHER = 320

async function run() {
  // Source art has the helix on the RIGHT. Keep it there for SIDE='right',
  // or mirror to the LEFT for SIDE='left'.
  const base = SIDE === 'left' ? sharp(SRC).flop() : sharp(SRC)
  const meta = await base.metadata()
  const scaledH = Math.round(W * (meta.height / meta.width))
  const helix = await base.resize(W, scaledH, { fit: 'fill' }).png().toBuffer()

  // Sample a cream pixel from the clean (empty) side — opposite the helix.
  const sampleLeft = SIDE === 'left' ? W - 24 : 16
  const { data } = await sharp(helix)
    .extract({ left: sampleLeft, top: 16, width: 8, height: 8 })
    .resize(1, 1)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const cream = { r: data[0], g: data[1], b: data[2] }
  const creamCss = `rgb(${cream.r},${cream.g},${cream.b})`

  // Feather band that melts the helix's hard bottom edge into the cream.
  const feather = Buffer.from(
    `<svg width="${W}" height="${FEATHER}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%"  stop-color="${creamCss}" stop-opacity="0"/>
           <stop offset="78%" stop-color="${creamCss}" stop-opacity="1"/>
           <stop offset="100%" stop-color="${creamCss}" stop-opacity="1"/>
         </linearGradient>
       </defs>
       <rect width="${W}" height="${FEATHER}" fill="url(#g)"/>
     </svg>`,
  )

  await sharp({
    create: { width: W, height: H, channels: 3, background: cream },
  })
    .composite([
      { input: helix, top: 0, left: 0 },
      { input: feather, top: Math.max(scaledH - FEATHER, 0), left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT)

  console.log(`done -> ${OUT} (${W}x${H}, cream ${creamCss}, helix ${scaledH}px tall)`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
