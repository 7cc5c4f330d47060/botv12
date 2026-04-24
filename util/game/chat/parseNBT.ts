import { processNbtMessage } from 'prismarine-chat'

export default function parse (data: { type: string }) {
  if (typeof data.type === 'string') {
    return JSON.parse(processNbtMessage(data))
  } else if (typeof data === 'string') {
    return JSON.parse(data)
  } else {
    return data
  }
}
