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
  load: () => {

  },
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
  }
}
