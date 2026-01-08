import { resolve } from 'node:path'
import { MidiData, parseMidi } from 'midi-file'
import { existsSync, readFileSync } from 'node:fs'
// import CommandQueue from '../util/CommandQueue.js';
import EventEmitter from 'node:events'
import BossBar from '../util/BossBar.js'
import { instrumentMap, percussionMap } from '../util/instrumentMap.js'
import { formatTime, getMessage } from '../util/lang.js'
import parseNBS from '../util/parseNBS.js'
import download from '../util/downloadFile.js'
import Botv12Client from '../util/Botv12Client.js'
import version from '../version.js'
import ParsedNote from '../util/ParsedNote.js'
import NbsOutputFormat from '../util/NbsOutputFormat.js'
import Note from '../util/Note.js'

const songPath = resolve(process.cwd(), 'songs')

const calculateNote = (event: {mcNote?: string, noteNumber: number}, program: number) => {
  const note = event.noteNumber
  if (program === -1) {
    return {
      pitch: Math.round(1000000 * Math.pow(2, (note - 54) / 12)) / 1000000,
      note: event.mcNote
    }
  } else {
    const keys = Object.keys(instrumentMap[program].instruments)
    for (const item of keys) {
      const range = item.split('-')
      if (note >= +range[0] && note <= +range[1]) {
        return {
          pitch: Math.round(1000000 * Math.pow(2, (note - instrumentMap[program].instruments[item].center) / 12)) / 1000000,
          note: event.mcNote ?? instrumentMap[program].instruments[item].note
        }
      }
    }
  }
  return {
    pitch: 0,
    note: 'ubot:none'
  }
}

const calculatePercussion = (event: ParsedNote) => {
  if (event.noteNumber !== undefined && percussionMap[event.noteNumber - 35]) {
    return {
      pitch: Math.round(1000000 * Math.pow(2, percussionMap[event.noteNumber - 35].pitch / 12)) / 1000000,
      note: percussionMap[event.noteNumber - 35].note
    }
  }
  return {
    pitch: 0,
    note: 'ubot:none'
  }
}

