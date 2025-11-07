import { createHash } from 'crypto'
import settings from '../settings'

const names = [ // From 2017 and 2025 Metroidvania from Australia. atob = spoilers.
  // 2017 ("HK") Locations where title appears in large letters upon first entry.
  "Dirtmouth",
  "Forgotten Crossroads",
  atob('SW5mZWN0ZWQgQ3Jvc3Nyb2Fkcw=='),
  "Greenpath",
  "Fungal Wastes",
  "Fog Canyon",
  "Queen's Gardens",
  "Deepnest",
  "Kingdom's Edge",
  "Royal Waterways",
  "City of Tears",
  "Howling Cliffs",
  "Ancient Basin",
  "Crystal Peak",
  "Resting Grounds",
  atob('VGhlIEFieXNz'),
  atob('VGhlIEhpdmU='),
  atob('V2hpdGUgUGFsYWNl'),
  // 2018 Locations added to 2017
  atob('R29kaG9tZQ=='),
  // 2025 ("HK: SS") locations excluding an area with the same name as 2017 from Wiki.
  "Bellhart",
  "Bilewater",
  "Blasted Steps",
  atob('VGhlIENyYWRsZQ=='),
  "Deep Docks",
  "Far Fields",
  "Greymoor",
  "Hunter's March",
  "The Marrow",
  "Moss Grotto",
  "Mount Fay",
  "Putrified Ducts",
  atob('UmVkIE1lbW9yeQ=='),
  "Sands of Karak",
  "Shellwood",
  "Sinner's Road",
  "The Slab",
  "Underworks",
  "Verdania",
  atob('V2VhdmVuZXN0IEF0bGE='),
  "Wisp Thicket",
  "Wormways",
  // Kingdom of 2017
  "Hallownest",
  // Acts of 2025
  "Pharloom",
  atob('Q2l0YWRlbCBvZiBTb25n'),
  atob('QWJ5c3M=')
]
export default function generateUser (): string{
  return `${createHash('sha256').update(names[Math.floor(Math.random()*names.length)]).digest('hex').slice(0,10)}${settings.debugMode?'Debug':''}`
}
