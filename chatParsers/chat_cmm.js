import parsePlain from '../util/chatparse_plain.js'

const priority = 0
const parse = (data, b) => {
  if (data.type === 'system') {
    if (data.json.translate === '%s %s › %s' || data.json.translate === '[%s] %s › %s') {
      let subtype = 'chipmunkmod'
      if (data.json.with && data.json.with[1] && data.json.with[2]) {
        const username = parsePlain(data.json.with[1])
        const uuid = b.findUUID(username)
        const nickname = b.findDisplayName(uuid)
        const message = parsePlain(data.json.with[2])
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
  return {
    parsed: false
  }
}
export { priority, parse }
