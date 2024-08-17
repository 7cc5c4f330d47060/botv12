// HOW TO WRITE CLASS JS
const index = require('../index.js')
const parse = require('../util/chatparse_console.js')
const settings = require('../settings.json')
class ConsoleCommand {
  constructor (cmd, index2) {
    this.send = () => {} // not needed for console
    this.reply = text => process.stdout.write(parse(text) + '\n')
    this.uuid = 'dde5a2a6-ebdd-7bbb-8eac-f75b10c10446' // hard-coded because uuid does not exist at console
    this.username = 'Owner'
    this.nickname = 'Console'
    this.command = cmd
    this.msgType = "_bot_console";
    this.prefix = '' // prefix does not exist at console
    this.bot = index2 >= 0
      ? index.bot[index2]
      : {}
    this.type = 'console'
    this.index = index2
    this.args = cmd.split(' ').slice(1)
    this.verify = 3
    this.host = ''
    this.port = '3' // :3
    this.lang = settings.defaultLang
    this.colors = settings.colors
  }
}

module.exports = ConsoleCommand
