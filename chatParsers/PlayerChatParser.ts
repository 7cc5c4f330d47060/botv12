import Botv12Client from '../util/game/Botv12Client.js'
import ChatParser from '../util/game/chat/ChatParser.js'
import type UnparsedMessage from '../util/interface/UnparsedMessage.js'

export default class PlayerChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data: UnparsedMessage, b?: Botv12Client) => {
      if (!b) {
        return {
          parsed: false
        }
      }

      if (data.type === 'player' || data.type === 'profileless') {
        return {
          parsed: true,
          json: data.json,
          type: data.type,
          subtype: 'generic_player',
          uuid: data.uuid,
          message: data.message,
          nickname: data.nickname,
          username: b.playerInfo.findRealNameFromUUID(data.uuid)
        }
      }
      return {
        parsed: false
      }
    }
    this.priority = 0
  }
}
