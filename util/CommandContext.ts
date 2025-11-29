
import build from './messageBuilder.js'
import Botv12Client from './Botv12Client.js'
export default class CommandContext {
  uuid: string
  reply: (text: any) => void
  send: (user: string, text: any) => void
  username: string
  command: string
  type: string
  args: string[]
  cmdName: string
  prefix: string
  colors: any
  lang: string
  verify: number
  bot: any
  cancel: boolean
  rewriteCommand: any

  constructor (uuid: string, user: string, nick: string, cmd: string, senderType: string, msgType: string, msgSubtype: string, prefix: string, bot: any) {
    this.uuid = uuid
    this.reply = (text: any) => bot.commandCore.tellraw(uuid, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    this.send = (user: string, text: any) => bot.commandCore.tellraw(user, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    this.username = user
    //this.nickname = nick
    this.command = cmd
    this.type = senderType
    //this.msgType = msgType
    //this.msgSubtype = msgSubtype
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
