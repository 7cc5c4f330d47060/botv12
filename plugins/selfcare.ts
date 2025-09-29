import settings from "../settings.js"
import botVersion from "../util/version.ts"
import version from "../version.js"
import UBotClient from "../util/UBotClient.ts"

class SCTask {
  failTask: any
  failed: boolean

  constructor (failTask: any, startFailed = false) {
    /*
         * failed: Whether to run this task
         * failTask: Command to run when failed is true
    */
    this.failed = startFailed
    this.failTask = failTask
  }
}

export default function load (b: UBotClient) {
  b.selfCare = {}
  b.selfCare.tasks = {}
  b.selfCare.lastRun = 0
  b._client.on('login', () => {
    b.interval.sc = setInterval(() => {
      if (Date.now() - b.selfCare.lastRun <= 600) {
        return
      }
      for (const i in b.selfCare.tasks) {
        if (b.selfCare.tasks[i].failed) {
          b.selfCare.tasks[i].failTask()
          b.selfCare.lastRun = Date.now()
        }
      }
    }, 200)
  })
  b.selfCare.addTask = (name: string, failTask: any, startFailed: boolean) => {
    b.selfCare.tasks[name] = new SCTask(failTask, startFailed)
  }

  // Self care tasks

  // Operator
  b.selfCare.addTask('debugMode', () => {
    //b.clientChat.send(`${version.botName} version ${botVersion} - Debug Mode enabled`)
    b.selfCare.tasks.debugMode.failed = false
  })
  b.selfCare.tasks.debugMode.failed = settings.debugMode

  // Operator
  b.selfCare.addTask('op', () => {
    b.clientChat.send('/op @s[type=player]')
  })
  b._client.on('login', (p) => {
    b.entityId = p.entityId
  })
  b._client.on('entity_status', (p) => {
    if (p.entityId === b.entityId && p.entityStatus === 24) {
      b.selfCare.tasks.op.failed = true
    } else if (p.entityId === b.entityId && p.entityStatus === 28) {
      b.selfCare.tasks.op.failed = false
    }
  })

  // CommandSpy
  if (!b.host.options.isVanilla) {
    b.selfCare.addTask('cspy', () => {
      if (!b.clientChat.chatqueue.slice(0, 5).includes('/cspy on')) b.clientChat.send('/cspy on')
    }, true)
    b.on('plainchat', (msg) => {
      if (msg === 'Successfully disabled CommandSpy') {
        b.selfCare.tasks.cspy.failed = true
      } else if (msg === 'Successfully enabled CommandSpy') {
        b.selfCare.tasks.cspy.failed = false
      }
    })
  }

  // Gamemode / end portal bug
  b.selfCare.addTask('gamemode', () => {
    b.clientChat.send('/minecraft:gamemode creative')
  })
  b._client.on('game_state_change', (p) => {
    if (p.reason === 3 && p.gameMode !== 1) {
      b.selfCare.tasks.gamemode.failed = true
    } else if (p.reason === 3 && p.gameMode === 1) {
      b.selfCare.tasks.gamemode.failed = false
    } else if (p.reason === 4) {
      b.selfCare.tasks.respawn.failed = true
    }
  })

  // Respawning after dying
  b.selfCare.addTask('respawn', () => {
    b._client.write('client_command', { actionId: 0 }) // Simulates respawning
    b.selfCare.tasks.respawn.failed = false
  })

  b.on('chat_unparsed', (data) => {
    if (data.json.translate === 'chat.disabled.options' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'chat.disabled.options') ||
    data.json.translate === 'Chat disabled in client options' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'Chat disabled in client options')) {
      b.selfCare.tasks.respawn.failed = true
    }
  })

  b.selfCare.addTask('cc_pos', () => {
    b.clientChat.send('/minecraft:tp ~ 40 ~')
  })
}
