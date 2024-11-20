import parsePlain from '../util/chatparse_plain.js'

const priority = 0
const parse = (data, b) => {
  if (data.type === 'system' || data.type === 'legacy') {
    if (data.json.extra && data.json.extra[4] && data.json.extra[3] && data.json.extra[5] && data.json.extra[4].text === ' » ') { // ChipmunkMod format - m_c_player
      const username = parsePlain(data.json.extra[3])
      const uuid = b.findUUID(username)
      const nickname = b.findDisplayName(uuid)
      const message = parsePlain(data.json.extra[5])
      return {
        parsed: true,
        json: data.json,
        type: data.type,
        subtype: 'chipmunkmod_mcp',
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
export { priority, parse }
