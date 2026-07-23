/**
 * Per-biomarker drill-down content: plain-language explanations, lifestyle
 * steps and supplement suggestions. Rich, hand-written entries cover the
 * most common markers; everything else gets category-aware generated copy
 * so every marker in the catalogue supports the full
 * List → Explanations → Comparisons journey.
 *
 * Client-side only (imports lucide icons) — keep API routes importing from
 * `lib/biomarkers` instead.
 */

import {
  Activity,
  Beaker,
  Droplet,
  Dumbbell,
  Flame,
  Heart,
  Leaf,
  Moon,
  ShieldCheck,
  Sun,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react'
import type { IconBadgeTone } from '@/components/ui/icon-badge'
import { BIOMARKER_CATEGORIES, canonicalMarker, categoryForMarker, markerSub } from './biomarkers'

export interface MarkerContent {
  populationAvg?: number
  populationLabel?: string
  trendNote: string
  explainIntro: string
  whyItMatters: string
  lowMeans: string
  highMeans: string
  factors: string
  relatesToHealth: string
  lifestyle: { icon: LucideIcon; title: string; detail: string }[]
  supplements: { name: string; detail: string; tag: string }[]
}

function norm(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '')
}

// Reusable lifestyle blocks keep the rich entries compact.
const L = {
  nutritionIron:   { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Focus on iron-rich foods and vitamin C to enhance absorption.' },
  nutritionWhole:  { icon: UtensilsCrossed, title: 'Nutrition', detail: 'A balanced, whole-food diet supports healthy levels.' },
  nutritionFibre:  { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Prioritise fibre, protein and fewer refined carbs.' },
  nutritionAntiInfl: { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Anti-inflammatory, whole-food eating helps lower this marker.' },
  trainingBalance: { icon: Dumbbell, title: 'Training', detail: 'Balance intensity and recovery to support healthy levels.' },
  trainingRegular: { icon: Dumbbell, title: 'Training', detail: 'Regular activity supports this marker over time.' },
  trainingStrength:{ icon: Dumbbell, title: 'Training', detail: 'Resistance training supports healthy levels.' },
  sleepQuality:    { icon: Moon, title: 'Sleep', detail: 'Quality, consistent sleep supports balance and recovery.' },
  stress:          { icon: ShieldCheck, title: 'Stress management', detail: 'Chronic stress can push this marker the wrong way.' },
  daylight:        { icon: Sun, title: 'Daylight', detail: 'Short, regular daylight exposure helps maintain levels.' },
  inflammationCut: { icon: Flame, title: 'Inflammation', detail: 'Limit processed, omega-6-heavy foods.' },
}

const RICH_CONTENT: Record<string, MarkerContent> = {
  ferritin: {
    populationAvg: 60,
    populationLabel: 'UK adults',
    trendNote: 'Ferritin responds over weeks to changes in diet, training load and iron intake.',
    explainIntro: 'Ferritin is a protein that stores iron in your body and releases it when needed.',
    whyItMatters: 'Ferritin reflects your iron stores. Low ferritin can lead to fatigue, poor recovery, weakened immune function and reduced exercise performance.',
    lowMeans: 'Low levels may cause tiredness, breathlessness, poor concentration and reduced exercise capacity as oxygen transport drops.',
    highMeans: 'High levels can indicate inflammation, infection or — less commonly — iron overload that may stress the liver over time.',
    factors: 'Diet (red meat, leafy greens), menstruation and blood loss, gut absorption, inflammation and recent illness all influence ferritin.',
    relatesToHealth: 'Healthy iron stores support daily energy, athletic recovery, immune resilience and cognitive sharpness.',
    lifestyle: [L.nutritionIron, L.trainingBalance, L.sleepQuality, L.stress],
    supplements: [
      { name: 'Iron (bisglycinate)', detail: 'May help increase iron stores when low.', tag: 'Consider' },
      { name: 'Vitamin C', detail: 'Taken with iron to improve absorption.', tag: 'Consider' },
    ],
  },
  vitamind: {
    populationAvg: 35,
    populationLabel: 'Adults, UK',
    trendNote: 'Vitamin D shifts with the seasons — expect lower readings after winter and higher after sunny months.',
    explainIntro: 'Vitamin D is a hormone-like nutrient your skin makes from sunlight, supporting bone, immune and mood health.',
    whyItMatters: 'Adequate vitamin D supports calcium absorption, immune defence, mood regulation and muscle function.',
    lowMeans: 'Low levels can cause fatigue, low mood, frequent illness and weaker bones over time.',
    highMeans: 'Very high levels — usually from over-supplementation — can raise blood calcium and stress the kidneys.',
    factors: 'Sun exposure, skin tone, latitude, season, body fat and supplementation all influence vitamin D.',
    relatesToHealth: 'Healthy vitamin D underpins resilient immunity, strong bones and stable mood through darker months.',
    lifestyle: [
      L.daylight,
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Oily fish, eggs and fortified foods support vitamin D.' },
      { icon: Dumbbell, title: 'Training', detail: 'Outdoor activity combines movement with sunlight.' },
      L.sleepQuality,
    ],
    supplements: [
      { name: 'Vitamin D3', detail: 'Helps maintain healthy vitamin D levels.', tag: 'Maintain' },
      { name: 'Vitamin K2', detail: 'Helps direct calcium toward your bones.', tag: 'Optional' },
    ],
  },
  vitaminb12: {
    populationAvg: 450,
    populationLabel: 'Adults',
    trendNote: 'B12 stores change slowly — trends emerge over months rather than weeks.',
    explainIntro: 'Vitamin B12 is essential for red blood cell formation, nerve function and energy production.',
    whyItMatters: 'B12 supports energy, focus and a healthy nervous system; deficiency develops slowly but can be significant.',
    lowMeans: 'Low levels may cause fatigue, tingling, poor memory and mood changes.',
    highMeans: 'High levels are usually harmless and often reflect supplementation.',
    factors: 'Diet (animal foods), gut absorption, age and certain medications influence B12.',
    relatesToHealth: 'Healthy B12 supports steady energy, clear thinking and long-term nerve health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Meat, fish, eggs and dairy are rich in B12.' },
      L.trainingRegular,
      L.sleepQuality,
      { icon: ShieldCheck, title: 'Stress management', detail: 'Manage stress to protect digestion and absorption.' },
    ],
    supplements: [
      { name: 'Vitamin B12 (methylcobalamin)', detail: 'Supports energy and nerve health.', tag: 'Maintain' },
    ],
  },
  folate: {
    populationAvg: 14,
    populationLabel: 'Adults',
    trendNote: 'Folate reflects recent weeks of intake and responds quickly to dietary change.',
    explainIntro: 'Folate (vitamin B9) is needed for making new cells, DNA repair and managing homocysteine.',
    whyItMatters: 'Folate works alongside B12 for red blood cell production, cardiovascular health and cell renewal.',
    lowMeans: 'Low folate can cause fatigue, irritability and a type of anaemia, and raises homocysteine.',
    highMeans: 'High levels usually reflect supplementation and are rarely a concern at typical doses.',
    factors: 'Intake of leafy greens and legumes, alcohol, gut absorption and certain medications influence folate.',
    relatesToHealth: 'Healthy folate supports energy, heart health and the body’s repair processes.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Leafy greens, beans, lentils and citrus are folate-rich.' },
      L.trainingRegular,
      L.sleepQuality,
      L.stress,
    ],
    supplements: [
      { name: 'Methylfolate', detail: 'A well-absorbed form if dietary intake is low.', tag: 'Consider' },
    ],
  },
  omega3index: {
    populationAvg: 5,
    populationLabel: 'Western diets',
    trendNote: 'The omega-3 index moves slowly — consistent intake over 3–4 months shifts it.',
    explainIntro: 'The omega-3 index measures EPA and DHA in your red blood cells — key fats for heart and brain health.',
    whyItMatters: 'A higher omega-3 index is linked to better cardiovascular health, lower inflammation and brain function.',
    lowMeans: 'Low levels are associated with higher inflammation and reduced cardiovascular protection.',
    highMeans: 'Very high intakes are generally well tolerated; extremely high doses can thin the blood slightly.',
    factors: 'Intake of oily fish and omega-3 supplements is the main driver; cooking oils high in omega-6 can offset it.',
    relatesToHealth: 'A healthy omega-3 index supports your heart, brain and recovery from training.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Eat oily fish 2–3 times per week.' },
      { icon: Dumbbell, title: 'Training', detail: 'Omega-3s support recovery and joint comfort.' },
      L.inflammationCut,
      L.stress,
    ],
    supplements: [
      { name: 'Omega-3 (EPA/DHA)', detail: 'Helps raise your omega-3 index.', tag: 'Consider' },
    ],
  },
  creactiveprotein: {
    populationAvg: 2.2,
    populationLabel: 'Adults',
    trendNote: 'CRP can spike short-term with illness or hard training — look at the trend, not one reading.',
    explainIntro: 'C-reactive protein (CRP) is made by the liver and rises when there is inflammation in the body.',
    whyItMatters: 'CRP is a sensitive marker of inflammation, which is linked to recovery, metabolic and cardiovascular health.',
    lowMeans: 'Low CRP reflects low background inflammation — generally a good sign.',
    highMeans: 'High levels can indicate infection, injury, or chronic inflammation that warrants attention.',
    factors: 'Infection, body fat, sleep, stress, smoking and diet all influence CRP.',
    relatesToHealth: 'Keeping CRP low supports recovery, energy and long-term cardiovascular health.',
    lifestyle: [
      L.nutritionAntiInfl,
      { icon: Moon, title: 'Sleep', detail: 'Consistent quality sleep reduces inflammation.' },
      L.stress,
      { icon: Dumbbell, title: 'Training', detail: 'Regular moderate exercise reduces baseline inflammation.' },
    ],
    supplements: [
      { name: 'Omega-3 (EPA/DHA)', detail: 'May help support a healthy inflammatory response.', tag: 'Optional' },
    ],
  },
  hba1c: {
    populationAvg: 5.4,
    populationLabel: 'Adults',
    trendNote: 'HbA1c averages 2–3 months of blood sugar, so changes show up a full season after the habits that drive them.',
    explainIntro: 'HbA1c reflects your average blood sugar over the past 2–3 months.',
    whyItMatters: 'HbA1c indicates how well your body manages blood sugar, a key driver of long-term metabolic health.',
    lowMeans: 'Lower values reflect well-controlled blood sugar.',
    highMeans: 'Higher levels suggest rising blood sugar and increased metabolic risk over time.',
    factors: 'Diet, body composition, activity, sleep and stress all influence blood sugar control.',
    relatesToHealth: 'Healthy HbA1c supports stable energy, mood and long-term metabolic health.',
    lifestyle: [
      L.nutritionFibre,
      { icon: Dumbbell, title: 'Training', detail: 'Regular activity improves insulin sensitivity.' },
      { icon: Moon, title: 'Sleep', detail: 'Good sleep supports blood sugar regulation.' },
      { icon: ShieldCheck, title: 'Stress management', detail: 'Stress hormones can raise blood sugar.' },
    ],
    supplements: [
      { name: 'Magnesium', detail: 'May support healthy glucose metabolism.', tag: 'Optional' },
    ],
  },
  fastingglucose: {
    populationAvg: 5.0,
    populationLabel: 'Adults (mmol/L)',
    trendNote: 'Fasting glucose varies day to day — sleep, stress and the previous evening’s meal all show up in it.',
    explainIntro: 'Fasting glucose is your blood sugar level after an overnight fast, a snapshot of baseline metabolic control.',
    whyItMatters: 'Consistently raised fasting glucose is an early signal of insulin resistance, often years before HbA1c rises.',
    lowMeans: 'Low readings can cause shakiness, irritability and poor focus, and are worth discussing if recurrent.',
    highMeans: 'High readings suggest your body is struggling to keep blood sugar in check overnight.',
    factors: 'Evening meals, sleep quality, stress, body composition and activity levels all influence fasting glucose.',
    relatesToHealth: 'Stable fasting glucose supports steady energy, appetite control and long-term metabolic health.',
    lifestyle: [
      L.nutritionFibre,
      { icon: Dumbbell, title: 'Training', detail: 'A walk after meals blunts glucose spikes.' },
      { icon: Moon, title: 'Sleep', detail: 'Even one short night raises next-day glucose.' },
      L.stress,
    ],
    supplements: [
      { name: 'Magnesium', detail: 'May support healthy glucose metabolism.', tag: 'Optional' },
    ],
  },
  insulin: {
    populationAvg: 8,
    populationLabel: 'Adults (fasting)',
    trendNote: 'Fasting insulin trends downward within weeks of consistent exercise and dietary change.',
    explainIntro: 'Insulin is the hormone that moves sugar out of your blood and into cells for energy or storage.',
    whyItMatters: 'High fasting insulin is one of the earliest signs of insulin resistance, often appearing while glucose still looks normal.',
    lowMeans: 'Low fasting insulin alongside normal glucose generally reflects good insulin sensitivity.',
    highMeans: 'High levels mean your body is working harder to control blood sugar — an early warning worth acting on.',
    factors: 'Body composition, refined carbohydrate intake, activity, sleep and stress drive insulin levels.',
    relatesToHealth: 'Good insulin sensitivity supports energy, body composition and long-term heart and brain health.',
    lifestyle: [
      L.nutritionFibre,
      { icon: Dumbbell, title: 'Training', detail: 'Strength training builds muscle, your biggest glucose sink.' },
      L.sleepQuality,
      L.stress,
    ],
    supplements: [],
  },
  totalcholesterol: {
    populationAvg: 5.1,
    populationLabel: 'UK adults (mmol/L)',
    trendNote: 'Cholesterol responds to dietary pattern changes within 6–8 weeks.',
    explainIntro: 'Total cholesterol sums the cholesterol carried in all your blood particles — LDL, HDL and others.',
    whyItMatters: 'It is a broad screening number; the LDL/HDL breakdown matters more, but a rising total is worth attention.',
    lowMeans: 'Low totals are rarely a problem and usually reflect genetics, diet or medication.',
    highMeans: 'High totals — especially driven by LDL — are linked to plaque build-up in arteries over time.',
    factors: 'Saturated fat intake, fibre, body weight, genetics, thyroid function and menopause all influence cholesterol.',
    relatesToHealth: 'Keeping cholesterol balanced is one of the most evidence-backed levers for long-term heart health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'More soluble fibre (oats, beans); swap saturated fat for olive oil and nuts.' },
      { icon: Dumbbell, title: 'Training', detail: 'Regular cardio improves your lipid profile.' },
      L.sleepQuality,
      L.stress,
    ],
    supplements: [
      { name: 'Plant sterols', detail: 'Can modestly lower LDL when taken with meals.', tag: 'Optional' },
    ],
  },
  ldlcholesterol: {
    populationAvg: 3.0,
    populationLabel: 'UK adults (mmol/L)',
    trendNote: 'LDL typically falls within 6–8 weeks of consistent dietary change.',
    explainIntro: 'LDL carries cholesterol to your tissues — when elevated for years it deposits in artery walls, which is why it’s called the “bad” cholesterol.',
    whyItMatters: 'LDL is the single most established modifiable risk factor for heart disease; lowering it lowers lifetime risk.',
    lowMeans: 'Low LDL is generally protective for your heart and arteries.',
    highMeans: 'High LDL accelerates plaque build-up in arteries; the higher and longer it stays up, the greater the risk.',
    factors: 'Saturated fat, fibre intake, body weight, genetics (familial hypercholesterolaemia), and thyroid function all influence LDL.',
    relatesToHealth: 'Managing LDL is a long game — steady habits now compound into decades of cardiovascular protection.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Oats, beans, lentils and fruit add LDL-lowering soluble fibre.' },
      { icon: Heart, title: 'Healthy fats', detail: 'Swap butter and processed meat for olive oil, nuts and oily fish.' },
      { icon: Dumbbell, title: 'Training', detail: 'Regular cardio and a healthy weight both lower LDL.' },
      L.sleepQuality,
    ],
    supplements: [
      { name: 'Plant sterols', detail: 'Can modestly lower LDL when taken with meals.', tag: 'Optional' },
      { name: 'Psyllium husk', detail: 'Soluble fibre shown to reduce LDL.', tag: 'Consider' },
    ],
  },
  hdlcholesterol: {
    populationAvg: 1.4,
    populationLabel: 'UK adults (mmol/L)',
    trendNote: 'HDL moves slowly — months of consistent exercise show up gradually.',
    explainIntro: 'HDL collects excess cholesterol and returns it to the liver for disposal — the “good” cholesterol.',
    whyItMatters: 'Higher HDL is associated with better cardiovascular health, although raising it artificially doesn’t guarantee protection.',
    lowMeans: 'Low HDL weakens your cholesterol clean-up system and often travels with high triglycerides.',
    highMeans: 'High HDL is usually favourable; extremely high levels are mostly genetic.',
    factors: 'Exercise, smoking, alcohol, body composition and genetics are the main drivers of HDL.',
    relatesToHealth: 'Good HDL supports the cholesterol recycling that keeps arteries clear.',
    lifestyle: [
      { icon: Dumbbell, title: 'Training', detail: 'Aerobic exercise is the most reliable HDL raiser.' },
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Olive oil, nuts and oily fish support HDL.' },
      { icon: ShieldCheck, title: 'No smoking', detail: 'Quitting smoking raises HDL within weeks.' },
      L.sleepQuality,
    ],
    supplements: [],
  },
  triglycerides: {
    populationAvg: 1.3,
    populationLabel: 'UK adults (mmol/L)',
    trendNote: 'Triglycerides are one of the fastest-responding lipids — weeks of change show clearly.',
    explainIntro: 'Triglycerides are the main form of fat circulating in your blood, fuel in transit between meals and storage.',
    whyItMatters: 'Raised triglycerides signal that your body is struggling to process fats and sugars, and add to cardiovascular risk.',
    lowMeans: 'Low triglycerides generally reflect good metabolic health.',
    highMeans: 'High levels are linked to insulin resistance, fatty liver and heart disease — and respond quickly to lifestyle change.',
    factors: 'Sugar, refined carbs, alcohol, body weight and activity are the dominant drivers.',
    relatesToHealth: 'Healthy triglycerides usually mean your metabolism is processing energy efficiently.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Cut sugar, refined carbs and alcohol — the big three drivers.' },
      { icon: Heart, title: 'Oily fish', detail: 'EPA/DHA from fish meaningfully lowers triglycerides.' },
      { icon: Dumbbell, title: 'Training', detail: 'Both cardio and strength work lower triglycerides.' },
      L.sleepQuality,
    ],
    supplements: [
      { name: 'Omega-3 (EPA/DHA)', detail: 'Well evidenced for lowering triglycerides.', tag: 'Consider' },
    ],
  },
  apob: {
    populationAvg: 0.9,
    populationLabel: 'Adults (g/L)',
    trendNote: 'ApoB tracks closely with LDL changes over 6–8 week cycles.',
    explainIntro: 'ApoB counts the number of cholesterol-carrying particles that can enter artery walls — one ApoB per particle.',
    whyItMatters: 'Particle number predicts cardiovascular risk better than cholesterol concentration alone; many clinicians consider ApoB the best single lipid number.',
    lowMeans: 'Low ApoB means fewer atherogenic particles in circulation — protective.',
    highMeans: 'High ApoB means many particles bombarding artery walls, even if LDL concentration looks moderate.',
    factors: 'Largely the same levers as LDL: saturated fat, fibre, weight, genetics and metabolic health.',
    relatesToHealth: 'Keeping ApoB low is among the strongest predictors of long-term heart health.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Soluble fibre and unsaturated fats lower particle count.' },
      { icon: Dumbbell, title: 'Training', detail: 'Exercise improves particle clearance.' },
      L.sleepQuality,
      L.stress,
    ],
    supplements: [],
  },
  testosterone: {
    populationAvg: 18,
    populationLabel: 'Men 30–40',
    trendNote: 'Testosterone responds over months to training, sleep and body composition changes.',
    explainIntro: 'Testosterone is a key hormone for energy, muscle, mood and libido in both men and women.',
    whyItMatters: 'Balanced testosterone supports strength, recovery, motivation and overall wellbeing.',
    lowMeans: 'Low levels may cause low energy, reduced strength, low mood and reduced libido.',
    highMeans: 'Unusually high levels may need investigation depending on the source.',
    factors: 'Sleep, body composition, training, stress and age all influence testosterone.',
    relatesToHealth: 'Healthy testosterone supports body composition, recovery and day-to-day drive.',
    lifestyle: [
      L.trainingStrength,
      { icon: Moon, title: 'Sleep', detail: 'Most testosterone is produced during deep sleep.' },
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Adequate protein, fats and micronutrients matter.' },
      { icon: ShieldCheck, title: 'Stress management', detail: 'High cortisol can suppress testosterone.' },
    ],
    supplements: [
      { name: 'Vitamin D3', detail: 'Supports healthy testosterone when levels are low.', tag: 'Optional' },
      { name: 'Zinc', detail: 'Involved in healthy testosterone production.', tag: 'Optional' },
    ],
  },
  cortisol: {
    populationAvg: 350,
    populationLabel: 'Morning sample (nmol/L)',
    trendNote: 'Cortisol follows a strong daily rhythm — compare like-for-like sample times when tracking it.',
    explainIntro: 'Cortisol is your main stress hormone, mobilising energy and sharpening focus — ideally high in the morning and low at night.',
    whyItMatters: 'A healthy cortisol rhythm drives morning energy and restful sleep; a flattened or elevated pattern erodes both.',
    lowMeans: 'Consistently low cortisol can cause fatigue, low blood pressure and poor stress tolerance.',
    highMeans: 'Chronically high cortisol is linked to poor sleep, abdominal fat gain, blood sugar issues and suppressed immunity.',
    factors: 'Psychological stress, sleep timing, caffeine, overtraining and illness all shape cortisol.',
    relatesToHealth: 'A strong cortisol rhythm underpins energy, recovery, mood and metabolic health.',
    lifestyle: [
      { icon: Moon, title: 'Sleep', detail: 'A consistent wind-down and sleep schedule resets the rhythm.' },
      { icon: ShieldCheck, title: 'Stress management', detail: 'Daily walks, breathwork or meditation lower baseline cortisol.' },
      { icon: UtensilsCrossed, title: 'Caffeine timing', detail: 'Keep caffeine to before noon.' },
      { icon: Dumbbell, title: 'Training', detail: 'Avoid stacking intense sessions on poor sleep.' },
    ],
    supplements: [
      { name: 'Magnesium glycinate', detail: 'May support relaxation and sleep quality.', tag: 'Optional' },
    ],
  },
  tsh: {
    populationAvg: 1.8,
    populationLabel: 'Adults (mIU/L)',
    trendNote: 'TSH responds slowly — re-test 8–12 weeks after any change before drawing conclusions.',
    explainIntro: 'TSH is the pituitary’s signal to your thyroid: high TSH means the brain is shouting at an underactive thyroid, low TSH means it’s whispering at an overactive one.',
    whyItMatters: 'TSH is the most sensitive first-line check of thyroid function, which sets the pace for your entire metabolism.',
    lowMeans: 'Low TSH can suggest an overactive thyroid — symptoms include anxiety, palpitations, heat intolerance and weight loss.',
    highMeans: 'High TSH suggests an underactive thyroid — fatigue, cold intolerance, weight gain and low mood are typical.',
    factors: 'Autoimmunity, iodine and selenium status, stress, medications and recent illness influence TSH.',
    relatesToHealth: 'Balanced thyroid signalling keeps energy, weight, mood and temperature regulation steady.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Iodine (fish, dairy) and selenium (brazil nuts) support thyroid function.' },
      L.sleepQuality,
      L.stress,
      L.trainingRegular,
    ],
    supplements: [
      { name: 'Selenium', detail: 'Supports thyroid hormone conversion — food first.', tag: 'Optional' },
    ],
  },
  alt: {
    populationAvg: 25,
    populationLabel: 'Adults (U/L)',
    trendNote: 'ALT often normalises within weeks of reduced alcohol and improved diet.',
    explainIntro: 'ALT is an enzyme concentrated in liver cells — it leaks into the blood when the liver is irritated or damaged.',
    whyItMatters: 'ALT is the most liver-specific routine enzyme, an early flag for fatty liver, alcohol effects or medication stress.',
    lowMeans: 'Low ALT is not a concern.',
    highMeans: 'Raised ALT most commonly reflects fatty liver, alcohol, recent intense exercise or medication effects.',
    factors: 'Alcohol, body weight, sugary and processed foods, medications and intense exercise all influence ALT.',
    relatesToHealth: 'A healthy ALT signals a liver that is processing nutrients, hormones and toxins efficiently.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Cut ultra-processed and sugary foods that drive liver fat.' },
      { icon: ShieldCheck, title: 'Alcohol', detail: 'Reducing alcohol gives the liver room to recover.' },
      { icon: Dumbbell, title: 'Training', detail: 'Regular movement reduces liver fat directly.' },
      L.sleepQuality,
    ],
    supplements: [],
  },
  creatinine: {
    populationAvg: 80,
    populationLabel: 'Adults (µmol/L)',
    trendNote: 'Creatinine varies with muscle mass, hydration and recent training — interpret alongside eGFR.',
    explainIntro: 'Creatinine is a waste product of muscle metabolism that your kidneys filter out — a steady gauge of kidney function.',
    whyItMatters: 'Rising creatinine over time can signal declining kidney filtration, while a single reading is shaped by muscle and hydration.',
    lowMeans: 'Low creatinine usually reflects lower muscle mass and is rarely concerning.',
    highMeans: 'High creatinine can reflect reduced kidney filtration, dehydration, high muscle mass or heavy recent training.',
    factors: 'Muscle mass, hydration, protein and creatine intake, training load and kidney function all influence creatinine.',
    relatesToHealth: 'Stable creatinine alongside a healthy eGFR means your kidneys are clearing waste effectively.',
    lifestyle: [
      { icon: Droplet, title: 'Hydration', detail: 'Consistent hydration keeps filtration accurate and healthy.' },
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Balanced protein intake — extreme intakes skew readings.' },
      L.trainingBalance,
      L.sleepQuality,
    ],
    supplements: [],
  },
  egfr: {
    populationAvg: 95,
    populationLabel: 'Healthy adults',
    trendNote: 'eGFR naturally declines slightly with age — the trend over years matters more than one result.',
    explainIntro: 'eGFR estimates how many millilitres of blood your kidneys filter per minute — the headline number for kidney function.',
    whyItMatters: 'Your kidneys regulate fluid, blood pressure and waste clearance; eGFR is the standard way to track that capacity.',
    lowMeans: 'Lower eGFR means reduced filtration — mild dips are common and often reversible, sustained declines need medical review.',
    highMeans: 'High-normal eGFR is generally good news.',
    factors: 'Blood pressure, blood sugar, hydration, age, muscle mass and medications all influence eGFR.',
    relatesToHealth: 'Protecting eGFR — mainly via blood pressure and blood sugar — protects energy, heart health and longevity.',
    lifestyle: [
      { icon: Droplet, title: 'Hydration', detail: 'Steady fluid intake supports kidney filtration.' },
      { icon: Heart, title: 'Blood pressure', detail: 'Keeping BP in range is the biggest kidney protector.' },
      L.nutritionWhole,
      L.trainingRegular,
    ],
    supplements: [],
  },
  magnesium: {
    populationAvg: 0.85,
    populationLabel: 'Adults (mmol/L)',
    trendNote: 'Blood magnesium is tightly regulated — even modest dips can reflect a meaningful shortfall.',
    explainIntro: 'Magnesium is involved in over 300 enzymatic reactions, from muscle contraction and nerve signalling to sleep and energy production.',
    whyItMatters: 'Many people run low on magnesium without symptoms; it quietly affects sleep, recovery, mood and blood sugar.',
    lowMeans: 'Low magnesium can cause muscle cramps, poor sleep, fatigue and irritability.',
    highMeans: 'High levels are rare with normal kidney function and usually relate to supplementation.',
    factors: 'Intake of greens, nuts and whole grains, alcohol, stress, sweating and certain medications influence magnesium.',
    relatesToHealth: 'Replete magnesium supports deeper sleep, steadier blood sugar and better muscle recovery.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Leafy greens, nuts, seeds, whole grains and dark chocolate.' },
      L.sleepQuality,
      L.trainingBalance,
      L.stress,
    ],
    supplements: [
      { name: 'Magnesium glycinate', detail: 'Well-tolerated form, useful in the evening.', tag: 'Consider' },
    ],
  },
  zinc: {
    populationAvg: 14,
    populationLabel: 'Adults (µmol/L)',
    trendNote: 'Zinc status shifts over weeks; plasma levels also dip temporarily during illness.',
    explainIntro: 'Zinc is a trace mineral central to immune defence, wound healing, taste, skin health and hormone production.',
    whyItMatters: 'Even mild zinc shortfall blunts immunity and recovery; athletes and plant-based eaters are most at risk.',
    lowMeans: 'Low zinc can mean frequent infections, slow healing, skin issues and reduced taste or appetite.',
    highMeans: 'Excess zinc — usually from long-term high-dose supplements — can deplete copper and upset the stomach.',
    factors: 'Meat and shellfish intake, phytates in unrefined grains, sweating and gut absorption all influence zinc.',
    relatesToHealth: 'Healthy zinc underpins resilient immunity, skin repair and hormonal balance.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Red meat, shellfish, pumpkin seeds and legumes are zinc-rich.' },
      L.trainingBalance,
      L.sleepQuality,
      L.stress,
    ],
    supplements: [
      { name: 'Zinc (picolinate)', detail: 'Short courses can restore low levels — avoid chronic high doses.', tag: 'Consider' },
    ],
  },
  homocysteine: {
    populationAvg: 10,
    populationLabel: 'Adults (µmol/L)',
    trendNote: 'Homocysteine typically falls within 6–8 weeks of improved B-vitamin intake.',
    explainIntro: 'Homocysteine is an amino acid by-product that your body recycles using folate, B12 and B6 — it builds up when those run short.',
    whyItMatters: 'Raised homocysteine is linked to cardiovascular and cognitive risk, and is one of the most nutritionally responsive markers.',
    lowMeans: 'Low homocysteine generally reflects good B-vitamin status.',
    highMeans: 'High levels suggest your methylation cycle needs support — usually more folate, B12 or B6.',
    factors: 'B-vitamin intake, genetics (MTHFR), kidney function, coffee, alcohol and smoking influence homocysteine.',
    relatesToHealth: 'Keeping homocysteine in range supports vascular health and long-term brain function.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Leafy greens, eggs, legumes and whole grains supply B vitamins.' },
      L.trainingRegular,
      L.sleepQuality,
      { icon: ShieldCheck, title: 'Moderation', detail: 'Heavy alcohol and smoking both raise homocysteine.' },
    ],
    supplements: [
      { name: 'B-complex', detail: 'Folate, B12 and B6 together lower homocysteine.', tag: 'Consider' },
    ],
  },
  uricacid: {
    populationAvg: 300,
    populationLabel: 'Adults (µmol/L)',
    trendNote: 'Uric acid responds within weeks to changes in alcohol, fructose and hydration.',
    explainIntro: 'Uric acid is the end product of purine breakdown — from cell turnover and foods like red meat, organ meat and beer.',
    whyItMatters: 'Beyond gout, persistently raised uric acid travels with metabolic syndrome, blood pressure and kidney strain.',
    lowMeans: 'Low uric acid is rarely a concern.',
    highMeans: 'High levels can crystallise in joints (gout) and are associated with metabolic and kidney stress.',
    factors: 'Alcohol (especially beer), sugary drinks, red and organ meat, hydration, body weight and genetics drive uric acid.',
    relatesToHealth: 'Healthy uric acid usually reflects a metabolism that is handling sugar and alcohol well.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Cut beer, sugary drinks and excess red/organ meat.' },
      { icon: Droplet, title: 'Hydration', detail: 'Good hydration helps the kidneys clear uric acid.' },
      L.trainingRegular,
      L.sleepQuality,
    ],
    supplements: [
      { name: 'Vitamin C', detail: 'Modestly supports uric acid clearance.', tag: 'Optional' },
    ],
  },
}

