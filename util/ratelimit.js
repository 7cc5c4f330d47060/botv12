const limits = {}

class Rl {
  constructor (time) {
    this.start = Date.now()
    this.end = Date.now() + time
  }
}
const start = function (name, time) {
  limits[name] = new Rl(time)
}
const check = function (name) {
  if (!limits[name]) return true
  return limits[name]?.end < Date.now()
}

export { start, check }
