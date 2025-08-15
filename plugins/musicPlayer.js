import { parseMidi } from 'midi-file'
import { readFileSync } from 'node:fs'
import CommandQueue from '../util/CommandQueue.js';
import EventEmitter from 'node:events';
const twelfthRootOfTwo = 1.05946309436;

export default function load (b) {
  b.musicPlayer = new EventEmitter();
  b.musicPlayer.queue = [] // Song queue
  b.musicPlayer.queues = [] // Command queues of MIDI tracks
  b.musicPlayer.playing = false
  b.musicPlayer.looping = false
  b.musicPlayer.on('songEnd', () => {
    if(b.musicPlayer.looping){
      b.musicPlayer.playing = false
      b.musicPlayer.playSong(b.musicPlayer.currentSong)
    } else {
      b.musicPlayer.playing = false
    }
  })
  b.musicPlayer.playSong = (location) => {
    if(b.musicPlayer.playing){
      b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Already playing another song`})
      return
    }
    const file = parseMidi(readFileSync(location))
    console.log(file)
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Ticks per beat: ${file.header.ticksPerBeat}`})
    let longestTrack;
    let longestDelta = 0;
    let uspt = 400;
    file.tracks.forEach((track, id) => {
      b.musicPlayer.queues[id] = new CommandQueue(b);
      b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `μs per tick: ${uspt}`})
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
        if(event.type === 'noteOn') {
          if(delta !== 0){
            b.musicPlayer.queues[id].queue.push(`s${delta}`)
            delta = 0
          }
          b.musicPlayer.queues[id].queue.push(`c/execute as @a[tag=ubotmusic,tag=!nomusic] run playsound minecraft:block.note_block.harp master @s ~ ~1000000000 ~ 1000000000000000 ${Math.pow(twelfthRootOfTwo, event.noteNumber-54)}`)
        }
        if(event.type === 'endOfTrack') {
          b.musicPlayer.queues[id].trackLength = totalDelta
          if(totalDelta > longestDelta){
            longestTrack = id
            longestDelta = totalDelta
          }
          if(delta !== 0){
            b.musicPlayer.queues[id].queue.push(`s${delta}`)
            delta = 0
          }
          b.musicPlayer.queues[id].queue.push(`e`)
        }
      }
      b.musicPlayer.queues[longestTrack].on('end', () => b.musicPlayer.emit('songEnd'))
      b.musicPlayer.playing = true
      b.musicPlayer.currentSong = location
    })
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Now playing ${location}`})
    for(const noteQueue of b.musicPlayer.queues){
      noteQueue.createTimeout(10)
    }
  }
  b.musicPlayer.stopSong = () => {
    b.musicPlayer.playing = false
    for(const track of b.musicPlayer.queues){
      track.stop()
    }
  }
}
