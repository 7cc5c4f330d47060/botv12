import Botv12Client from "../util/Botv12Client"

export default function load (b: Botv12Client) {
  b.cloopManager.cloops = []
  b.cloopManager.addCloop = function (command: string, rate: number) {
    b.cloopManager.cloops.push({
      command,
      rate,
      interval: setInterval(() => { b.commandCore.ccq.push(command) }, rate)
    })
    b.commandCore.ccq.push(command)
  }
  b.cloopManager.removeCloop = function (index: number) {
    clearInterval(b.cloopManager.cloops[index].interval)
    b.cloopManager.cloops.splice(index, 1)
  }
  b.cloopManager.clearCloops = function () {
    for (const cloop of b.cloopManager.cloops) {
      clearInterval(cloop.interval)
    }
    b.cloopManager.cloops = []
  }
}
