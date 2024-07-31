const { processNbtMessage } = require('prismarine-chat')
const parse = function (data) {
  if (typeof data.type === 'string') {
    return JSON.parse(processNbtMessage(data))
  } else if (typeof data === 'string') {
    return JSON.parse(data)
  } else {
    return data
  }
}
const parse2 = function (_data) {
  try {
    return parse(_data)
  } catch (e) {
    console.error(e)
    return {
      text: 'An error occured while parsing a message. See console for more information.'
    }
  }
}
module.exports = parse2
