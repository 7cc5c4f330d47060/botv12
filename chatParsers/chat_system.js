import parsePlain from '../util/chatparse_plain.js'

const priority = 2
const parse = (data, b) => {
  if (data.type === 'system') {
    const subtype = 'generic_system'
    const parsed = parsePlain(data.json)
    const split = parsed.split(': ')
    const chatName = split.splice(0, 1)[0]
    const chatNameSplit = chatName.split(' ')

    let uuid
    let username
    let nickname
    if (data.uuid) {
      uuid = data.uuid
      username = b.findRealNameFromUUID(uuid)
      nickname = b.findDisplayName(uuid)
    } else {
      nickname = chatNameSplit[chatNameSplit.length - 1]
      username = b.findRealName(chatName)
      uuid = b.findUUID(username)
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
export { priority, parse }
