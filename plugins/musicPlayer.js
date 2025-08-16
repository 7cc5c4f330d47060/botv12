import { resolve } from 'node:path'
import { parseMidi } from 'midi-file'
import { readFileSync } from 'node:fs'
// import CommandQueue from '../util/CommandQueue.js';
import EventEmitter from 'node:events'
import BossBar from '../util/BossBar.js'
import { instrumentMap, percussionMap } from '../util/instrumentMap.js'
import { formatTime } from '../util/lang.js'

const songPath = resolve(process.cwd(), 'songs')
const tempPath = resolve(process.cwd(), 'temp')

const calculateNote = (event, program) => {
  const note = event.noteNumber
  const keys = Object.keys(instrumentMap[program])
  for (const item of keys) {
    const range = item.split('-')
    if (note >= +range[0] && note <= +range[1]) {
      return {
        pitch: Math.round(10000 * Math.pow(2, (event.noteNumber - instrumentMap[program][item].center) / 12)) / 10000,
        note: instrumentMap[program][item].note
      }
    }
  }
  return {
    pitch: '0',
    note: 'ubot:none'
  }
}

const calculatePercussion = (event) => {
  if (percussionMap[event.noteNumber - 35]) {
    return {
      pitch: Math.round(10000 * Math.pow(2, percussionMap[event.noteNumber - 35].pitch / 12)) / 10000,
      note: percussionMap[event.noteNumber - 35].note
    }
  }
  return {
    pitch: '0',
    note: 'ubot:none'
  }
}

export default function load (b) {
  b.interval.advanceNotes = setInterval(() => {
    if (b.musicPlayer.playing) {
      for (const queue of b.musicPlayer.queues) {
        for (let i = 0; i < queue.length && queue[i].time < b.musicPlayer.time + 5; i++) {
          b.sendCommandNow(`/execute as @a[tag=ubotmusic,tag=!nomusic] run playsound ${queue[i].note} master @s ~ ~1000000000 ~ 1000000000000000 ${queue[i].pitch}`)
          queue.splice(0, 1)
        }
      }
      b.musicPlayer.time = Date.now() - b.musicPlayer.startTime
      if (b.musicPlayer.time > b.musicPlayer.length) {
        b.musicPlayer.emit('songEnd')
      }
    } else if (b.musicPlayer.queue.length !== 0){
      const queueItem = b.musicPlayer.queue.splice(0, 1)[0]
      b.musicPlayer.downloadSong(queueItem[0], queueItem[1])
    }
  }, 5)

  b.interval.advanceMusicBar = setInterval(() => {
    if (b.musicPlayer.playing) {
      b.musicPlayer.bossBar.setValue(Math.ceil(b.musicPlayer.time))
      let remainingNotes = 0
      for (const queue of b.musicPlayer.queues) {
        remainingNotes += queue.length
      }
      b.musicPlayer.bossBar.setDisplay({
        translate: 'UBot Music Bossbar %s/%s %s/%s',
        with: [
          b.musicPlayer.totalNotes - remainingNotes,
          b.musicPlayer.totalNotes,
          formatTime(b.musicPlayer.time, 'shortTime', true),
          formatTime(b.musicPlayer.length, 'shortTime', true)
        ]
      })
    } else {
      b.musicPlayer.bossBar?.delete()
    }
  }, 100)

  b.musicPlayer = new EventEmitter()
  b.musicPlayer.startTime = 0
  b.musicPlayer.time = 0 // Time in milliseconds
  b.musicPlayer.length = 0 // Length of longest track
  b.musicPlayer.totalNotes = 0
  b.musicPlayer.queue = [] // Song queue
  b.musicPlayer.queues = [] // Command queues of MIDI tracks
  b.musicPlayer.playing = false
  b.musicPlayer.looping = false

  b.musicPlayer.on('songEnd', () => {
    b.musicPlayer.stopSong(b.musicPlayer.looping)
    if (b.musicPlayer.looping) {
      b.musicPlayer.playSong(b.musicPlayer.currentSong)
    }
  })

  b.musicPlayer.downloadSong = (url, name) => {
    if(url.startsWith('file://')) {
      b.musicPlayer.playSong(url.slice(7), name)
    }
  }

  b.musicPlayer.playSong = (location, name) => {
    if (!location.startsWith(songPath) && !location.startsWith(tempPath)) {
      c.reply(songPath)
      return
    }

    if (b.musicPlayer.playing) {
      b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', { text: 'Already playing another song' })
      return
    }
    
    let longestDelta = 0
    let uspt = 0
    const file = parseMidi(readFileSync(location))

    file.tracks.forEach((track, id) => {
      b.musicPlayer.queues[id] = []
      let program = 0
      let delta = 0
      let totalDelta = 0
      for (const event of track) {
        if (event.deltaTime !== 0) {
          delta += (event.deltaTime * uspt) / 1000
          totalDelta += (event.deltaTime * uspt) / 1000
        }
        if (event.type === 'setTempo') {
          uspt = event.microsecondsPerBeat / file.header.ticksPerBeat
        }
        if (event.type === 'programChange') {
          program = event.programNumber
        }
        if (event.type === 'noteOn') {
          if (delta !== 0) {
            delta = 0
          }
          let note
          if (event.channel === 9) note = calculatePercussion(event)
          else note = calculateNote(event, program)

          if (note.note !== 'ubot:none') {
            b.musicPlayer.queues[id].push({
              time: totalDelta,
              note: note.note,
              pitch: note.pitch
            })
          }
        }
        if (event.type === 'endOfTrack') {
          // b.musicPlayer.queues[id].trackLength = totalDelta
          if (totalDelta > longestDelta) {
            longestDelta = totalDelta
          }
        }
      }
      b.musicPlayer.totalNotes += b.musicPlayer.queues[id].length
    })

    b.musicPlayer.startTime = Date.now()
    b.musicPlayer.length = longestDelta
    b.musicPlayer.playing = true
    b.musicPlayer.currentSong = location
    b.musicPlayer.bossBar = new BossBar(b, 'musicbar', 'UBot Music Bossbar', Math.ceil(b.musicPlayer.length), 0, 'progress', 'white', '@a[tag=ubotmusic,tag=!nomusic]')
    b.musicPlayer.bossBar.updatePlayers()
    b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', { text: `Now playing ${name}` })
  }
  b.musicPlayer.stopSong = (looping) => {
    b.musicPlayer.playing = false
    b.musicPlayer.queues = []
    b.musicPlayer.startTime = 0
    b.musicPlayer.time = 0
    b.musicPlayer.length = 0
    b.musicPlayer.totalNotes = 0
    if (!looping) b.musicPlayer.looping = false
  }
}
