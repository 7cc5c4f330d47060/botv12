import UBotClient from '../util/UBotClient.ts'
const priority = 2
const parse = (data, b: UBotClient) => {
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
export { priority, parse }
