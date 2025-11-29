import Botv12Client from "./Botv12Client"
import { randomBytes } from 'crypto'

export default class BossBar {
  name: string
  display: any
  max: number
  value: number
  style: string
  color: string
  players: string // String sent to command to determine viewers of Bossbar
  namespace: string
  updatePlayers: () => void
  delete: () => void
  setValue: (value: number) => void
  setDisplay: (value: string) => void

  constructor (b: Botv12Client, name: string, display: any, max: number, initialValue: number, style: string, color: string, players: string) {
    this.name = name
    this.display = display
    this.max = max // 100
    this.value = initialValue // 0
    this.style = style // progress
    this.color = color // white
    this.players = players
    this.namespace = 'botv12_temp' // '_' + randomBytes(4).toString('hex')

    this.updatePlayers = function () {
      b.commandCore.ccq.push(`/bossbar set ${this.namespace}:${this.name} players ${players}`)
    }

    this.delete = function () {
      b.commandCore.ccq.push(`/bossbar remove ${this.namespace}:${this.name}`)
    }

    this.setValue = function (value) {
      this.value = value
      b.commandCore.ccq.push(`/bossbar set ${this.namespace}:${this.name} value ${value}`)
    }

    this.setDisplay = function (value) {
      this.display = value
      b.commandCore.ccq.push(`/bossbar set ${this.namespace}:${this.name} name ${JSON.stringify(value)}`)
    }

    b.commandCore.ccq.push(`/bossbar remove ${this.namespace}:${this.name}`)
    b.commandCore.ccq.push(`/bossbar add ${this.namespace}:${this.name} ${JSON.stringify(display)}`)
    if (max !== 100) b.commandCore.ccq.push(`/bossbar set ${this.namespace}:${this.name} max ${max}`)
  }
}
