import { processNbtMessage } from 'prismarine-chat'
const parse = function (data) {
  if (typeof data.type === 'string') {
    return JSON.parse(processNbtMessage(data))
  } else if (typeof data === 'string') {
    return JSON.parse(data)
  } else {
    return data
  }
}
export { parse }
