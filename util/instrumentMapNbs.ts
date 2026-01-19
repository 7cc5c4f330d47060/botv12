/*
  'block.note_block.harp',
  'block.note_block.bass',
  'block.note_block.basedrum',
  'block.note_block.snare',
  'block.note_block.hat',
  'block.note_block.guitar',
  'block.note_block.flute',
  'block.note_block.bell',
  'block.note_block.chime',
  'block.note_block.xylophone',
  'block.note_block.iron_xylophone',
  'block.note_block.cow_bell',
  'block.note_block.didgeridoo',
  'block.note_block.bit',
  'block.note_block.banjo',
  'block.note_block.pling'
*/
const instruments = {
  harp: {
    center: 66,
    note: 'minecraft:block.note_block.harp'
  },
  bass: {
    center: 42,
    note: 'minecraft:block.note_block.bass'
  },
  bassDrum: {
    center: 66,
    note: 'minecraft:block.note_block.basedrum'
  },
  snare: {
    center: 66,
    note: 'minecraft:block.note_block.snare'
  },
  hat: {
    center: 66,
    note: 'minecraft:block.note_block.hat'
  },
  guitar: {
    center: 54,
    note: 'minecraft:block.note_block.guitar'
  },
  flute: {
    center: 78,
    note: 'minecraft:block.note_block.flute'
  },
  bell: {
    center: 90,
    note: 'minecraft:block.note_block.bell'
  },
  chime: {
    center: 90,
    note: 'minecraft:block.note_block.chime'
  },
  xylophone: {
    center: 90,
    note: 'minecraft:block.note_block.xylophone'
  },
  ironXylophone: {
    center: 66,
    note: 'minecraft:block.note_block.iron_xylophone'
  },
  cowBell: {
    center: 78,
    note: 'minecraft:block.note_block.cow_bell'
  },
  didgeridoo: {
    center: 42,
    note: 'minecraft:block.note_block.didgeridoo'
  },
  bit: {
    center: 66,
    note: 'minecraft:block.note_block.bit'
  },
  banjo: {
    center: 66,
    note: 'minecraft:block.note_block.banjo'
  },
  pling: {
    center: 66,
    note: 'minecraft:block.note_block.pling'
  }
}
class ImItem {
  instruments: {center: number, note: string}[]
  baseInstrument: {center: number, note: string}
  constructor (...args: {center: number, note: string}[]) {
    this.instruments = []
    this.baseInstrument = args[0]
    for (const arg of args) {
      this.instruments.push(arg)
    }
  }
}
const instrumentMapNbs: ImItem[] = [
  new ImItem(instruments.harp, instruments.bass, instruments.bell), // harp
  new ImItem(instruments.bass, instruments.harp, instruments.bell), // bass
  new ImItem(instruments.bassDrum), // basedrum
  new ImItem(instruments.snare), // snare
  new ImItem(instruments.hat), // hat
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell), // guitar
  new ImItem(instruments.flute, instruments.guitar, instruments.bass, instruments.bell), // flute
  new ImItem(instruments.bell, instruments.bass, instruments.harp), // bell
  new ImItem(instruments.chime, instruments.bass, instruments.harp), // chime
  new ImItem(instruments.xylophone, instruments.bass, instruments.ironXylophone), // xylophone
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone), // iron_xylophone
  new ImItem(instruments.cowBell, instruments.harp, instruments.bass, instruments.bell), // cow_bell
  new ImItem(instruments.didgeridoo, instruments.banjo, instruments.xylophone), // didgeridoo
  new ImItem(instruments.bit, instruments.bass, instruments.bell), // bit
  new ImItem(instruments.banjo, instruments.didgeridoo, instruments.bell), // banjo
  new ImItem(instruments.pling, instruments.bass, instruments.bell) // harp
]
export default instrumentMapNbs

