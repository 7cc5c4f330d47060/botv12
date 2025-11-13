import { createHash } from 'crypto'
import settings from '../settings'

const namesHk = [ // From 2017 Metroidvania from Australia.
  'Ancient Basin',
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
  'Lurien the Watcher',
  'Mantis Claw',
  'Mantis Lords',
  'Mask Maker',
  'Massive Moss Charger',
  'Monomon the Teacher',
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
  'Tiktik',
  'Uoma',
  'Vengefly',
  'Wayward Compass',
  'White Palace',
  'Zote'
]

const namesSs = [ // From 2025 Metroidvania from Australia.
  'Bellhart',
  'Bell Beast',
  'Bilewater',
  'Bone Bottom',
  'Citadel',
  'Clawline',
  'Greymoor',
  'Halfway Home',
  'Hornet',
  "Hunter's March",
  'Lace',
  'Moss Grotto',
  'Moss Mother',
  'Needle',
  'Needolin',
  'Pharloom',
  'Shakra',
  'Sherma',
  'Shellwood',
  'Wormways'
]

console.log(namesHk.length * namesSs.length)

export default function generateUser (): string{
  let nameItem = namesHk[Math.floor(Math.random()*namesHk.length)]
  if(settings.debugMode) nameItem += ' Debug'
  const hashItem = createHash('sha256').update(nameItem).digest('hex').slice(0,6)
  const nameItemSs = namesSs[Math.floor(Math.random()*namesSs.length)]
  const hashItemSs = createHash('sha256').update(nameItemSs).digest('hex').slice(0,6)
  return `${hashItem}${hashItemSs}`
}
