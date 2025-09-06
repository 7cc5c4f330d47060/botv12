import { createClient, Client } from 'minecraft-protocol'
import EventEmitter from 'node:events'
import settings from '../settings.js'
import { default as registry } from 'prismarine-registry'

export default class UBotClient extends EventEmitter {
  _client: Client
  id: number
  host: any
  interval: any
  info: any
  displayChat: any
  entityId: number
  registry: registry.Registry

  // Plugins
  clientChat: any
  selfCare: any
  serverChat: any

  constructor (options?: any) {
    super()

    this._client = createClient(options)
    this.interval = {}

    this.registry = registry(this._client.version)

    this._client.on('error', (err: Error) => {
      if (settings.debugMode) console.log(err)
    })

  }
}