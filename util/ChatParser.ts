import Botv12Client from "./Botv12Client";

export default class ChatParser {
  parse: any
  priority: number

  constructor () {
    // Fallback parser: does not get player information.
    this.parse = (data/*: ChatData*/, b?: Botv12Client) => {
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