import { createHash } from 'node:crypto'
import settings from '../settings.js'

export default function (cmd, uuid) {
  const cmdWithoutHash = cmd.slice(0, cmd.length - 1).join(' ')
  const _dateString = Date.now().toString()
  const dateString = _dateString.slice(0, _dateString.length - 4)
  const hashTrusted = `babyboom:${settings.keyTrusted}:${uuid}:${cmdWithoutHash}:${dateString}`
  const hashOwner = `babyboom:${settings.keyOwner}:${uuid}:${cmdWithoutHash}:${dateString}`

  const hashPart = cmd[cmd.length - 1]
  const validhashT = createHash('sha256').update(hashTrusted).digest('hex')
  const validhashO = createHash('sha256').update(hashOwner).digest('hex')
  if (hashPart === validhashT) return 1
  if (hashPart === validhashO) return 2

  return 0
}
