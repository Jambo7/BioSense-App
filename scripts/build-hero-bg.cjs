const sharp = require('sharp')

// Source: the brief-style scene (branch + pot anchored top-right, clean
// cream wall filling the rest). It's landscape (1536x1024), but the phone
// is a tall portrait — object-cover would zoom hard into the right strip
// and smear the branches across the whole top (behind the headline).
//
// Fix: rebuild it as a tall PORTRAIT canvas that matches a phone's aspect
// ratio (~9:19.5). We keep the scene at the top and replicate the clean
// wall downward so the full composition renders as designed: foliage in the
// top-right corner, calm empty wall behind the text — exactly like the brief.
// We also gently mute the greens + lift brightness to match the brief's
// softer, airier tone.
const SRC = 'public/dashboard-hero-leaves-v4.png'
const OUT = 'public/dashboard-hero-leaves-v6.png'

const SRC_W = 1536
const SRC_H = 1024
const TARGET_RATIO = 9 / 19.5 // ≈ 0.4615 (tall modern phone)
const TARGET_H = Math.round(SRC_W / TARGET_RATIO) // ≈ 3328
const OVERLAP = 80 // overlap seams to hide them

// Push the whole scene (branch + pot) down by a touch so the pot sits a
// little lower in the frame rather than hugging the very top edge. A soft
// cream band + feather above lets the branch emerge cleanly into the wall.
const SHIFT_TOP = 240
const EXTEND_BOTTOM = TARGET_H - SRC_H - SHIFT_TOP

async function run() {
  const tone = { saturation: 0.82, brightness: 1.06 } // softer, brighter

  // The scene (branch + pot top-right, clean wall) at the top.
  const scene = await sharp(SRC).modulate(tone).png().toBuffer()

  // A smooth continuation of the wall: take a strip of the lower wall,
  // blur it heavily (kills any vertical banding) and stretch it to fill the
  // rest of the tall canvas — keeps the natural warm-right / cool-left
  // horizontal light falloff without streaks.
  const fillH = EXTEND_BOTTOM + OVERLAP
  const wall = await sharp(SRC)
    .modulate(tone)
    .extract({ left: 0, top: SRC_H - 200, width: SRC_W, height: 200 })
    .blur(60)
    .resize(SRC_W, fillH, { fit: 'fill' })
    .png()
    .toBuffer()

  // Soft cream feather over the top: opaque at the very top fading to
  // transparent just past the shift, so the scene's top edge blends into the
  // wall and the branch fades in gently instead of showing a hard seam.
  const featherH = SHIFT_TOP + 160
  const feather = Buffer.from(
    `<svg width="${SRC_W}" height="${featherH}" xmlns="http://www.w3.org/2000/svg">
       <defs>
         <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
           <stop offset="0%"   stop-color="rgb(240,236,228)" stop-opacity="1"/>
           <stop offset="55%"  stop-color="rgb(240,236,228)" stop-opacity="1"/>
           <stop offset="100%" stop-color="rgb(240,236,228)" stop-opacity="0"/>
         </linearGradient>
       </defs>
       <rect width="${SRC_W}" height="${featherH}" fill="url(#g)"/>
     </svg>`,
  )

  await sharp({
    create: {
      width: SRC_W,
      height: TARGET_H,
      channels: 3,
      background: { r: 240, g: 236, b: 228 },
    },
  })
    .composite([
      { input: wall, top: SHIFT_TOP + SRC_H - OVERLAP, left: 0 },
      { input: scene, top: SHIFT_TOP, left: 0 },
      { input: feather, top: 0, left: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT)
  console.log(`done -> ${OUT} (${SRC_W}x${TARGET_H}, shift ${SHIFT_TOP})`)
}

run().catch((e) => {
  console.error(e)
  process.exit(1)
})
