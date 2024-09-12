const mcd=require("minecraft-data")
module.exports = function (ver) {
  return require("minecraft-data").versionsByMinecraftVersion.pc[ver].version
}
