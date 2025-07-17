import { randomBytes } from 'crypto'

export default function generateUser (legal) {
  return randomBytes(8).toString('hex')
}
