const settings = require('../settings.json')
class Command {
  constructor (uuid, user, nick, cmd, msgType, msgSubtype, prefix, bot, prefs) {
    this.send = (text, uuid) => { bot.tellraw(uuid || '@a', text) }
    this.reply = text => bot.tellraw(uuid, text)
    this.uuid = uuid
    this.username = user
    this.nickname = nick
    this.command = cmd
    this.msgType = msgType
    this.msgSubtype = msgSubtype
    this.prefix = prefix
    this.bot = bot
    this.type = 'minecraft'
    this.args = cmd.split(' ').slice(1)
    this.cmdName = cmd.split(' ')[0]
    this.verify = 0
    this.host = bot.host.host
    this.port = bot.host.port
    this.serverName = bot.host.options.name
    this.prefs = prefs
    this.cancel = false
    if (prefs.lang) {
      this.lang = prefs.lang
    } else {
      this.lang = settings.defaultLang
    }

    const _colors = {}
    if (prefs.colorPrimary) {
      _colors.primary = prefs.colorPrimary
    } else {
      _colors.primary = settings.colors.primary
    }
    if (prefs.colorSecondary) {
      _colors.secondary = prefs.colorSecondary
    } else {
      _colors.secondary = settings.colors.secondary
    }
    this.colors = _colors

    this.rewriteCommand = newCmd => {
      this.command = newCmd
      this.args = newCmd.split(' ').slice(1)
      this.cmdName = newCmd.split(' ')[0]
    }
  }
}

module.exports = Command
