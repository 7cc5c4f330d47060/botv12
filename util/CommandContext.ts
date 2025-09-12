import settings from '../settings.js'
import build from './messageBuilder.ts'
export default class CommandContext {
  uuid: string
  reply: any
  username: string
  command: string
  args: string[]
  cmdName: string
  prefix: string
  lang: string
  verify: number
  bot: any
  cancel: boolean
  rewriteCommand: any

  constructor (uuid, user, nick, cmd, senderType, msgType, msgSubtype, prefix, bot) {
    this.uuid = uuid
    this.reply = text => bot.commandCore.tellraw(uuid, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    //this.send = (user, text) => bot.tellraw(user, build(text, settings.colors, settings.defaultLang, bot._client?.uuid ?? uuid))
    this.username = user
    //this.nickname = nick
    this.command = cmd
    //this.type = senderType
    //this.msgType = msgType
    //this.msgSubtype = msgSubtype
    this.args = cmd.split(' ').slice(1)
    this.cmdName = cmd.split(' ')[0]
    this.prefix = prefix
    //this.colors = settings.colors
    this.lang = settings.defaultLang
    this.verify = 0
    //this.host = bot?.host.host
    //this.port = bot?.host.port
    this.bot = bot

    this.rewriteCommand = newCmd => {
      this.command = newCmd
      this.args = newCmd.split(' ').slice(1)
      this.cmdName = newCmd.split(' ')[0]
    }
  }
}
