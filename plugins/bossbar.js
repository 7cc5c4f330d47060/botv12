export default function load (b) {
  b.bossbar = {}
  b.bossbars = {}
  b.bossbar.create = function (name, display) {
    b.bossbars[name] = {
      name: display,
      maximum: 100,
      value: 0,
      style: 'progress',
      color: 'white'
    }
    b.ccq.push(`/bossbar add ubotv8:${name} ${JSON.stringify(display)}`)
    b.ccq.push(`/bossbar set ubotv8:${name} players @a`)
  }
}