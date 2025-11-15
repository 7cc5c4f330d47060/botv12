import { createHash } from 'crypto'


const namesHk = [ // From 2017 Metroidvania from Australia.
  'Ancient Basin',
  'Baldur Shell',
  'City Crest',
  'Cornifer',
  'Crawlid',
  'Deepnest',
  'Dirtmouth',
  'Dream Nail',
  'Dreamgate',
  'Fog Canyon',
  'Greenpath',
  'Grubfather',
  'Gruz Mother',
  'Hallownest',
  'Hornet',
  'Iselda',
  'Junk Pit',
  "King's Pass",
  'The Last Stag',
  'Leg Eater',
  'Lifeblood',
  'Longnail',
  'Mantis Claw',
  'Markoth',
  'Massive Moss Charger',
  'Monarch Wings',
  'Mosskin',
  'Mister Mushroom',
  'Nosk',
  'Ooma',
  'Primal Aspid',
  "Queen's Gardens",
  'The Radiance',
  'Rancid Egg',
  'Resting Grounds',
  'Royal Waterways',
  'Seer',
  'Shade',
  'Shaman Stone',
  'Sly',
  'SOUL', // Capital form
  'Squit',
  "Teacher's Archives",
  'Traitor Lord',
  'Uumuu',
  'Vengefly King',
  'Wayward Compass',
  'Xero',
  'You Can Not Breathe Water', // Precept 44 because nothing else starts with "Y".
  'Zote the Mighty'
]
const namesSs = [ // From 2025 Metroidvania from Australia.
  'Bellhart',
  'Bone Bottom',
  'Citadel',
  'Clawline',
  'Grand Mother Silk',
  'Greymoor',
  'Halfway Home',
  'High Halls',
  "Hunter's March",
  'Lace',
  'Moss Mother',
  'Needle',
  'Needolin',
  'Pharloom',
  'Ruined Chapel',
  'Sherma',
  'Shellwood',
  'Snail Shamans', // Group of three not found in HK2017: Chapel Maid, Caretaker, Bell Hermit
  'Trobbio',
  'Wormways'
]

//console.log(namesHk.length * namesSs.length)

export default function generateUser (): string{
  let nameItem = namesHk[Math.floor(Math.random()*namesHk.length)]
  if(settings.debugMode) nameItem += ' Debug'
  const hashItem = createHash('sha256').update(nameItem).digest('hex').slice(0,6)
  const nameItemSs = namesSs[Math.floor(Math.random()*namesSs.length)]
  const hashItemSs = createHash('sha256').update(nameItemSs).digest('hex').slice(0,6)
  return `${hashItem}${hashItemSs}`
}
