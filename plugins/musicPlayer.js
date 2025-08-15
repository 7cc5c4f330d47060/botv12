import { parseMidi } from 'midi-file'
import { readFileSync } from 'node:fs'
import CommandQueue from '../util/CommandQueue.js';
const twelfthRootOfTwo = 1.05946309436;

export default function load (b) {
  b.musicPlayer = {
    queues: [],
    songQueue: [],
    currentSong: '',
  }
  b.musicPlayer.playSong = (location) => {
    const file = parseMidi(readFileSync(location))
    console.log(file)
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Ticks per beat: ${file.header.ticksPerBeat}`})
    b.musicPlayer.currentSong = location
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `Now playing ${location}`})
    file.tracks.forEach((track, id) => {
      b.musicPlayer.queues[id] = new CommandQueue(b);
      let delta = 0;
      let uspt = 0;
      for(const event of track){
        if(event.deltaTime !== 0 && event.type !== 'noteOn') {
          delta += (event.deltaTime * uspt) / 1000
        }
        if(event.type !== 'noteOn') {
          if(delta !== 0){
            b.musicPlayer.queues[id].queue.push(`s${delta}`)
            delta = 0
          }
          b.musicPlayer.queues[id].queue.push(`c/execute as @a[tag=ubotmusic,tag=!nomusic] run playsound minecraft:block.note_block.harp master @s ~ ~1000000000 ~ 1000000000000000 ${Math.pow(twelfthRootOfTwo, event.noteNumber-54)}`)
        }
        if(event.type === 'setTempo') {
          uspt = event.microsecondsPerBeat / file.header.ticksPerBeat
          b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {text: `μs per tick: ${uspt}`})
        }
      }
      for(const noteQueue of b.musicPlayer.queues){
        noteQueue.createTimeout(10)
      }
    })
  }
}
