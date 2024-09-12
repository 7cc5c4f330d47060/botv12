const mcd = require('minecraft-data')
module.exports = function (ver) {
  return mcd.versionsByMinecraftVersion.pc[ver].version
}
