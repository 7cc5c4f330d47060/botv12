export default function uuidToInt (uuid: string) {
  const splitUUID = uuid.replace(/[^0-9a-f]/g, '').replace(/.{1,8}/g, a => { return `0x${a}` })
  const numUUID = [
    +splitUUID.slice(0,10) << 0,
    +splitUUID.slice(10,20) << 0,
    +splitUUID.slice(20,30) << 0,
    +splitUUID.slice(30,40) << 0
  ]
  return numUUID
}