// Markers that share content with another entry.
const CONTENT_ALIASES: Record<string, string> = {
  hscrp: 'creactiveprotein',
  activeb12: 'vitaminb12',
  freetestosterone: 'testosterone',
  randomglucose: 'fastingglucose',
  homair: 'insulin',
  nonhdlcholesterol: 'ldlcholesterol',
  ast: 'alt',
  ggt: 'alt',
  cystatinc: 'egfr',
}

// Category-flavoured hints for generated fallback content.
const CATEGORY_HINTS: Record<string, { factors: string; lifestyle: MarkerContent['lifestyle'] }> = {
  iron: {
    factors: 'Diet, blood loss, training load, gut absorption and recent illness all influence blood-cell and iron markers.',
    lifestyle: [L.nutritionIron, L.trainingBalance, L.sleepQuality, L.stress],
  },
  vitamins: {
    factors: 'Dietary intake, gut absorption, sun exposure (for vitamin D) and life stage all influence nutrient levels.',
    lifestyle: [L.nutritionWhole, L.daylight, L.trainingRegular, L.sleepQuality],
  },
  lipids: {
    factors: 'Saturated fat and fibre intake, body weight, activity, genetics and thyroid function shape your lipid profile.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'More fibre and unsaturated fats; less saturated fat and sugar.' },
      { icon: Dumbbell, title: 'Training', detail: 'Regular cardio improves your lipid profile.' },
      L.sleepQuality,
      L.stress,
    ],
  },
  metabolic: {
    factors: 'Diet quality, body composition, activity, sleep and stress are the main levers for metabolic markers.',
    lifestyle: [L.nutritionFibre, { icon: Dumbbell, title: 'Training', detail: 'Movement after meals and strength work improve insulin sensitivity.' }, L.sleepQuality, L.stress],
  },
  inflammation: {
    factors: 'Infection, body fat, sleep debt, stress, smoking and diet all influence inflammation markers.',
    lifestyle: [L.nutritionAntiInfl, L.sleepQuality, L.stress, { icon: Dumbbell, title: 'Training', detail: 'Regular moderate exercise lowers baseline inflammation.' }],
  },
  hormones: {
    factors: 'Sleep, stress, body composition, training load, age and cycle phase all influence hormone levels.',
    lifestyle: [L.sleepQuality, L.stress, L.trainingStrength, L.nutritionWhole],
  },
  thyroid: {
    factors: 'Autoimmunity, iodine and selenium status, stress and medications influence thyroid markers — interpret them together.',
    lifestyle: [
      { icon: UtensilsCrossed, title: 'Nutrition', detail: 'Iodine (fish, dairy) and selenium (brazil nuts) support the thyroid.' },
      L.sleepQuality,
      L.stress,
      L.trainingRegular,
    ],
  },
  liver: {
    factors: 'Alcohol, diet quality, body weight, medications, hydration and training load influence liver and kidney markers.',
    lifestyle: [
      { icon: ShieldCheck, title: 'Moderation', detail: 'Less alcohol gives the liver room to recover.' },
      { icon: Droplet, title: 'Hydration', detail: 'Steady fluids support kidney filtration.' },
      L.nutritionWhole,
      L.trainingRegular,
    ],
  },
  electrolytes: {
    factors: 'Hydration, sweat losses, kidney function and medications are the main drivers of electrolyte levels.',
    lifestyle: [
      { icon: Droplet, title: 'Hydration', detail: 'Match fluids and electrolytes to your sweat losses.' },
      L.nutritionWhole,
      L.trainingBalance,
      L.sleepQuality,
    ],
  },
  cardiac: {
    factors: 'Heart strain, intense exercise, muscle injury and kidney function influence cardiac markers.',
    lifestyle: [
      { icon: Heart, title: 'Heart health', detail: 'Steady cardio and blood pressure control protect the heart.' },
      L.trainingBalance,
      L.nutritionWhole,
      L.sleepQuality,
    ],
  },
}

