import { resolve } from 'node:path'
import uuidToInt from '../util/uuidtoint.js'
import { readdirSync } from 'node:fs'
const songPath = resolve(process.cwd(), 'songs')

async function execute (c) {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
  switch (subcmd) {
    case 'play':{
      const filePath = resolve(songPath, c.args.join(' '))
      c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] add ubotmusic`)
      c.send('@a[tag=nomusic,tag=ubotmusic]', {
        text: 'command.music.noMusicWarning',
        parseLang: true,
        color: '$warning',
        mcCommand: 'tag @s remove nomusic',
        with: [
          { 
            botInfo: 'botName'
          }
        ]
      })
      c.bot.musicPlayer.queue.push([`file://${filePath}`, c.args.join(' ')])
      break
    }
    case 'list':{
      const list = []
      const file = resolve(songPath, c.args.join(' '))
      if (!file.startsWith(songPath)) {
        c.reply(songPath)
        return
      }
      for (const item of readdirSync(file)) {
        list.push({
          text: item,
          color: Number.isInteger(list.length / 2) ? 'white' : 'gray',
          command: `${c.prefix}${c.cmdName} play ${item}`
        })
      }
      c.reply({
        text: '%s '.repeat(list.length),
        with: list
      })
      break
    }
    case 'stop':{
      //c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] remove ubotmusic`)
      c.bot.musicPlayer.stopSong()
      break
    }
    case 'loop':{
      c.bot.musicPlayer.looping = !c.bot.musicPlayer.looping
      c.reply(c.bot.musicPlayer.looping + '')
      break
    }
    case 'pitch':{
      c.bot.musicPlayer.pitchShift = +c.args[0]
      c.reply(c.bot.musicPlayer.pitchShift + '')
      break
    }
    case 'speed':{
      c.bot.musicPlayer.speedShift = +c.args[0]
      c.bot.musicPlayer.setSpeed(20 / +c.args[0])
      c.reply(c.bot.musicPlayer.speedShift + '')
      break
    }
  }
}
const consoleIndex = true
export { execute, consoleIndex }
