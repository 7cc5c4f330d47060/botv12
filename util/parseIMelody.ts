// Read IMY file and convert it for use in plugins/musicPlayer.js.
import NbsOutputFormat from './interface/NbsOutputFormat.js'

const imyRegex = /((\*[0-8])?#?[a-g][0-5])/g
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
export default function imyReader (buffer: Buffer) {
  const output: NbsOutputFormat = {
    tracks: [
      [
        {
          type: 'setTempo',
          deltaTime: 0,
          microsecondsPerBeat: 1000000 *60/100*4 // 1 second
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
      nbsLoopEnabled: false,
      nbsLoopStart: 0
    }
  }
  /*
    *3 = octave 3 (range 0-8)
    #g = note (G#)
    2 = note length (1/4)
  */

  // testString is the "MELODY" section.
  const testString = ''
  const notes = testString.match(imyRegex)
  let fullDelta = 0
  let octave = 3
  if(notes) for(let note of notes){
    if(note.startsWith('*')) {
      octave = +note[1]
      note = note.slice(2)
    }
    let nnl = 1
    if(note.startsWith('#')) nnl=2
    const noteItem = note.slice(0,nnl)
    const noteNumber = notesArray.indexOf(noteItem) + (octave * 12)
    note = note.slice(nnl)
    const length = 32 / (2 ** +note)
    output.tracks[0].push({
      type: 'noteOn',
      channel: 0,
      deltaTime: 0,
      noteNumber,
      velocity: 100
    })
    output.tracks[0].push({
      type: 'noteOff',
      channel: 0,
      deltaTime: length,
      noteNumber,
      velocity: 100
    })
    fullDelta += length
  }
  output.tracks[0].push({
      type: 'endOfTrack',
      deltaTime: 8
  })
  console.log(JSON.stringify)
  return output
}
