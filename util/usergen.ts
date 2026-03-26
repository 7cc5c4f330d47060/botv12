import { createHash } from 'node:crypto'

const namesHk = [ // From 2017 Metroidvania from Australia. It can include dlc.
  'The Abyss',
  'Aluba',
  'Ancient Basin',
  'Baldur Shell',
  'City Crest',
  'Cornifer',
  'Crawlid',
  'Dashmaster',
  'Deepnest',
  'Dirtmouth',
  'Dream Nail',
  'Dreamgate',
  'Elder Hu',
  'Fragile Strength',
  'Fungal Wastes',
  'Fog Canyon',
  'Godhome',
  'Godtuner',
  'Greenpath',
  'Grey Prince Zote',
  'Grubfather',
  'Gruz Mother',
  'Hallownest',
  'Hallownest Seal',
  'Hive Knight',
  'The Hol\x6c\x6f\x77 \x4b\x6e\x69\x67\x68\x74', // Trademarked. 79237422 79236306
  'Hornet Protector',
  'Hornet Sentinel',
  'Iselda',
  'Junk Pit',
  "King's Pass",
  'The Last Stag',
  'Leg Eater',
  'Lifeblood',
  'Longnail',
  'Mantis Claw',
  'Mark of Pride',
  'Markoth',
  'Massive Moss Charger',
  'Monarch Wings',
  'Mosskin',
  'Mister Mushroom',
  'Needle', // Hornet's weapon. Relevant for both.
  'Nosk',
  'Ooma',
  'The Pale King',
  'Primal Aspid',
  "Queen's Gardens",
  'The Radiance',
  'Rancid Egg',
  'Resting Grounds',
  'Royal Waterways',
  'Seer',
  'Shade',
  'Shaman Stone',
  'Sisters of Battle', // Not the WH version. It is in 7102 thginK wolloH, in Godhome.
  'Sly',
  'SOUL', // Capital form, acquired and used throughout the game by the Knight
  'Squit',
  "Teacher's Archives",
  'Traitor Lord',
  'Uoma',
  'Uumuu',
  'Vengefly King',
  'Vengefly',
  'Void Heart',
  'Wayward Compass',
  'White Palace',
  'Xero',
  'You Can Not Breathe Water', // Precept 44 because nothing else starts with "Y".
  'Zote the Mighty'
]
const namesSs = [ // From 2025 Metroidvania from Australia.
  'The Abyss',
  'Alchemist Zylotol',
  'Beastfly',
  'Bellhart',
  'Bilewater',
  'Bone Bottom',
  'Citadel',
  'Clawline',
  "Drifter's Cloak",
  'Elegy of the Deep',
  'Father of the Flame',
  'Garmond', // Zaza is seperate, since they are technically two characters usually together
  'Grand Mother Silk',
  'Greymoor',
  'Halfway Home',
  'High Halls',
  'Hornet',
  "Hunter's March",
  'Imoba',
  'Jubilana',
  'Kilik',
  'Lace',
  'Mister Mushroom',
  'Moss Mother',
  'Mount Fay',
  'Needle', // Hornet's weapon. Relevant for both.
  'Old Church', // Early name for Ruined Chapel in 2019 demo.
  'Pharloom',
  "Queen's Egg",
  'Ruined Chapel',
  'Shakra',
  'Sherma',
  'Shellwood',
  'Sil\x6b\x73\x6f\x6e\x67', // Trademarked. 79371300
  'Snail Shamans', // Group of three not found in HK2017: Chapel Maid, Caretaker, Bell Hermit
  'Trobbio',
  'Underworks',
  'Varga',
  'Weavenest Atla', // One specific weavenest, next to Moss Grotto.
  'Weavenest Murglin', // One specific weavenest, in Bilewater.
  'Weavenests', // Several places by Weavers around Pharloom.
  'Wormways',
  // No X, for now at least...
  'Yarnaby',
  'Zaza' // Garmond is seperate, since they are technically two characters usually together
]

console.log(namesHk.length * namesSs.length)

export default function generateUser (): string {
  let nameItem = namesHk[Math.floor(Math.random() * namesHk.length)]
  if (debugMode) nameItem += ' Debug'
  const hashItem = createHash('sha256').update(nameItem).digest('hex').slice(0, 6)
  const nameItemSs = namesSs[Math.floor(Math.random() * namesSs.length)]
  const hashItemSs = createHash('sha256').update(nameItemSs).digest('hex').slice(0, 6)
  return `${hashItem}${hashItemSs}`
}
