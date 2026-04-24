const limits: Record<string, Rl> = {}

class Rl {
  start: number
  end: number
  constructor (time: number) {
    this.start = Date.now()
    this.end = Date.now() + time
  }
}
const start = function (name: string, time: number) {
  limits[name] = new Rl(time)
}
const check = function (name: string) {
  if (!limits[name]) return true
  return limits[name]?.end < Date.now()
}

export { start, check }
