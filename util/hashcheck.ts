import { createHash } from 'node:crypto'
import settings from '../settings.js'

export default function (cmd: string[], uuid: string) {
  const cmdWithoutHash: string = cmd.slice(0, cmd.length - 1).join(' ')
  const _dateString: string = Date.now().toString()
  const dateString: string = _dateString.slice(0, _dateString.length - 4)
  const hashTrusted: string = `${settings.keyTrusted}:${uuid}:${cmdWithoutHash}:${dateString}`
  const hashOwner: string = `${settings.keyOwner}:${uuid}:${cmdWithoutHash}:${dateString}`

  const hashPart: string = cmd[cmd.length - 1]
  const validhashT: string = createHash('sha256').update(hashTrusted).digest('hex')
  const validhashO: string = createHash('sha256').update(hashOwner).digest('hex')
  if (hashPart === validhashT) return 1
  if (hashPart === validhashO) return 2

  return 0
}
