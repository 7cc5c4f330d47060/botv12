import { createClient, Client } from 'minecraft-protocol'
import EventEmitter from 'node:events'
import settings from '../settings.js'

export default class UBotClient extends EventEmitter {
  _client: Client
  id: number
  host: any
  interval: any
  info: any
  displayChat: any
  entityId: number

  // Plugins
  clientChat: any
  constructor (options?: any) {
    super()

    this._client = createClient(options)
    this.interval = {}

    this._client.on('error', (err: Error) => {
      if (settings.debugMode) console.log(err)
    })
  }
}