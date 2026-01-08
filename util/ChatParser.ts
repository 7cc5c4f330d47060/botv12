import Botv12Client from "./Botv12Client.js"
import JsonFormat from "./JsonFormat.js"

interface ParsedMessage {
  parsed: boolean,
  json?: JsonFormat,
  type?: string,
  subtype?: string,
  uuid?: string,
  message?: string,
  nickname?: string,
  username?: string
}
export default class ChatParser {
  parse: (data: any, b?: Botv12Client) => ParsedMessage
  priority: number

  constructor () {
    // Fallback parser: does not get player information.
    this.parse = (data: any, b?: Botv12Client) => {
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype: 'fallback',
        uuid: b?._client.uuid + '',
        message: '',
        nickname: '',
        username: ''
      }
    }
    this.priority = 0
  }
}