export default function load (b: Botv12Client) {
  b.interval.advanceMusicBar = setInterval(() => {
    if (!b.musicPlayer) return
    if (!b.musicPlayer.bossBar) return
    b.musicPlayer.time = b.musicPlayer.time ?? 0
    b.musicPlayer.queues = b.musicPlayer.queues ?? []
    b.musicPlayer.totalNotes = b.musicPlayer.totalNotes ?? 0
    b.musicPlayer.length = b.musicPlayer.length ?? 0
    if (settings.disableMusicBar) return
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
            ]
          },
          {
            translate: '%s/%s',
            color: 'gray',
            with: [
              {
                text: formatTime(b.musicPlayer.time),
                color: 'white'
              },
              {
                text: formatTime(b.musicPlayer.length),
                color: 'white'
              }
            ]
          }
        ]
      })
      b.musicPlayer.bossBar.updatePlayers()
    } else { 
      if(!b.musicPlayer.looping && b.musicPlayer?.queue?.length === 0){
        b.musicPlayer.bossBar?.delete()
        delete b.musicPlayer.bossBar
      }
    }
  }, 100)

  b.interval.advanceMusicQueue = setInterval(() => {
    if(!b.musicPlayer?.queue) return
    if(!b.musicPlayer?.downloadSong) return
    if (!b.musicPlayer.playing && b.musicPlayer.queue.length !== 0) {
      const queueItem = b.musicPlayer.queue.splice(0, 1)[0]
      b.musicPlayer.downloadSong(queueItem[0], queueItem[1])
    }
  }, 50)

  b.musicPlayer = new EventEmitter()
  b.musicPlayer.startTime = 0
  b.musicPlayer.startFrom = 0 // Milliseconds from start
  b.musicPlayer.nbsLoop = 0 // Ditto
  b.musicPlayer.useStartFrom = false
  b.musicPlayer.useNbsLoop = false
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
  b.musicPlayer.volume = 1
  b.musicPlayer.storedSong = Buffer.alloc(0)

  b.musicPlayer.on('songEnd', () => {
    if (!b.musicPlayer?.stopSong) return
    if (b.musicPlayer.looping !== undefined) b.musicPlayer.stopSong(b.musicPlayer.looping, true)
    if (b.musicPlayer.looping) {
      if (b.musicPlayer.playSong) {
        b.musicPlayer.playSong(b.musicPlayer.songName ?? "")
      }
    } else if (b.musicPlayer?.queue?.length === 0) {
      b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
        text: getMessage(settings.defaultLang, 'musicPlayer.finished')
      })
    }
  })

  b.musicPlayer.downloadSong = (url: string, name: string) => {
    try {
      if (url.startsWith('file://')) {
        let path = ""
        if (existsSync(url.slice(7))) path = url.slice(7)
        else if (existsSync(url.slice(7) + '.nbs')) path = url.slice(7) + '.nbs'
        else if (existsSync(url.slice(7) + '.mid')) path = url.slice(7) + '.mid'
        else if (existsSync(url.slice(7) + '.midi')) path = url.slice(7) + '.midi'
        else {
          b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
            text: getMessage(settings.defaultLang, 'musicPlayer.notFound')
          })
          return
        }
        
        if (!path.startsWith(songPath)) {
          b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
            text: getMessage(settings.defaultLang, 'musicPlayer.notFound')
          })
          return
        }
        try {
          b.musicPlayer.storedSong = readFileSync(path)
        } catch (e){
          console.log (e)
        }
        if (b.musicPlayer.playSong) b.musicPlayer.playSong(name)
      } else if (url.startsWith('ram://')){
        if (b.musicPlayer.playSong) b.musicPlayer.playSong(name)
      } else if (url.startsWith('http://') || url.startsWith('https://')) {
        b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
          translate: getMessage(settings.defaultLang, 'musicPlayer.downloading'),
          with: [url]
        })
        download(url, (err: string, output: Buffer) => {
          if (err === 'largeFile') {
            b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
              translate: getMessage(settings.defaultLang, 'downloader.tooLarge')
            })
            return
          } else if (err) {
            b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
              text: err.toString()
            })
            console.error(err)
          } else {
            b.musicPlayer.storedSong = output
          }
          if(b.musicPlayer.downloadSong) {
            b.musicPlayer.downloadSong('ram://', name)
          }
        })
      }
    } catch (e) {
      b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
        text: e + ""
      })
      console.error(e)
    }
  }

  b.musicPlayer.playSong = (name: string) => {
    if(!b.musicPlayer) return

    if (b.musicPlayer.playing) {
      b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
        text: getMessage(settings.defaultLang, 'musicPlayer.alreadyPlaying')
      })
      return
    }

    let longestDelta = 0
    let uspt = 0
    let file: MidiData | NbsOutputFormat
    if(!b.musicPlayer.storedSong) return
    try {
      if(b.musicPlayer.storedSong.toString('latin1').slice(0,4).startsWith('MThd')){
        file = parseMidi(b.musicPlayer.storedSong)
      } else {
        file = parseNBS(b.musicPlayer.storedSong)
        if (file.header.nbsLoopEnabled) {
          b.musicPlayer.nbsLoop = file.header.nbsLoopStart
          b.musicPlayer.useNbsLoop = true
        }
      }
    } catch (e) {
      console.log(e)
      return
    }

    file.tracks.forEach((track: Note[], id: number) => {
      if(!b.musicPlayer.queues) b.musicPlayer.queues = []
      b.musicPlayer.totalNotes = b.musicPlayer.totalNotes ?? 0
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
          uspt = (event.microsecondsPerBeat ?? 1) / (file.header.ticksPerBeat ?? 1)
        }
        if (event.type === 'programChange') {
          if(event?.programNumber) program = +event.programNumber
          else event.programNumber = 0
        }
        if (event.type === 'noteOn') {
          if (delta !== 0) {
            delta = 0
          }

          if (!(totalDelta < (b.musicPlayer.startFrom ?? 0) && b.musicPlayer.useStartFrom) && !(totalDelta < (b.musicPlayer.nbsLoop ?? 0) && b.musicPlayer.looping && !b.musicPlayer.useStartFrom)) {
            b.musicPlayer.queues[id].push({
              noteNumber: event.noteNumber,
              channel: event.channel,
              program,
              mcNote: event.mcNote ?? undefined,
              // mcPitch: event.mcPitch ?? null,
              volume: (event.velocity ?? 127) / 127,
              nbsStereo: event.nbsStereo ?? 0,
              time: totalDelta
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
    b.musicPlayer.lastTime = Date.now()
    b.musicPlayer.time = 0
    if (b.musicPlayer.nbsLoop && b.musicPlayer.looping) b.musicPlayer.time = b.musicPlayer.nbsLoop
    if (b.musicPlayer.startFrom) b.musicPlayer.time = b.musicPlayer.startFrom
    b.musicPlayer.length = longestDelta
    b.musicPlayer.playing = true
    //b.musicPlayer.currentSong = location
    b.musicPlayer.speedShift = b.musicPlayer.speedShift ?? 0
    if (!settings.disableMusicBar) {
      b.musicPlayer.bossBar = new BossBar(b, 'musicbar', {
        translate: '%s',
        color: 'dark_gray',
        with: [
          {
            text: `${version.botName} Music Bossbar loading...`,
            color: 'white'
          }
        ]
      }, Math.ceil(b.musicPlayer.length), 0, 'progress', 'white', '@a[tag=ubotmusic,tag=!nomusic]')
      b.musicPlayer.bossBar.updatePlayers()
    }
    b.musicPlayer.songName = name
    if (!b.musicPlayer.looping && !b.musicPlayer.startFrom) {
      b.commandCore.tellraw('@a[tag=ubotmusic,tag=!nomusic]', {
        translate: getMessage(settings.defaultLang, 'musicPlayer.nowPlaying'),
        with: [
          b.musicPlayer.songName
        ]
      })
    }
    if(b.musicPlayer.advanceNotes){
      b.interval.advanceNotes = setInterval(b.musicPlayer.advanceNotes, 20 / b.musicPlayer.speedShift)
    }
    
  }

  b.musicPlayer.stopSong = (looping?: boolean, skip?: boolean) => {
    if(!b.musicPlayer) return
    b.musicPlayer.playing = false
    b.musicPlayer.queues = []
    if (!skip) b.musicPlayer.queue = []
    b.musicPlayer.startTime = 0
    b.musicPlayer.lastTime = 0
    b.musicPlayer.time = 0
    b.musicPlayer.length = 0
    b.musicPlayer.totalNotes = 0
    b.musicPlayer.startFrom = 0
    clearInterval(b.interval.advanceNotes)
    if (!looping) {
      b.musicPlayer.looping = false
      b.musicPlayer.pitchShift = 0
      b.musicPlayer.speedShift = 1
      b.musicPlayer.nbsLoop = 0
    }
  }

  b.musicPlayer.advanceNotes = () => {
    if(!b.musicPlayer.queues) return
    b.musicPlayer.time = b.musicPlayer.time ?? 0
    b.musicPlayer.lastTime = b.musicPlayer.lastTime ?? 0
    b.musicPlayer.length = b.musicPlayer.length ?? 0
    b.musicPlayer.pitchShift = b.musicPlayer.pitchShift ?? 0
    b.musicPlayer.speedShift = b.musicPlayer.speedShift ?? 0
    b.musicPlayer.volume = b.musicPlayer.volume ?? 0
    if (b.musicPlayer.playing) {
      for (const queue of b.musicPlayer.queues) {
        let notesProcessed = 0
        for (let i = 0; i < queue.length && (queue[i].time ?? 0) < b.musicPlayer.time + 20; i++) {

          let note

          if(notesProcessed <= 150){
            if (queue[i].channel === 9) note = calculatePercussion(queue[i])
            else {
              note = calculateNote({
                noteNumber: (queue[i].noteNumber ?? 0) + b.musicPlayer.pitchShift,
                mcNote: queue[i].mcNote
              }, queue[i].program)
            }
            b.commandCore.sendCommandNow(`/execute as @a[tag=ubotmusic,tag=!nomusic] at @s run playsound ${note.note} record @s ^${queue[i].nbsStereo} ^ ^ ${(queue[i].volume ?? 1) * b.musicPlayer.volume} ${Math.min(note.pitch, 2)}`)
          }
          notesProcessed++
        }
        queue.splice(0,notesProcessed)
      }
      b.musicPlayer.time += (Date.now() - b.musicPlayer.lastTime) * b.musicPlayer.speedShift
      b.musicPlayer.lastTime = Date.now()

      if (b.musicPlayer.time > b.musicPlayer.length) {
        b.musicPlayer.emit('songEnd')
      }
    }
  }

  b.musicPlayer.setSpeed = (speed: number) => {
    if (b.interval.advanceNotes) clearInterval(b.interval.advanceNotes)
    if(b.musicPlayer.advanceNotes) b.interval.advanceNotes = setInterval(b.musicPlayer.advanceNotes, speed)
  }
}
