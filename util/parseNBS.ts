// Read NBS file and convert it for use in plugins/musicPlayer.js.
import { fromArrayBuffer, Layer, SongInstruments } from '@nbsjs/core'
const standardNotes = [ // Data from hhhzzzsss' SongPlayer, licensed as MIT.
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
]
function calculateNoteNbs (note: number, instruments: SongInstruments): string | undefined {
  if (standardNotes[note]) return `minecraft:${standardNotes[note]}`
  else return instruments.all[note].name
}
export default function nbsReader (buffer: Buffer) {
  const nbs = fromArrayBuffer(new Uint8Array(buffer).buffer)
  const output: any = {
    tracks: [],
    header: {
      ticksPerBeat: nbs.getTempo(),
      nbsLoopEnabled: nbs.loop.enabled,
      nbsLoopStart: (nbs.loop.startTick * 1000) / nbs.getTempo()
    }
  }
  nbs.layers.all.forEach((layer: Layer, id) => {
    output.tracks[id] = [
      {
        type: 'setTempo',
        deltaTime: 0,
        microsecondsPerBeat: 1000000 // 1 second
      },
      {
        type: 'programChange',
        deltaTime: 0,
        programNumber: 'nbs'
      }
    ]
    const layerVolume = layer.volume
    let lastDelta = 0
    for (const delta in layer.notes.all) {
      const note = layer.notes.all[delta]
      output.tracks[id].push({
        type: 'noteOn',
        deltaTime: +delta - lastDelta,
        mcNote: calculateNoteNbs(note.instrument, nbs.instruments),
        noteNumber: note.key + 9 + (45 - nbs.instruments.all[note.instrument].key),
        velocity: ((note.velocity * 127) / 100) * (layerVolume / 100),
        nbsStereo: layer.stereo ? (layer.stereo + note.panning) / -100 : note.panning / -50
      })
      lastDelta = +delta
    }
    output.tracks[id].push({
      type: 'endOfTrack',
      deltaTime: 1 + nbs.getLength() - lastDelta
    })
  })
  return output
}
