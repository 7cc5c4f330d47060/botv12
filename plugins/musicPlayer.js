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
        pitch: Math.round(10000 * Math.pow(2, (note - instrumentMap[program][item].center) / 12)) / 10000,
        note: event.mcNote ?? instrumentMap[program][item].note
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
  b.interval.advanceMusicBar = setInterval(() => {
    if (b.musicPlayer.playing) {
      b.musicPlayer.bossBar.setValue(Math.ceil(b.musicPlayer.time))
      let remainingNotes = 0
      for (const queue of b.musicPlayer.queues) {
        remainingNotes += queue.length
      }
      b.musicPlayer.bossBar.setDisplay({
        translate: '%s | %s | %s',
        color: 'dark_gray',
        with: [
          {
            text: b.musicPlayer.songName,
            color: 'white'
          },
          {
            translate: '%s/%s',
            color: 'gray',
            with: [
              {
                text: (b.musicPlayer.totalNotes - remainingNotes) + '',
                color: 'white'
              },
              {
                text: (b.musicPlayer.totalNotes) + '',
                color: 'white'
              }
            ],
          },
          {
            translate: '%s/%s',
            color: 'gray',
            with: [
              {
                text: formatTime(b.musicPlayer.time, 'shortTime', true),
                color: 'white'
              },
              {
                text: formatTime(b.musicPlayer.length, 'shortTime', true),
                color: 'white'
              }
            ]
          }
        ]
      })
      b.musicPlayer.bossBar.updatePlayers()
    } else {
      b.musicPlayer.bossBar?.delete()
    }
  }, 100)

  b.interval.advanceMusicQueue = setInterval(() => {
    if (!b.musicPlayer.playing && b.musicPlayer.queue.length !== 0){
      const queueItem = b.musicPlayer.queue.splice(0, 1)[0]
      b.musicPlayer.downloadSong(queueItem[0], queueItem[1])
    }
  }, 50)

  b.musicPlayer = new EventEmitter()
  b.musicPlayer.startTime = 0
  b.musicPlayer.lastTime = 0
  b.musicPlayer.time = 0 // Time in milliseconds
  b.musicPlayer.length = 0 // Length of longest track
  b.musicPlayer.totalNotes = 0
  b.musicPlayer.queue = [] // Song queue
  b.musicPlayer.queues = [] // Command queues of MIDI tracks
  b.musicPlayer.playing = false
  b.musicPlayer.songName = ''
  b.musicPlayer.looping = false
  b.musicPlayer.pitchShift = 0 // In semitones
  b.musicPlayer.speedShift = 1

  b.musicPlayer.on('songEnd', () => {
    b.musicPlayer.stopSong(b.musicPlayer.looping)
    if (b.musicPlayer.looping) {
      b.musicPlayer.playSong(b.musicPlayer.currentSong, b.musicPlayer.songName)
    }
  })

  b.musicPlayer.downloadSong = (url, name) => {
    try {
      if(url.startsWith('file://')) {
        b.musicPlayer.playSong(url.slice(7), name)
      }
    } catch (e) {
      console.log(e)
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

          b.musicPlayer.queues[id].push({
            noteNumber: event.noteNumber,
            channel: event.channel,
            program: program,
            time: totalDelta
          })
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
    b.musicPlayer.lastTime = Date.now()
    b.musicPlayer.length = longestDelta
    b.musicPlayer.playing = true
    b.musicPlayer.currentSong = location
    b.musicPlayer.bossBar = new BossBar(b, 'musicbar', 'UBot Music Bossbar [Loading...]', Math.ceil(b.musicPlayer.length), 0, 'progress', 'white', '@a[tag=ubotmusic,tag=!nomusic]')
    b.musicPlayer.bossBar.updatePlayers()
    b.musicPlayer.songName = name
    if(!b.musicPlayer.looping) b.tellraw('@a[tag=ubotmusic,tag=!nomusic]', { text: `Now playing ${b.musicPlayer.songName}` })
    b.interval.advanceNotes = setInterval(b.musicPlayer.advanceNotes, 20 / b.musicPlayer.speedShift)

  }

  b.musicPlayer.stopSong = (looping, skip) => {
    b.musicPlayer.playing = false
    b.musicPlayer.queues = []
    if(!skip) b.musicPlayer.queue = []
    b.musicPlayer.startTime = 0
    b.musicPlayer.lastTime = 0
    b.musicPlayer.time = 0
    b.musicPlayer.length = 0
    b.musicPlayer.totalNotes = 0
    clearInterval(b.interval.advanceNotes)
    if (!looping){
      b.musicPlayer.looping = false
      b.musicPlayer.pitchShift = 0
      b.musicPlayer.speedShift = 1
    }
  }

  b.musicPlayer.advanceNotes = () => {
    if (b.musicPlayer.playing) {
      for (const queue of b.musicPlayer.queues) {
        for (let i = 0; i < queue.length && queue[i].time < b.musicPlayer.time + 20; i++) {
          let note
          if (queue[i].channel === 9) note = calculatePercussion(queue[i]);
          else note = calculateNote({
            noteNumber: queue[i].noteNumber + b.musicPlayer.pitchShift
          }, queue[i].program)
          b.sendCommandNow(`/execute as @a[tag=ubotmusic,tag=!nomusic] at @s run playsound ${note.note} record @s ~ ~ ~ ${note.volume ?? 1} ${note.pitch}`)
          queue.splice(0, 1)
        }
      }
      b.musicPlayer.time += (Date.now() - b.musicPlayer.lastTime) * b.musicPlayer.speedShift
      b.musicPlayer.lastTime = Date.now()

      if (b.musicPlayer.time > b.musicPlayer.length) {
        b.musicPlayer.emit('songEnd')
      }
    }
  }

  b.musicPlayer.setSpeed = speed => {
    if(b.interval.advanceNotes) clearInterval(b.interval.advanceNotes)
    b.interval.advanceNotes = setInterval(b.musicPlayer.advanceNotes, speed)
  }
}
