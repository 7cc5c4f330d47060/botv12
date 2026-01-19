// Read NBS file and convert it for use in plugins/musicPlayer.js.
import { fromArrayBuffer, Layer, SongInstruments } from '@nbsjs/core'
import NbsOutputFormat from './interface/NbsOutputFormat.js'
import instrumentMapNbs from './instrumentMapNbs.js'

interface CalculatedNote {
  mcNote: string
  pitch: number
}

function calculateNoteNbs (note: number, pitch: number, instruments: SongInstruments): CalculatedNote {
  const output = {
    mcNote: 'block.note_block.harp',
    pitch
  }
  if (instrumentMapNbs[note]) {
    const imItem = instrumentMapNbs[note]
    const pitchOffset = imItem.baseInstrument.center - 66
    const pitchAdjusted = pitch - pitchOffset
    for(const note of imItem.instruments){
      if(pitchAdjusted >= note.center - 24 && pitchAdjusted <= note.center) {
        output.mcNote = note.note
        const pitchOffset2 = note.center - 66
        output.pitch = pitch - pitchOffset2
        break;
      }
    }
  }
  else output.mcNote = instruments.all[note]?.name ?? 'block.note_block.harp'
  return output
}
export default function nbsReader (buffer: Buffer) {
  const nbs = fromArrayBuffer(new Uint8Array(buffer).buffer)
  const output: NbsOutputFormat = {
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
        programNumber: -1
      }
    ]
    const layerVolume = layer.volume
    let lastDelta = 0
    // 0 = 54 = F#3
    // 12 = 66 = F#4
    // 24 = 78 = F#5, presumably
    for (const delta in layer.notes.all) {
      const note = layer.notes.all[delta]
      const pitchMidi = note.key + 9 + (45 - nbs.instruments.all[note.instrument].key)
      const calculatedNote = calculateNoteNbs(note.instrument, pitchMidi, nbs.instruments)
      output.tracks[id].push({
        type: 'noteOn',
        deltaTime: +delta - lastDelta,
        mcNote: calculatedNote.mcNote,
        noteNumber: calculatedNote.pitch,
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
