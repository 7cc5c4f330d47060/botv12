import { resolve } from 'node:path'
import uuidToInt from '../util/uuidtoint.js'
import { readdirSync, statSync } from 'node:fs'
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
      if (!c.args[0].startsWith('http')) {
        c.bot.musicPlayer.queue.push([`file://${filePath}`, c.args.join(' ')])
      } else {
        c.bot.musicPlayer.queue.push([c.args.join(' '), c.args.join(' ')])
      }
      c.reply({
        text: 'command.music.addToQueue',
        parseLang: true,
        with: [c.args.join(' ')]
      })
      break
    }
    case 'list':{
      const dirList = []
      const fileList = []
      const file = resolve(songPath, c.args.join(' '))
      if (!file.startsWith(songPath)) {
        c.reply(songPath)
        return
      }
      for (const item of readdirSync(file)) {
        console.log(resolve(file, item))
        const isDir = statSync(resolve(file, item)).isDirectory()
        if (isDir) {
          dirList.push({
            text: `${item}/`,
            color: Number.isInteger(dirList.length / 2) ? 'green' : 'dark_green',
            command: `${c.prefix}${c.cmdName} list ${resolve(file, item)}`,
            hover: {
              text: 'command.music.openDir',
              parseLang: true,
              with: [item]
            }
          })
        } else {
          fileList.push({
            text: `${item}`,
            color: Number.isInteger(fileList.length / 2) ? 'white' : 'gray',
            command: `${c.prefix}${c.cmdName} play ${resolve(file, item)}`,
            hover: {
              text: 'command.music.openFile',
              parseLang: true,
              with: [item]
            }
          })
        }
      }
      c.reply({
        text: '%s%s',
        with: [
          {
            text: '%s '.repeat(dirList.length),
            with: dirList
          },
          {
            text: '%s '.repeat(fileList.length),
            with: fileList
          }

        ]
      })
      break
    }
    case 'stop':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      // c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] remove ubotmusic`)
      c.bot.musicPlayer.stopSong()
      c.reply({
        text: 'command.music.stop',
        parseLang: true
      })
      break
    }
    case 'skip':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      // c.bot.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] remove ubotmusic`)
      c.bot.musicPlayer.stopSong(false, true)
      c.reply({
        text: 'command.music.skip',
        parseLang: true
      })
      break
    }
    case 'loop':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      c.bot.musicPlayer.looping = !c.bot.musicPlayer.looping
      if (c.bot.musicPlayer.looping) {
        c.reply({
          text: 'command.music.loop.on',
          parseLang: true
        })
      } else {
        c.reply({
          text: 'command.music.loop.off',
          parseLang: true
        })
      }
      break
    }
    case 'pitch':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      c.bot.musicPlayer.pitchShift = +c.args[0]
      c.reply(c.bot.musicPlayer.pitchShift + '')
      c.bot.musicPlayer.setSpeed(20 / +c.args[0])
      c.reply({
        text: 'command.music.pitchShiftSet',
        parseLang: true,
        with: [c.args[0]]
      })
      break
    }
    case 'speed':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      c.bot.musicPlayer.speedShift = +c.args[0]
      c.bot.musicPlayer.setSpeed(20 / +c.args[0])
      c.reply({
        text: 'command.music.speedSet',
        parseLang: true,
        with: [c.args[0]]
      })
      break
    }
    case 'volume':{
      if (!c.bot.musicPlayer.playing) {
        c.reply({
          text: 'command.music.error.notPlaying',
          parseLang: true,
          color: '$error'
        })
        return
      }
      c.bot.musicPlayer.volume = +c.args[0]
      c.reply({
        text: 'command.music.volumeSet',
        parseLang: true,
        with: [c.args[0]]
      })
      break
    }
    case 'queue':{
      c.reply({
        text: 'command.music.queueIntro',
        parseLang: true,
        with: [
          c.bot.musicPlayer.queue.length + ''
        ]
      })
      c.bot.musicPlayer.queue.forEach((item, id) => {
        c.reply({
          text: 'command.music.queueItem',
          parseLang: true,
          with: [
            id,
            item[1]
          ]
        })
      })
    }
  }
}
const consoleIndex = true
export { execute, consoleIndex }
