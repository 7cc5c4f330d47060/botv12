import Botv12Client from "./Botv12Client.js"
import JsonFormat from "./JsonFormat.js"
import UnparsedMessage from "./UnparsedMessage.js"

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
  parse: (data: UnparsedMessage, b?: Botv12Client) => ParsedMessage
  priority: number

  constructor () {
    // Fallback parser: does not get player information.
    this.parse = (data: UnparsedMessage) => {
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype: 'fallback',
        uuid: '00000000-0000-0000-0000-000000000000',
        message: '',
        nickname: '',
        username: ''
      }
    }
    this.priority = 0
  }
}