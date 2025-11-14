import { createHash } from 'crypto'
import settings from '../settings'

const namesHk = [ // From 2017 Metroidvania from Australia.
  'Ancient Basin',
  'Baldur Shell',
  'City Crest',
  'City of Tears',
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
  'Herrah the Beast',
  'The Last Stag',
  'Leg Eater',
  'Lifeblood',
  'Lifeseed',
  'Longnail',
  'Mantis Claw',
  'Mantis Lords',
  'Markoth',
  'Mask Maker',
  'Massive Moss Charger',
  'Mosskin',
  'Mothwing Cloak',
  'Mister Mushroom',
  'Nail',
  'Ooma',
  'Pale King',
  'Primal Aspid',
  "Queen's Gardens",
  'The Radiance',
  'Rancid Egg',
  'Resting Grounds',
  'Seer',
  'Shade',
  'Shaman Stone',
  'Sly',
  'Snail Shaman',
  'SOUL', // Capital form
  'Squit',
  'Uoma',
  'Vengefly',
  'Wayward Compass',
  'White Palace',
  'Xero',
  'Zote'
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
