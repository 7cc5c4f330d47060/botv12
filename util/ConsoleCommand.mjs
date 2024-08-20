import { bots } from '../index.mjs'
import { default as parse } from './chatparse_console.mjs'
import { default as settings } from '../settings.json' with {type: "json"}
class ConsoleCommand {
  constructor (cmd, index2) {
    this.send = () => {}
    this.reply = text => process.stdout.write(parse(text) + '\n')
    this.uuid = 'dde5a2a6-ebdd-7bbb-8eac-f75b10c10446'
    this.username = 'Owner'
    this.nickname = 'Console'
    this.command = cmd
    this.msgType = '_bot_console'
    this.prefix = ''
    this.bot = index2 >= 0
      ? bots[index2]
      : {}
    this.type = 'console'
    this.args = cmd.split(' ').slice(1)
    this.verify = 3
    this.host = ''
    this.port = '3'
    this.lang = settings.defaultLang
    this.colors = settings.colors
  }
}
export default ConsoleCommand
