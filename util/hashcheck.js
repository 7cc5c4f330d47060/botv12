const crypto = require('crypto')
const secret = require('../secret.json')
module.exports = function (cmd, uuid) {
  const cmdWithoutHash = cmd.slice(0, cmd.length - 1).join(' ')
  const _dateString = Date.now().toString()
  const dateString = _dateString.slice(0, _dateString.length - 4)
  const hashTrusted = `babyboom:${secret.keyTrusted}:${uuid}:${cmdWithoutHash}:${dateString}`
  const hashOwner = `babyboom:${secret.keyOwner}:${uuid}:${cmdWithoutHash}:${dateString}`
  const validhashT = crypto.createHash('sha256').update(hashTrusted).digest('hex')
  const validhashO = crypto.createHash('sha256').update(hashOwner).digest('hex')
  if (cmd[cmd.length - 1] === validhashT) {
    return 1
  }
  if (cmd[cmd.length - 1] === validhashO) {
    return 2
  }
  return 0
}
