
import EventEmitter from 'node:events'
import BossBar from './BossBar.js'
import Botv12Client from './Botv12Client.js'
import build from './messageBuilder.js'
import ParsedNote from './ParsedNote.js'
import TextFormat from './TextFormat.js'

interface MusicPlayerStub extends EventEmitter {
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
interface ClientStub {
  _client?: {
    uuid: string
    username: string
    end: () => void
  }
  disconnect?: boolean
  commandCore: {
    tellraw: (uuid: string, text: string) => void
  }
  clientChat?: {
    send: (message: string) => void
  }
  id?: number,
  host?: {
    host: string,
    port: number
  }
  musicPlayer?: MusicPlayerStub,
  filter?: {
    filteredPlayers: { username: string, uuid: string, method: string }[]
    isFiltered: (user: string) => boolean
    addFilter: (uuid: string, name: string, method?: string) => void
    removeFilter: (user: string) => void
  }
  playerInfo?: {
    findUUID: (name: string) => string
    findRealNameFromUUID: (uuid: string) => string
  }

}
export default class CommandContext {
  uuid: string
  reply: (text: TextFormat | string) => void
  send: (user: string, text: TextFormat | string) => void
  username: string
  command: string
  type: string
  msgType: string
  msgSubtype: string
  args: string[]
  cmdName: string
  prefix: string
  colors: Record<string, string>
  lang: string
  verify: number
  bot: Botv12Client | ClientStub
  cancel: boolean
  rewriteCommand: (newCmd: string) => void

  constructor (uuid: string, user: string, nick: string, cmd: string, senderType: string, msgType: string, msgSubtype: string, prefix: string, bot: Botv12Client | ClientStub) {
    this.uuid = uuid
    this.reply = (text: TextFormat | string) => bot.commandCore.tellraw(uuid, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    this.send = (user: string, text: TextFormat | string) => bot.commandCore.tellraw(user, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    this.username = user
    //this.nickname = nick
    this.command = cmd
    this.type = senderType
    this.msgType = msgType
    this.msgSubtype = msgSubtype
    this.args = cmd.split(' ').slice(1)
    this.cmdName = cmd.split(' ')[0]
    this.prefix = prefix
    this.colors = settings.colors
    this.lang = settings.defaultLang
    this.verify = 0
    //this.host = bot?.host.host
    //this.port = bot?.host.port
    this.bot = bot
    this.cancel = false

    this.rewriteCommand = (newCmd: string) => {
      this.command = newCmd
      this.args = newCmd.split(' ').slice(1)
      this.cmdName = newCmd.split(' ')[0]
    }
  }
}