function generatedContent(name: string): MarkerContent {
  const sub = markerSub(name)
  const catId = categoryForMarker(name)
  const cat = BIOMARKER_CATEGORIES.find((c) => c.id === catId)
  const area = sub ? sub.toLowerCase() : (cat?.description.toLowerCase() ?? 'your health')
  const hints = CATEGORY_HINTS[catId]

  return {
    trendNote: `Your ${name} is tracked over time so you can see how it responds to your habits.`,
    explainIntro: `${name} is a marker of ${area}, part of the ${cat?.label.toLowerCase() ?? 'wider'} picture of your health.`,
    whyItMatters: `${name} gives insight into ${area} and how it changes over time. Trends across repeat tests are more informative than any single reading.`,
    lowMeans: 'Levels below the optimal range may be worth supporting through lifestyle changes and, where appropriate, a conversation with your healthcare provider.',
    highMeans: 'Levels above the optimal range can have several causes — recent illness, training or sampling conditions among them — and are best interpreted alongside your other markers.',
    factors: hints?.factors ?? 'Diet, activity, sleep, stress and your individual physiology all influence this marker.',
    relatesToHealth: `Keeping ${name} in its optimal range supports ${cat?.description.toLowerCase() ?? 'your broader health goals'}.`,
    lifestyle: hints?.lifestyle ?? [L.nutritionWhole, L.trainingRegular, L.sleepQuality, L.stress],
    supplements: [],
  }
}

