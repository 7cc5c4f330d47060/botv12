import { randomBytes } from 'crypto'

export default function generateUser (): string{
  return randomBytes(8).toString('hex')
}
