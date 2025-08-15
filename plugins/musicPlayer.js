import { parseMidi } from 'midi-file'
import { readFileSync } from 'node:fs'
//import CommandQueue from '../util/CommandQueue.js';
import EventEmitter from 'node:events';
import  { instrumentMap, percussionMap } from '../util/instrumentMap.js';
const twelfthRootOfTwo = 1.05946309436;

const calculateNote = (event, program) => {
  const note = event.noteNumber
  const keys = Object.keys(instrumentMap[program])
  for(const item of keys){
    const range = item.split('-')
    if(note >= +range[0] && note <= +range[1]) return {
      pitch: Math.round(10000*Math.pow(twelfthRootOfTwo, event.noteNumber-instrumentMap[program][item].center))/10000,
      note: instrumentMap[program][item].note
    }
  }
  return {
    pitch: '0',
    note: 'ubot:none'
  }
}

const calculatePercussion = (event) => {
  if(percussionMap[event.noteNumber]) return {
    pitch: Math.round(10000*Math.pow(twelfthRootOfTwo, percussionMap[event.noteNumber - 35].pitch))/10000,
    note: percussionMap[event.noteNumber - 35].note
  }
  return {
    pitch: '0',
    note: 'ubot:none'
  }
}

export default function load (b) {
  b.interval.advanceNotes = setInterval(()=>{
    if(b.musicPlayer.playing) {
      for(const queue of b.musicPlayer.queues){
        for(let i = 0; i < queue.length && queue[i].time < b.musicPlayer.time + 5; i++){
          b.sendCommandNow(`/execute as @a[tag=ubotmusic,tag=!nomusic] run playsound ${queue[i].note} master @s ~ ~1000000000 ~ 1000000000000000 ${queue[i].pitch}`)
          queue.splice(0, 1)
        }
      }
      b.musicPlayer.time = Date.now() - b.musicPlayer.startTime
      if(b.musicPlayer.time > b.musicPlayer.length){
        b.musicPlayer.emit('songEnd')
      }
    }
  },5)
  b.musicPlayer = new EventEmitter();
  b.musicPlayer.startTime = 0
  b.musicPlayer.time = 0 // Time in milliseconds
  b.musicPlayer.length = 0 // Length of longest track
  b.musicPlayer.queue = [] // Song queue
  b.musicPlayer.queues = [] // Command queues of MIDI tracks
  b.musicPlayer.playing = false
  b.musicPlayer.looping = false
  b.musicPlayer.on('songEnd', () => {
    b.musicPlayer.stopSong()
    if(b.musicPlayer.looping){
      b.musicPlayer.playSong(b.musicPlayer.currentSong)
    }
  })
  b.musicPlayer.playSong = (location) => {
    if(b.musicPlayer.playing){
      b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Already playing another song`})
      return
    }
    const file = parseMidi(readFileSync(location))
    console.log(file)
    let longestTrack;
    let longestDelta = 0;
    let uspt = 0;
    file.tracks.forEach((track, id) => {
      b.musicPlayer.queues[id] = [];
      let program = 0;
      let delta = 0;
      let totalDelta = 0;
      for(const event of track){
        if(event.deltaTime !== 0) {
          delta += (event.deltaTime * uspt) / 1000
          totalDelta += (event.deltaTime * uspt) / 1000
        }
        if(event.type === 'setTempo') {
          uspt = event.microsecondsPerBeat / file.header.ticksPerBeat
        }
        if(event.type === 'programChange') {
          program = event.programNumber
        }
        if(event.type === 'noteOn') {
          if(delta !== 0){
            delta = 0
          }
          let note;
          if(event.channel === 9) note = calculatePercussion(event)
          else note = calculateNote(event, program)

          if(note.note != 'ubot:none') b.musicPlayer.queues[id].push({
            time: totalDelta,
            note: note.note,
            pitch: note.pitch
          })
        }
        if(event.type === 'endOfTrack') {
          b.musicPlayer.queues[id].trackLength = totalDelta
          if(totalDelta > longestDelta){
            longestTrack = id
            longestDelta = totalDelta
          }
        }
      }
      b.musicPlayer.startTime = Date.now()
      b.musicPlayer.length = longestDelta
      b.musicPlayer.playing = true
      b.musicPlayer.currentSong = location
    })
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Now playing ${location}`})
  }
  b.musicPlayer.stopSong = () => {
    b.musicPlayer.playing = false
    b.musicPlayer.startTime = 0
    b.musicPlayer.time = 0
    b.musicPlayer.length = 0
  }
}
