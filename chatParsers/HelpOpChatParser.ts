import parse3 from '../util/chatparse.js'
import Botv12Client from "../util/Botv12Client.js";
import ChatParser from '../util/ChatParser.js';
import UnparsedMessage from '../util/interface/UnparsedMessage.js';

export default class ChipmunkModChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data: UnparsedMessage, b?: Botv12Client) => {
      if(!b) return { parsed: false }
      if (data.type === 'system') {
        if (data.json.extra && data.json.extra[0]) {
          if(typeof data.json.extra[0] !== 'string' && data.json.extra[0].text == '[HelpOp]') {
            let subtype = 'helpop'
            if (typeof data.json.extra[2] === 'string') return { parsed: false }
            if (data.json.extra[2] && data.json.extra[2].extra && data.json.extra[3]) {
              const nickname = parse3(data.json.extra[2].extra[0] ?? '', 'none')
              const username = b.playerInfo.findRealNameFromNickname(nickname)
              const uuid = b.playerInfo.findUUID(username)
              const message = parse3(data.json.extra[3], 'none').slice(1)
              return {
                parsed: true,
                json: data.json,
                type: data.type,
                subtype,
                uuid,
                message,
                nickname,
                username
              }
            } else {
              subtype += '_invalid'
              return {
                parsed: true,
                json: data.json,
                type: data.type,
                subtype,
                uuid: '00000000-0000-0000-0000-000000000000',
                message: '',
                nickname: '',
                username: ''
              }
            }
          }
        }
      }
      return {
        parsed: false
      }
    }
    this.priority = 1
  }
}
