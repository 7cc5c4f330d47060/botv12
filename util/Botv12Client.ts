import { createClient, Client } from 'minecraft-protocol'
import EventEmitter from 'node:events'

import { default as registry } from 'prismarine-registry'

export default class Botv12Client extends EventEmitter {
  _client: Client
  id?: number
  host: any
  interval: any
  info: any
  displayChat: any
  entityId?: number
  registry: registry.Registry
  disconnect?: boolean
  ready: boolean

  // Plugins
  clientChat: any
  selfCare: any
  serverChat: any
  playerInfo: any
  position: any
  commandCore: any
  commands: any
  chunks: any
  musicPlayer: any

  constructor (options?: any) {
    super()

    this.ready = false
    this._client = createClient(options)
    this.interval = {}

    this.registry = registry(this._client.version)

    this._client.on('error', (err: Error) => {
      if (debugMode) console.log(err)
    })

  }
}