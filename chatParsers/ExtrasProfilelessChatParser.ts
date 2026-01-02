import parse3 from '../util/chatparse.js'
import Botv12Client from "../util/Botv12Client.js";
import ChatParser from '../util/ChatParser.js';

export default class ExtrasProfilelessChatParser extends ChatParser {
  constructor () {
    super()
    this.parse = (data: any, b: Botv12Client) => {
      if (data.type === 'profileless') {
        if (data.playerChatType.translation_key === '%s') {
          const parsed = parse3(data.json, 'none')
          const split = parsed.split(': ')
          const chatName = split.splice(0, 1)[0]
          const chatNameSplit = chatName.split(' ')
          const nickname = chatNameSplit[chatNameSplit.length - 1]
          const username = b.playerInfo.findRealName(chatName)
          const uuid = b.playerInfo.findUUID(username)
          const message = split.join(': ')
          return {
            parsed: true,
            json: data.json,
            type: data.type,
            subtype: 'extras_profileless',
            uuid,
            message,
            nickname,
            username
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
