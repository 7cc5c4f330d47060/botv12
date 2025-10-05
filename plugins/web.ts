import { WebSocketServer } from "ws"
import UBotClient from "../util/UBotClient";
import parse3 from '../util/chatparse.ts'
import registry from "../util/commands.ts";
import settings from "../settings.js";
import { getMessage } from "../util/lang.ts";
import { bots } from "../index.ts";
import CommandContext from "../util/CommandContext.ts";

const wss = new WebSocketServer({
  port: 12365
})

const uuid = '21234569-89ab-cdef-0123-412789a42def'
const user = "Default User"
const nick = "Default User"
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
        commandCore: { tellraw: (_unused: any, data: string) => client.send(JSON.stringify({
          event: "rawChat",
          data: {
            data: parse3(data, 'html')
          }
        }))}
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
          if (cmd.debugOnly && !settings.debugMode) {
            console.log(getMessage(settings.defaultLang, 'command.disabled.debugOnly'))
            //console.log('This command must be run with Debug Mode enabled.') // Hard-coded until language is readded
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


export default function load (b: UBotClient) {
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
