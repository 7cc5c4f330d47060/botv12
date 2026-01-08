import { WebSocketServer } from "ws"
import Botv12Client from "../util/Botv12Client";
import parse3 from '../util/chatparse.js'
import registry from "../util/commands.js"

import { getMessage } from "../util/lang.js"
import { bots } from "../index.js"
import CommandContext from "../util/CommandContext.js"

const uuid = '21234569-89ab-cdef-0123-412789a42def'
const user = "Default User"
const nick = "Default User"

let wss: WebSocketServer;

if(!clOptions.disableWsServer){
  wss = new WebSocketServer({
    port: 12365
  })

  const sendRaw = (client: any, type: string, data: string) => client.send(JSON.stringify({
    event: "rawChat",
    data: {
      data: parse3(data, 'html'),
      msgType: type
    }
  }))


  wss.on('connection', client => {
    client.on('message', data => {
      try {
        const consoleBotStub = {
          host: {
            host: '',
            port: 0,
            options: {
              name: 'WebSocket Console'
            }
          },
          commandCore: { tellraw: (_unused: any, data: string) => sendRaw(client, 'cmdoutput', data) }
        }
        const json: any = JSON.parse(data.toString('utf8'))
        if(json.event == "command"){
          const args = json.data.command.split(' ')
          const cmdName = args[0].toLowerCase()

          try {
            const cmd = registry.getCommand(cmdName)

            if (!cmd) {
              return
            }

            // Block running eval in normal mode
            if (cmd.debugOnly && !debugMode) {
              sendRaw(client, 'cmderror', getMessage(settings.defaultLang, 'command.disabled.debugOnly'))
              //console.log('This command must be run with Debug Mode enabled.') // Hard-coded until language is readded
              return
            }

            // Block running eval in minecraft
            if (cmd.consoleOnly) {
              sendRaw(client, 'cmderror', getMessage(settings.defaultLang, 'command.disabled.consoleOnly.noWs'))
              return
            }

            if (cmd.consoleIndex) {
              const index2 = args.splice(1, 1)[0]
              if (index2 === '*') {
                for (let i = 0; i < bots.length; i++) {
                  const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', bots[i])
                  //context.verify = 2
                  cmd.execute(context)
                }
              } else {
                const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'console', '', bots[+index2])
                //context.verify = 2
                cmd.execute(context)
              }
            } else {
              const context = new CommandContext(uuid, user, nick, json.data.command, 'console', 'console', 'console', '', consoleBotStub)
              //context.verify = 2
              cmd.execute(context)
            }
          } catch (e) {
            console.log(e)
          }
        }
      } catch (e) {}
    })
  })
}

export default function load (b: Botv12Client) {
  if(clOptions.disableWsServer) return
  b.on('chat', (data) => {
    if (data.json.translate === 'advMode.setCommand.success') return
    const msgHtml = parse3(data.json, 'html')
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        event: "serverChat",
        data: {
          server: b.id,
          type: data.type,
          data: msgHtml
        }
      }))
    })
  })
}
