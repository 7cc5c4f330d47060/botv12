const uuidToInt = function (uuid) {
  const splitUUID = uuid.replace(/[^0-9a-f]/g, '').replace(/.{1,8}/g, a => { return `0x${a}` }).match(/.{1,10}/g)
  const numUUID = [+splitUUID[0] << 0, +splitUUID[1] << 0, +splitUUID[2] << 0, +splitUUID[3] << 0]
  return numUUID
}
export { uuidToInt }