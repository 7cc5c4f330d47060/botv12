import { WebSocketServer, WebSocket } from 'ws'
import Botv12Client from '../util/game/Botv12Client.js'
import parse3 from '../util/game/chat/jsonparse.js'
import registry from '../util/game/botcmd/commands.js'
import { Server } from 'node:http'
import { getMessage } from '../util/text/lang.js'
import CommandContext from '../util/game/botcmd/CommandContext.js'
import type JsonFormat from '../util/interface/JsonFormat.js'
import createServer2 from '../util/net/webServer.js'
import botByName from '../util/hf/botByName.js'

const uuid = '21234569-89ab-cdef-0123-412789a42def'
const user = 'Default User'
const nick = 'Default User'

let wss: WebSocketServer
let httpServer: Server

if (!clOptions.disableWsServer) {
  wss = new WebSocketServer({
    port: settings.wsPort ?? 12365
  })

  httpServer = createServer2()
  httpServer.listen(settings.httpPort ?? 12376)

  const sendRaw = (client: WebSocket, type: string, data: JsonFormat | string) => client.send(JSON.stringify({
    event: 'rawChat',
    data: {
      data: parse3(data, 'html'),
      msgType: type
    }
  }))

  wss.on('connection', client => {
    const serverList = []
    const verify = 0
    for (const bot of bots) {
      if (bot.host.options.hidden) {
        serverList.push({ id: bot.id, host: 'hidden', port: 25565 })
      } else {
        serverList.push({ id: bot.id, host: bot.host.host, port: bot.host.port ?? 25565 })
      }
      client.send(JSON.stringify({
        event: 'playerInfo',
        data: {
          server: bot.id,
          data: bot.playerInfo.players
        }
      }))
    }
    client.send(JSON.stringify({
      event: 'serverList',
      data: {
        data: serverList
      }
    }))
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
          commandCore: { tellraw: (_unused: string, data: JsonFormat | string) => sendRaw(client, 'cmdoutput', data) }
        }
        const json = JSON.parse(data.toString('utf8'))
        if (json.event === 'command') {
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
              return
            }

            // Block running eval in minecraft
            if (cmd.consoleOnly) {
              sendRaw(client, 'cmderror', getMessage(settings.defaultLang, 'command.disabled.consoleOnly.noWs'))
              return
            }

            if (cmd.level !== undefined && cmd.level > verify) {
              sendRaw(client, 'cmderror', getMessage(settings.defaultLang, 'command.disallowed.perms'))
              return
            }
            if (cmd.consoleIndex) {
              const index2 = args.splice(1, 1)[0]
              if (index2 === '*') {
                for (const bot of bots) {
                  const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'ws_console', '', cmd.argsFormat, bot)
                  // context.verify = 2
                  cmd.execute(context)
                }
              } else {
                let index3: string | number = index2
                const bbn = botByName(index2)
                if (typeof bbn !== 'undefined') index3 = bbn
                const context = new CommandContext(uuid, user, nick, args.join(' '), 'console', 'console', 'ws_console', '', cmd.argsFormat, bots[+index3])
                // context.verify = 2
                cmd.execute(context)
              }
            } else {
              const context = new CommandContext(uuid, user, nick, json.data.command, 'console', 'console', 'ws_console', '', cmd.argsFormat, consoleBotStub)
              // context.verify = 2
              cmd.execute(context)
            }
          } catch (e) {
            console.log(e)
          }
        }
      } catch (e) { console.log(e) }
    })
  })
}

export default function load (b: Botv12Client) {
  if (clOptions.disableWsServer) return
  b.on('chat', (data) => {
    if (data.json.translate === 'advMode.setCommand.success') return
    const msgHtml = parse3(data.json, 'html')
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        event: 'serverChat',
        data: {
          server: b.id,
          serverName: b.host.options.name,
          type: data.type,
          uuid: data.uuid,
          data: msgHtml
        }
      }))
    })
  })
  b.on('playerquit', uuid => {
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        event: 'playerQuit',
        data: {
          server: b.id,
          uuid
        }
      }))
    })
  })
  // b.emit('playerdata', uuid, displayName, realName)
  b.on('playerdata', (uuid, displayName, realName) => {
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        event: 'playerAdd',
        data: {
          server: b.id,
          uuid,
          displayName,
          realName
        }
      }))
    })
  })
  b._client.on('end', () => {
    wss.clients.forEach(client => {
      client.send(JSON.stringify({
        event: 'playerClear',
        data: {
          server: b.id
        }
      }))
    })
  })
}
