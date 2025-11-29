// From hhhzzzsss' mod SongPlayer (https://github.com/hhhzzzsss/SongPlayer), licensed as MIT.
// Copied from ChomeNS' ChipmunkMod fork which uses the exact same data.
const instruments = {
  bass: {
    center: 42,
    note: 'minecraft:block.note_block.bass'
  },
  harp: {
    center: 66,
    note: 'minecraft:block.note_block.harp'
  },
  pling: {
    center: 66,
    note: 'minecraft:block.note_block.pling'
  },
  bell: {
    center: 90,
    note: 'minecraft:block.note_block.bell'
  },
  didgeridoo: {
    center: 42,
    note: 'minecraft:block.note_block.didgeridoo'
  },
  bit: {
    center: 66,
    note: 'minecraft:block.note_block.bit'
  },
  ironXylophone: {
    center: 66,
    note: 'minecraft:block.note_block.iron_xylophone'
  },
  xylophone: {
    center: 90,
    note: 'minecraft:block.note_block.xylophone'
  },
  guitar: {
    center: 54,
    note: 'minecraft:block.note_block.guitar'
  },
  flute: {
    center: 78,
    note: 'minecraft:block.note_block.flute'
  },
  chime: {
    center: 90,
    note: 'minecraft:block.note_block.chime'
  },
  banjo: {
    center: 66,
    note: 'minecraft:block.note_block.banjo'
  }
}
class ImItem {
  instruments: any
  constructor (...args: any[]) {
    this.instruments = []
    for (const arg of args) {
      this.instruments[(arg.center - 12) + '-' + (arg.center + 12)] = arg
    }
  }
}
class PmItem {
  pitch: number
  note: string
  constructor (pitch: number, note: string) {
    this.pitch = pitch
    this.note = `block.note_block.${note}`
  }
}

const instrumentMap: any = [
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),

  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),

  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.guitar, instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.bass, instruments.harp, instruments.bell),
  new ImItem(instruments.bass, instruments.harp, instruments.bell),
  new ImItem(instruments.bass, instruments.harp, instruments.bell),
  new ImItem(instruments.bass, instruments.harp, instruments.bell),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),
  new ImItem(instruments.didgeridoo, instruments.bit, instruments.xylophone),

  new ImItem(instruments.flute, instruments.guitar, instruments.bass, instruments.bell),
  new ImItem(instruments.flute, instruments.guitar, instruments.bass, instruments.bell),
  new ImItem(instruments.flute, instruments.guitar, instruments.bass, instruments.bell),
  new ImItem(instruments.flute, instruments.guitar, instruments.bass, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.chime),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),

  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),

  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),
  new ImItem(instruments.flute, instruments.didgeridoo, instruments.ironXylophone, instruments.bell),

  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(),
  new ImItem(),
  new ImItem(instruments.bit, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.bass, instruments.bell),

  new ImItem(instruments.banjo, instruments.bass, instruments.bell),
  new ImItem(instruments.banjo, instruments.bass, instruments.bell),
  new ImItem(instruments.banjo, instruments.bass, instruments.bell),
  new ImItem(instruments.banjo, instruments.bass, instruments.bell),
  new ImItem(instruments.banjo, instruments.bass, instruments.bell),
  new ImItem(instruments.harp, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.didgeridoo, instruments.bell),
  new ImItem(instruments.harp, instruments.didgeridoo, instruments.bell),

  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone),
  new ImItem(instruments.ironXylophone, instruments.bass, instruments.xylophone)
]

const percussionMap: any = [
  new PmItem(-2, 'basedrum'),
  new PmItem(-6, 'basedrum'),
  new PmItem(-6, 'hat'),
  new PmItem(-4, 'snare'),
  new PmItem(-6, 'hat'),
  new PmItem(-8, 'snare'),
  new PmItem(-6, 'basedrum'),
  new PmItem(10, 'snare'),
  new PmItem(1, 'basedrum'),
  new PmItem(10, 'snare'),
  new PmItem(3, 'basedrum'),
  new PmItem(6, 'snare'),
  new PmItem(8, 'basedrum'),
  new PmItem(11, 'basedrum'),
  new PmItem(5, 'snare'),
  new PmItem(11, 'basedrum'),
  new PmItem(12, 'snare'),
  new PmItem(-4, 'snare'),
  new PmItem(1, 'snare'),
  new PmItem(6, 'hat'),
  new PmItem(6, 'snare'),
  new PmItem(-11, 'hat'),
  new PmItem(1, 'snare'),
  new PmItem(-10, 'hat'),
  new PmItem(1, 'snare'),
  new PmItem(-3, 'hat'),
  new PmItem(-10, 'hat'),
  new PmItem(-4, 'hat'),
  new PmItem(10, 'basedrum'),
  new PmItem(3, 'basedrum'),
  new PmItem(1, 'snare'),
  new PmItem(-4, 'snare'),
  new PmItem(-4, 'hat'),
  new PmItem(-9, 'hat'),
  new PmItem(8, 'hat'),
  new PmItem(11, 'hat'),
  new PmItem(12, 'hat'),
  new PmItem(12, 'hat'),
  new PmItem(5, 'hat'),
  new PmItem(-1, 'hat'),
  new PmItem(6, 'hat'),
  new PmItem(-3, 'hat'),
  new PmItem(-7, 'hat'),
  new PmItem(10, 'hat'),
  new PmItem(7, 'snare'),
  new PmItem(5, 'hat'),
  new PmItem(10, 'hat'),
  new PmItem(10, 'snare'),
  new PmItem(12, 'chime'),
  new PmItem(12, 'chime'),
  new PmItem(9, 'hat'),
  new PmItem(2, 'basedrum'),
  new PmItem(-5, 'basedrum')
]

export {
  instrumentMap,
  percussionMap
}
