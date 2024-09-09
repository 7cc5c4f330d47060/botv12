const index = require('../index.js')
const parse = require('../util/chatparse_console.js')
const settings = require('../settings.json')
const version = require("../version.json")
class ConsoleCommand {
  constructor (cmd, index2) {
    this.send = () => {}
    this.reply = text => process.stdout.write(parse(text) + '\n')
    this.uuid = 'dde5a2a6-ebdd-7bbb-8eac-f75b10c10446'
    this.username = 'Owner'
    this.nickname = 'Owner'
    this.command = cmd
    this.msgType = '_bot_console'
    this.prefix = ''
    this.bot = index2 >= 0
      ? index.bot[index2]
      : {}
    this.type = 'console'
    this.args = cmd.split(' ').slice(1)
    this.cmdName = cmd.split(' ')[0]
    this.verify = 2
    this.host = ''
    this.port = '3'
    this.serverName = `${version.botName} Console`
    this.lang = settings.defaultLang
    this.colors = settings.colors
  }
}

module.exports = ConsoleCommand
