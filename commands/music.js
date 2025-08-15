import uuidToInt from "../util/uuidtoint.js"
async function execute (c) {
  if (c.args[0] == 'test'){
    c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] add ubotmusic`)
    c.bot.musicPlayer.playSong('songs/ubottest2.mid')
  }
  if (c.args[0] == 'stop'){
    c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] remove ubotmusic`)
    c.bot.musicPlayer.stopSong()
  }
}
const consoleIndex = true
export { execute, consoleIndex }