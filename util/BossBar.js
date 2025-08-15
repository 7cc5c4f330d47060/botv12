export default class BossBar {
  constructor (b, name, display, max, initialValue, style, color, players) {
    this.name = name
    this.display = display
    this.max = max // 100
    this.value = initialValue // 0
    this.style = style // progress
    this.color = color // white
    this.players = players
    this.namespace = 'ubotv8'
    
    this.updatePlayers = function () {
      b.ccq.push(`/bossbar set ${this.namespace}:${this.name} players ${players}`)
    }

    this.delete = function () {
      b.ccq.push(`/bossbar remove ${this.namespace}:${this.name}`)
    }

    this.setValue  = function (value) {
      this.value = value
      b.ccq.push(`/bossbar set ${this.namespace}:${this.name} value ${value}`)
    }

    this.setDisplay  = function (value) {
      console.log(value)
      this.display = value
      b.ccq.push(`/bossbar set ${this.namespace}:${this.name} name ${JSON.stringify(value)}`)
    }

    b.ccq.push(`/bossbar remove ${this.namespace}:${this.name}`)
    b.ccq.push(`/bossbar add ${this.namespace}:${this.name} ${JSON.stringify(display)}`)
    if(max !== 100) b.ccq.push(`/bossbar set ${this.namespace}:${this.name} max ${max}`)
  }
}