// Read IMY file and convert it for use in plugins/musicPlayer.js.
import type NbsOutputFormat from '../interface/NbsOutputFormat.js'

const imyRegex = /(?:(?:\*[0-8])?(?:#?[a-gr][0-5]\.?|(vibe|back|led)o(ff|n)))/g
const notesArray = [
  'c',
  '#c',
  'd',
  '#d',
  'e',
  'f',
  '#f',
  'g',
  '#g',
  'a',
  '#a',
  'b'
]
const styles = [
  21 / 20,
  1,
  2
]
export default function imyReader (buffer: Buffer) {
  const string = buffer.toString('utf-8').replace(/\r/g, '').split('\n')
  const parsed: Record<string, string> = {}
  let lastKey = ''
  for (const item of string) {
    if (!item.includes(':')) {
      lastKey += item
      continue
    }
    lastKey = item.split(':')[0].toUpperCase()
    parsed[lastKey] = item.slice(lastKey.length + 1)
  }
  console.log(JSON.stringify(parsed))
  let bpm = 120
  if (parsed.BEAT) {
    bpm = +parsed.BEAT
  }
  /* let phoneVolume = 7
  if(parsed.VOLUME) {
    phoneVolume = +(parsed.VOLUME.slice(1))
  } */
  let style = 0
  if (parsed.STYLE) {
    if (parsed.STYLE.startsWith('V')) style = +(parsed.STYLE.slice(1))
    else style = +parsed.STYLE
  }

  const output: NbsOutputFormat = {
    tracks: [
      [
        {
          type: 'setTempo',
          deltaTime: 0,
          microsecondsPerBeat: 1000000 * 60 / bpm * 4
        },
        {
          type: 'programChange',
          deltaTime: 0,
          programNumber: 0
        }
      ]
    ],
    header: {
      ticksPerBeat: 32,
      nbsLoopEnabled: true,
      nbsLoopStart: 12
    }
  }
  /*
    *3 = octave 3 (range 0-8)
    #g = note (G#)
    2 = note length (1/4)
  */

  // testString is the "MELODY" section.
  const testString = parsed.MELODY
  // const testString = 'r2vibeonvibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2vibeonr2ledonr2vibeonr2vibeon'
  const notes = testString.match(imyRegex)
  // let fullDelta = 0

  let deltaTime = 0

  if (notes) {
    for (let note of notes) {
    // botv12 is not a mobile phone and can't use these features.
      if (note.startsWith('vibe') || note.startsWith('back') || note.startsWith('led')) continue

      if (note.startsWith('r')) {
        deltaTime += (32 / (2 ** +note[1])) * styles[style]
        continue
      }
      let octave = 4
      if (note.startsWith('*')) {
        octave = +note[1]
        note = note.slice(2)
      }
      let nnl = 1
      if (note.startsWith('#')) nnl = 2
      const noteItem = note.slice(0, nnl)
      const noteNumber = notesArray.indexOf(noteItem) + (octave * 12) + 12
      note = note.slice(nnl)
      let length = 32 / (2 ** +note)
      note = note.slice(1)
      if (note === '.') length *= 1.5
      else if (note === ':') length *= 1.75
      else if (note === ';') length *= 2 / 3
      output.tracks[0].push({
        type: 'noteOn',
        channel: 0,
        deltaTime,
        noteNumber,
        velocity: 100
      })
      output.tracks[0].push({
        type: 'noteOff',
        channel: 0,
        deltaTime: length * styles[style],
        noteNumber,
        velocity: 100
      })
      deltaTime = 0
      // fullDelta += length
    }
  }
  output.tracks[0].push({
    type: 'endOfTrack',
    deltaTime: 0
  })
  return output
}