/** Full drill-down content for any marker — rich where written, generated otherwise. */
export function getContent(name: string): MarkerContent {
  const key = norm(canonicalMarker(name))
  const direct = RICH_CONTENT[key] ?? RICH_CONTENT[CONTENT_ALIASES[key] ?? '']
  return direct ?? generatedContent(name)
}

/** Whether this marker has hand-written (vs generated) content. */
export function hasRichContent(name: string): boolean {
  const key = norm(canonicalMarker(name))
  return !!(RICH_CONTENT[key] ?? RICH_CONTENT[CONTENT_ALIASES[key] ?? ''])
}

// ── Display metadata (icon + tone per marker/category) ────────────────────

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  iron: Beaker,
  vitamins: Leaf,
  lipids: Heart,
  metabolic: Droplet,
  inflammation: Flame,
  hormones: Activity,
  thyroid: Activity,
  liver: Beaker,
  electrolytes: Droplet,
  cardiac: Heart,
}

const MARKER_ICONS: Record<string, LucideIcon> = {
  vitamind: Sun,
  cortisol: ShieldCheck,
  creactiveprotein: Flame,
  hscrp: Flame,
}

export function iconForMarker(name: string): LucideIcon {
  const key = norm(canonicalMarker(name))
  if (MARKER_ICONS[key]) return MARKER_ICONS[key]
  return CATEGORY_ICONS[categoryForMarker(name)] ?? Beaker
}

export function iconForCategory(id: string): LucideIcon {
  return CATEGORY_ICONS[id] ?? Beaker
}

const CATEGORY_TONES: Record<string, IconBadgeTone> = {
  iron: 'rose',
  vitamins: 'amber',
  lipids: 'sky',
  metabolic: 'sage',
  inflammation: 'teal',
  hormones: 'violet',
  thyroid: 'violet',
  liver: 'teal',
  electrolytes: 'sky',
  cardiac: 'rose',
}

export function markerTone(name: string): IconBadgeTone {
  return CATEGORY_TONES[categoryForMarker(name)] ?? 'sage'
}

export { markerSub as subForMarker }
