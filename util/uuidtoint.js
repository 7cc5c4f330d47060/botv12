module.exports = function (uuid) {
  const split_uuid = uuid.replace(/[^0-9a-f]/g, '').replace(/.{1,8}/g, a => { return '0x' + a }).match(/.{1,10}/g)
  const num_uuid = [+split_uuid[0] << 0, +split_uuid[1] << 0, +split_uuid[2] << 0, +split_uuid[3] << 0]
  return num_uuid
}
