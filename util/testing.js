const r = {}

class Rl {
  constructor (time) {
    this.start = Date.now()
    this.end = Date.now() + time
  }
}

module.exports = {
  start: function (name, time) {
    r[name] = new Rl(time)
  },
  check: function (name) {
    if (!r[name]) return true
    return r[name]?.end < Date.now()
  }
}
