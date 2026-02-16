import Botv12Client from './Botv12Client.js'
import JsonFormat from './interface/JsonFormat.js'
import build from './messageBuilder.js'
import TextFormat from './interface/TextFormat.js'
import NewArgumentFormat from './interface/NewArgumentFormat.js'

interface ClientStub {
  _client?: {
    uuid: string
    username: string
    end: () => void
  }
  disconnect?: boolean
  commandCore: {
    tellraw: (uuid: string, text: JsonFormat | string) => void
  }
  id?: number,
  host?: {
    host: string,
    port: number,
    options: {
      name: string
    }
  }
}

interface NewArgumentOutItem {
  fail?: boolean
  failType?: string
  value?: string | number | boolean
}

function processArgumentList (format: NewArgumentFormat[], args: string[]): Record<string, NewArgumentOutItem> {
  const output: Record<string, NewArgumentOutItem> = {}
  for(const item of format){
    let value
    let argument = ''
    let fail = false
    let failType = ''
    if (args.length == 0) {
      fail = true
      failType = 'missingArgument'
    } else {
      if (item.finish) argument = args.join(' ')
      else argument = args.splice(0, 1)[0]
      if (item.type === 'boolean') {
        if(argument.toLowerCase().startsWith('true')) value = true
        else if(argument.toLowerCase().startsWith('false')) value = false
        else if (+argument !== 0 && (+argument) + '' !== 'NaN') value = true
        else if (argument === '0') value = false
        else {
          fail = true
          failType = 'incorrectType'
        }
      } else if (item.type === 'number') {
        if(+argument + '' === 'NaN') {
          fail = true
          failType = 'incorrectType'
        } else {
          value = +argument
        }
      } else if (item.type === 'string') {
        value = argument
      }
    }
    output[item.name] = {
      fail,
      failType,
      value
    }
  }
  return output
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
  argsv2: Record<string, NewArgumentOutItem>
  cmdName: string
  prefix: string
  colors: Record<string, string>
  lang: string
  verify: number
  bot: Botv12Client | ClientStub
  cancel: boolean
  rewriteCommand: (newCmd: string) => void

  constructor (uuid: string, user: string, nick: string, cmd: string, senderType: string, msgType: string, msgSubtype: string, prefix: string, argsv2: NewArgumentFormat[], bot: Botv12Client | ClientStub) {
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
    this.argsv2 = processArgumentList(argsv2, cmd.split(' ').slice(1))
    this.cmdName = cmd.split(' ')[0]
    this.prefix = prefix
    this.colors = settings.colors
    this.lang = settings.defaultLang
    this.verify = 0
    this.bot = bot
    this.cancel = false

    this.rewriteCommand = (newCmd: string) => {
      this.command = newCmd
      this.args = newCmd.split(' ').slice(1)
      this.cmdName = newCmd.split(' ')[0]
    }
  }
}
