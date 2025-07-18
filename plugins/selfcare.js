class SCTask {
  constructor (failTask, startFailed = false) {
    /*
         * failed: Whether to run this task
         * failTask: Command to run when failed is true
    */
    this.failed = startFailed
    this.failTask = failTask
  }
}

export default function load (b) {
  b.sc_tasks = {}
  b.selfcareRun = 0
  b._client.on('login', () => {
    b.interval.sc = setInterval(() => {
      if (Date.now() - b.selfcareRun <= 600) {
        return
      }
      for (const i in b.sc_tasks) {
        if (b.sc_tasks[i].failed) {
          b.sc_tasks[i].failTask()
        }
      }
      b.selfcareRun = Date.now()
    }, 200)
  })
  b.add_sc_task = (name, failTask, startFailed) => {
    b.sc_tasks[name] = new SCTask(failTask, startFailed)
  }

  // Self care tasks

  // Operator
  b.add_sc_task('op', () => {
    b.chat('/op @s[type=player]')
  })
  b._client.on('login', (p) => {
    b.entityId = p.entityId
  })
  b._client.on('entity_status', (p) => {
    if (p.entityId === b.entityId && p.entityStatus === 24) {
      b.sc_tasks.op.failed = 1
    } else if (p.entityId === b.entityId && p.entityStatus === 28) {
      b.sc_tasks.op.failed = 0
    }
  })

  // CommandSpy
  if (!b.host.options.isVanilla) {
    b.add_sc_task('cspy', () => {
      b.chat('/cspy on')
    }, true)
    b.on('plainchat', (msg) => {
      if (msg === 'Successfully disabled CommandSpy') {
        b.sc_tasks.cspy.failed = 1
      } else if (msg === 'Successfully enabled CommandSpy') {
        b.sc_tasks.cspy.failed = 0
      }
    })
  }

  // Gamemode / end portal bug
  b.add_sc_task('gamemode', () => {
    b.chat('/minecraft:gamemode creative')
  })
  b._client.on('game_state_change', (p) => {
    if (p.reason === 3 && p.gameMode !== 1) {
      b.sc_tasks.gamemode.failed = 1
    } else if (p.reason === 3 && p.gameMode === 1) {
      b.sc_tasks.gamemode.failed = 0
    } else if (p.reason === 4) {
      b.sc_tasks.respawn.failed = 1
    }
  })

  // Respawning after dying
  b.add_sc_task('respawn', () => {
    b._client.write('client_command', { actionId: 0 }) // Simulates respawning
    b.sc_tasks.respawn.failed = 0
  })

  b.on('chat_unparsed', (data) => {
    if (data.json.translate === 'chat.disabled.options' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'chat.disabled.options') ||
    data.json.translate === 'Chat disabled in client options' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'Chat disabled in client options')) {
      b.sc_tasks.respawn.failed = 1
    }
  })

  b.add_sc_task('cc_pos', () => {
    b.chat('/minecraft:tp ~ 40 ~')
  })
}
