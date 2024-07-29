class SCTask {
  constructor (failTask, chatCommand, startFailed = false) {
    /*
         * failed: Whether to run this task
         * failTask: Command to run when failed is true
         * chatCommand: Whether to run failTask in chat rather than in command block
    */
    this.failed = startFailed
    this.failTask = failTask
    this.chatCommand = chatCommand
  }
}
module.exports = {
  loadBot: (b) => {
    b.sc_tasks = {}
    b.interval.sc = setInterval(() => {
      for (const i in b.sc_tasks) {
        if (b.sc_tasks[i].failed) {
          if (b.sc_tasks[i].chatCommand) {
            b.chat(b.sc_tasks[i].failTask)
          } else {
            b.ccq.push(b.sc_tasks[i].failTask) // Does not automatically reset
          }
        }
      }
    }, 1000)
    b.add_sc_task = (name, failTask, chatCommand, startFailed) => {
      b.sc_tasks[name] = new SCTask(failTask, chatCommand, startFailed)
    }

    // Selfcare tasks

    // Operator
    b.add_sc_task('op', '/op @s[type=player]', true)
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
    
    // Commandspy
    b.add_sc_task('cspy', '/cspy on', true, true)
    b.on('plainchat', (msg) => {
      if (msg === 'Successfully disabled CommandSpy') {
        b.sc_tasks.cspy.failed = 1
      } else if (msg === 'Successfully enabled CommandSpy') {
        b.sc_tasks.cspy.failed = 0
      }
    })

    // Gamemode
    b.add_sc_task('gamemode', '/minecraft:gamemode creative', true)
    b._client.on('game_state_change', (p) => {
      if (p.reason === 3 && p.gameMode !== 1) {
        b.sc_tasks.gamemode.failed = 1
      } else if (p.reason === 3 && p.gameMode === 1) {
        b.sc_tasks.gamemode.failed = 0
      }
    })
  }
}
