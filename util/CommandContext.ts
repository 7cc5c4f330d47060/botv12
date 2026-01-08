
import build from './messageBuilder.js'
import TextFormat from './TextFormat.js'

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
  bot: any
  cancel: boolean
  rewriteCommand: (newCmd: string) => void

  constructor (uuid: string, user: string, nick: string, cmd: string, senderType: string, msgType: string, msgSubtype: string, prefix: string, bot: any) {
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
