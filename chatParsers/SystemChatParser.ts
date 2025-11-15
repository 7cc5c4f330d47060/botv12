
import parse3 from '../util/chatparse.js'
import Botv12Client from "../util/Botv12Client\.js"
;
import ChatParser from '../util/ChatParser.js';

export default class SystemChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data: any, b: Botv12Client) => {
      if (data.type === 'system') {
        const subtype = 'generic_system'
        const parsed = parse3(data.json, 'none')
        const split = parsed.split(': ')
        const chatName = split.splice(0, 1)[0]
        const chatNameSplit = chatName.split(' ')

        let uuid
        let username
        let nickname
        if (data.uuid) {
          uuid = data.uuid
          username = b.playerInfo.findRealNameFromUUID(uuid)
          nickname = b.playerInfo.findDisplayName(uuid)
        } else {
          nickname = chatNameSplit[chatNameSplit.length - 1]
          username = b.playerInfo.findRealName(chatName)
          uuid = b.playerInfo.findUUID(username)
        }
        return {
          parsed: true,
          json: data.json,
          type: data.type,
          subtype,
          uuid,
          message: split.join(': '),
          nickname,
          username
        }
      }
      return {
        parsed: false
      }
    }
    this.priority = 2
  }
}
