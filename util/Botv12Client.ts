import { createClient, Client } from 'minecraft-protocol'
import EventEmitter from 'node:events'
import { default as registry } from 'prismarine-registry'
import BossBar from './BossBar.js'
import ParsedNote from './ParsedNote.js'
import FilteredPlayer from './FilteredPlayer.js'
import offlineUUID from './offlineUUID.js'

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
  host: any
  interval: Record<string, NodeJS.Timeout>
  info: (msg: string) => void
  displayChat: (type: string, subtype: string, msg: string) => void
  entityId?: number
  registry: registry.Registry
  disconnect?: boolean
  ready: boolean

  // Plugins
  clientChat: any
  selfCare: any
  serverChat: any
  position: any
  commandCore: any
  commands: any
  chunks: any
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

  constructor (options?: any) {
    super()

    
    this.ready = false
    this._client = createClient(options)
    this.interval = {}

    // Plugins, again...
    this.clientChat = {}
    this.selfCare = {} 
    this.serverChat = {}
    this.playerInfo = {
      findUUID: (name: string) => { return offlineUUID(name) },
      findRealNameFromUUID: (uuid: string) => { return uuid },
      findDisplayName: (uuid: string) => { return uuid },
      findRealName: (name: string) => { return name }
    }
    this.position = {}
    this.commandCore = {}
    this.commands = {}
    this.chunks = {}
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
      if (settings.displaySubtypesToConsole) {
        console.log(`[${this.id}] [${type}] [${subtype}] ${msg}`)
      } else {
        console.log(`[${this.id}] [${type}] ${msg}`)
      }
    }
  }
}