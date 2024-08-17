const settings = require('../settings.json')
class Command {
  constructor (uuid, user, nick, cmd, prefix, bot, verify, prefs) {
    this.send = (text, uuid) => { bot.tellraw(uuid || '@a', text) }
    this.reply = text => bot.tellraw(uuid, text)
    this.uuid = uuid
    this.username = user
    this.nickname = nick
    this.command = cmd
    this.prefix = prefix
    this.bot = bot
    this.type = 'minecraft'
    this.index = bot.id
    this.args = cmd.split(' ').slice(1)
    this.verify = verify
    this.host = bot.host.host
    this.port = bot.host.port
    this.prefs = prefs
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
  }
}

module.exports = Command
