export default function load (b) {
  b.cloops = []
  b.addCloop = function (command, rate) {
    b.cloops.push({
      command,
      rate,
      interval: setInterval(() => { b.ccq.push(command) }, rate)
    })
    b.ccq.push(command)
  }
  b.removeCloop = function (index) {
    clearInterval(b.cloops[index].interval)
    b.cloops.splice(index, 1)
  }
  b.clearCloops = function () {
    for (const cloop of b.cloops) {
      clearInterval(cloop.interval)
    }
    b.cloops = []
  }
}

