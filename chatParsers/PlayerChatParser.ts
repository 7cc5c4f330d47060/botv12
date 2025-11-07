import parse3 from '../util/chatparse.js'
import Botv12Client from "../util/Botv12Client.ts";
import ChatParser from '../util/ChatParser.js';

export default class PlayerChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data/*: ChatData*/, b: Botv12Client) => {
      if (data.type === 'player' || data.type === 'profileless') {
        return {
          parsed: true,
          json: data.json,
          type: data.type,
          subtype: 'generic_player',
          uuid: data.uuid,
          message: data.message,
          nickname: data.nickname,
          username: data.username
        }
      }
      return {
        parsed: false
      }
    }
    this.priority = 0
  }
}
