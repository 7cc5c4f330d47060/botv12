import ChatParser from '../util/ChatParser.js';
import UnparsedMessage from '../util/interface/UnparsedMessage.js';

export default class PlayerChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data: UnparsedMessage) => {
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
