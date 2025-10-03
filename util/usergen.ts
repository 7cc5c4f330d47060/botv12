import { createHash } from 'crypto'
import settings from '../settings'

const names = [ // From 2017 Metroidvania from Australia
  // HC
  'Fungus1_28',
  // RG
  'Crossroads_46b',
  'Crossroads_50',
  'Ruins2_10',
  // City of Tears
  'Crossroads_49b',
  // East Deepnest
  'Abyss_03_c',
  // West Deepnest
  'Abyss_03_b',
  'Fungus2_25',
  // Waterways
  'Abyss_01',
  'Abyss_02',
  // Gardens
  'Deepnest_43',
  // Wastes
  'Deepnest_01',
  // Crossroads
  'Mines_33',
]
export default function generateUser (): string{
  return `${createHash('sha256').update(names[Math.floor(Math.random()*names.length)]).digest('hex').slice(0,10)}${settings.debugMode?'Debug':''}`
}
