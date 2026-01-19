import { createClient, Client, ClientOptions } from 'minecraft-protocol'
import EventEmitter from 'node:events'
import { default as registry } from 'prismarine-registry'
import BossBar from './BossBar.js'
import ParsedNote from './interface/ParsedNote.js'
import FilteredPlayer from './interface/FilteredPlayer.js'
import offlineUUID from './offlineUUID.js'
import SCTask from './SCTask.js'
import console from 'node:console'
import HostOptions from './interface/HostOptions.js'
import { PCChunk } from 'prismarine-chunk'
import JsonFormat from './interface/JsonFormat.js'

interface MusicPlayer extends EventEmitter {
  /*
    b.musicPlayer = new EventEmitter()
    b.musicPlayer.startTime: number
    b.musicPlayer.startFrom: number
    b.musicPlayer.nbsLoop: number
    b.musicPlayer.useStartFrom: boolean
    b.musicPlayer.useNbsLoop: boolean
    b.musicPlayer.lastTime: number
    b.musicPlayer.time: number
    b.musicPlayer.length: number
    b.musicPlayer.totalNotes: number
    b.musicPlayer.queues = [] // Command queues of MIDI tracks
    b.musicPlayer.playing: boolean
    b.musicPlayer.songName: string
    b.musicPlayer.looping: boolean
    b.musicPlayer.pitchShift: number
    b.musicPlayer.speedShift: number
    b.musicPlayer.volume: number
    */
  queue?: [string, string][]
  queues?: ParsedNote[][]
  startTime?: number
  startFrom?: number
  nbsLoop?: number
  useStartFrom?: boolean
  useNbsLoop?: boolean
  lastTime?: number
  time?: number
  length?: number
  totalNotes?: number
  playing?: boolean
  songName?: string
  looping?: boolean
  restart?: boolean
  pitchShift?: number
  speedShift?: number
  volume?: number
  bossBar?: BossBar
  currentSong?: string
  storedSong?: Buffer
  downloadSong?: (url: string, name: string) => void
  playSong?: (name: string) => void
  stopSong?: (looping?: boolean, skip?: boolean) => void
  advanceNotes?: () => void
  setSpeed?: (speed: number) => void
}


export default class Botv12Client extends EventEmitter {
  _client: Client
  id?: number
  host: HostOptions
  interval: Record<string, NodeJS.Timeout>
  info: (msg: string) => void
  displayChat: (type: string, subtype: string, msg: string) => void
  entityId?: number
  registry: registry.Registry
  disconnect?: boolean
  ready: boolean
  isBot: true

  // Plugins
  clientChat: {
    chatqueue: string[]
    send: (...msgs: string[]) => void
  }
  selfCare: {
    tasks: Record<string, SCTask>
    lastRun: number
    addTask: (name: string, failTask: () => void, startFailed?: boolean) => void
  }
  
  serverChat: {
    messageTypes: {
      translation_key: string;
      parameters: string[];
      style: Record<string, string>;
    }[]
    messageCount: number
    disabledUntil: number
  }
  position: {
    currentChunk: {x: number, z: number}
    pos: {x: number, y: number, z: number}
  }
  commandCore: {
    ccq: string[]
    ccqv2: Record<string,  { commands: string[], count: number }>
    blocknoX: number
    blocknoY: number
    blocknoZ: number
    ccStarted: boolean
    tellraw: (uuid: string, text: JsonFormat | string) => void
    sendCommandNow: (text: string) => void
    advanceccq: () => void
  }
  commands: {
    lastCmd: number
    runCommand: (user: string, nick: string, uuid: string, command: string, type: string, subtype: string, prefix: string) => void
  }
  chunks: PCChunk[][]
  musicPlayer: MusicPlayer
  filter: {
    filteredPlayers: { username: string, uuid: string, method: string }[]
    isFiltered: (user: string) => boolean
    addFilter: (uuid: string, name: string, method?: string) => void
    removeFilter: (user: string) => void
  }
  playerInfo: {
    players?: Record<string, { realName: string, displayName: string, here?: boolean }>
    findUUID: (name: string) => string
    findRealNameFromUUID: (uuid: string) => string
    findDisplayName: (uuid: string) => string
    findRealName: (name: string) => string
  }

  constructor (options: ClientOptions) {
    super()

    this.ready = false
    this.isBot = true
    this._client = createClient(options)
    this.interval = {}

    this.host = {
      host: options.host ?? 'localhost',
      port: options.port,
      options: {
        name: '(server name not set)'
      }
    }

    // Plugins, again...
    this.clientChat = {
      chatqueue: [],
      send: (...msgs: string[]) => { for(const msg of msgs) this._client.chat(msg) }
    }
    this.selfCare = {
      tasks: {},
      lastRun: 0,
      addTask: (name: string, failTask: () => void, startFailed?: boolean) => {
        this.selfCare.tasks[name] = new SCTask(failTask, startFailed)
      }
    } 
    this.serverChat = {
      messageTypes: [],
      disabledUntil: 0,
      messageCount: 0
    }
    this.playerInfo = {
      findUUID: (name: string) => { return offlineUUID(name) },
      findRealNameFromUUID: (uuid: string) => { return uuid },
      findDisplayName: (uuid: string) => { return uuid },
      findRealName: (name: string) => { return name }
    }
    this.position = {
      currentChunk: {x: 0, z: 0},
      pos: {x: 0, y: 0, z: 0}
    }
    this.commandCore = {
      ccq: [],
      ccqv2: {},
      blocknoX: 0,
      blocknoY: 0,
      blocknoZ: 0,
      ccStarted: false,
      tellraw: () => {console.log('Command core not loaded')},
      sendCommandNow: () => {console.log('Command core not loaded')},
      advanceccq: () => {this.commandCore.ccq.splice(0,1)}
    }
    this.commands = {
      lastCmd: 0,
      runCommand: () => console.log("Command plugin is not loaded")
    }
    this.chunks = []
    this.musicPlayer = new EventEmitter()
    this.filter = {
      filteredPlayers: [],
      isFiltered: (user: string) => { return user == '' },
      addFilter: (uuid: string, username: string, method = 'legacy') => {
        this.filter.filteredPlayers.push({ username, uuid, method })
      },
      removeFilter: (user: string) => {
        this.filter.filteredPlayers.forEach((item: FilteredPlayer, index: number) => {
          if (item.uuid === user) this.filter.filteredPlayers.splice(index, 1)
        })
      }
    }

    this.registry = registry(this._client.version)

    this._client.on('error', (err: Error) => {
      if (debugMode) console.log(err)
    })

    // Functions directly from botvX
    this.info = (msg: string) => {
      console.log(`[${this.id}] [info] ${msg}`)
    }

    this.displayChat = (type: string, subtype: string, msg: string) => {
      if (debugMode) {
        console.log(`[${this.id}] [${type}] [${subtype}] ${msg}`)
      } else {
        console.log(`[${this.id}] [${type}] ${msg}`)
      }
    }
  }
}