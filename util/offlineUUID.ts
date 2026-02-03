// From node-minecraft-protocol /src/datatypes/uuid.js
import { createHash } from 'node:crypto'
// https://github.com/openjdk-mirror/jdk7u-jdk/blob/f4d80957e89a19a29bb9f9807d2a28351ed7f7df/src/share/classes/java/util/UUID.java#L163
function javaUUID (s: string) {
  const hash = createHash('md5')
  hash.update(s, 'utf8')
  const buffer = hash.digest()
  buffer[6] = (buffer[6] & 0x0f) | 0x30
  buffer[8] = (buffer[8] & 0x3f) | 0x80
  return buffer
}

export default function (name: string): string {
  const uuidBuffer = javaUUID('OfflinePlayer:' + name)
  const uuidString = uuidBuffer.toString('hex')
  return `${uuidString.slice(0,8)}-${uuidString.slice(8,12)}-${uuidString.slice(12,16)}-${uuidString.slice(16,20)}-${uuidString.slice(20,32)}`
}