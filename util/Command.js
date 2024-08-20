import { default as settings } from '../settings.json' with {type: "json"}
class Command {
  constructor (uuid, user, nick, cmd, msgType, prefix, bot, verify, prefs) {
    this.send = (text, uuid) => { bot.tellraw(uuid || '@a', text) }
    this.reply = text => bot.tellraw(uuid, text)
    this.uuid = uuid
    this.username = user
    this.nickname = nick
    this.command = cmd
    this.msgType = msgType
    this.prefix = prefix
    this.bot = bot
    this.type = 'minecraft'
    this.args = cmd.split(' ').slice(1)
    this.verify = verify
    this.host = bot.host.host
    this.port = bot.host.port
    this.prefs = prefs
    this.lang = settings.defaultLang
    this.colors = settings.colors
  }
}

export default Command
