import JsonFormat from "./JsonFormat.js";

export default interface UnparsedMessage {
  json: JsonFormat,
  type: string,
  uuid: string,
  message: string,
  nickname: string,
  username: string,
  playerChatType: { translation_key: string, parameters: string[] }
}