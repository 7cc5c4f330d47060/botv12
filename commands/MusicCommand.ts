import { resolve } from 'node:path'
import uuidToInt from '../util/uuidtoint.js'
import { readdirSync, statSync } from 'node:fs'
import CommandContext from '../util/CommandContext.js'
import version from '../version.js'
import Command from '../util/Command.js'
import { formatTime } from '../util/lang.js'

const songPath = resolve(baseDir, 'songs')

export default class MusicCommand extends Command {
  constructor () {
    super()
    this.name = 'music'
    this.execute = async (c: CommandContext) => {
      if(!('musicPlayer' in c.bot)) return
      if(c.bot.musicPlayer?.queue === undefined) return
      let subcmd
      if (c.args.length >= 1) subcmd = c.args.splice(0, 1)[0].toLowerCase()
      switch (subcmd) {
        case 'play':{
          const filePath = resolve(songPath, c.args.join(' '))
          c.bot.commandCore.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] add ubotmusic`)
          c.send('@a[tag=nomusic,tag=ubotmusic]', {
            text: 'command.music.noMusicWarning',
            parseLang: true,
            color: '$warning',
            mcCommand: 'tag @s remove nomusic',
            with: [
              version.botName
            ]
          })
          if (c.args[0].startsWith('http://') || c.args[0].startsWith('https://')) {
            c.bot.musicPlayer.queue.push([c.args.join(' '), c.args.join(' ')])
          } else if (c.args[0].startsWith('ram://')) {
            c.bot.musicPlayer.queue.push([`ram://`, c.args.join(' ')])
          } else {
            c.bot.musicPlayer.queue.push([`file://${filePath}`, c.args.join(' ')])
          }
          c.reply({
            text: 'command.music.addToQueue',
            parseLang: true,
            with: [c.args.join(' ')]
          })
          break
        }
        case 'list':{
          const list = []
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
              list.push({
                text: `${item}/`,
                color: Number.isInteger(list.length / 2) ? '$list4' : '$list3',
                command: `${c.prefix}${c.cmdName} list ${resolve(file, item).slice(songPath.length + 1)}`,
                hover: {
                  text: 'command.music.openDir',
                  parseLang: true,
                  with: [item]
                }
              })
            } else {
              fileList.push({
                text: `${item}`,
                color: Number.isInteger(fileList.length / 2) ? '$list2' : '$list1',
                command: `${c.prefix}${c.cmdName} play ${resolve(file, item).slice(songPath.length + 1)}`,
                hover: {
                  text: 'command.music.openFile',
                  parseLang: true,
                  with: [item]
                }
              })
            }
          }
          for (const item of fileList) list.push(item)
          for (let i=0; i<Math.ceil(list.length/40); i++) {
            const subList = list.slice(i*40, (i+1)*40)
            c.reply({
              text: '%s '.repeat(subList.length),
              with: subList
            })
          }
          break
        }
        case 'listen':
        //case 'optin':
          c.bot.commandCore.ccq.push(`/tag @a[nbt={UUID:[I;${uuidToInt(c.uuid)}]}] add ubotmusic`)
          break
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
          if(c.bot.musicPlayer.stopSong) c.bot.musicPlayer.stopSong()
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
          if(c.bot.musicPlayer.stopSong) c.bot.musicPlayer.stopSong(false, true)
          c.reply({
            text: 'command.music.skip',
            parseLang: true
          })
          break
        }
        case 'restart': {
          c.bot.musicPlayer.startFrom = 0
          if (c.bot.musicPlayer.playing) {
            c.reply({
              text: 'command.music.restartCurrent',
              parseLang: true
            })
            c.bot.musicPlayer.restart = true
            c.bot.musicPlayer.emit('songEnd')
          } else {
            if(c.bot.musicPlayer.songName) {
              c.reply({
                text: 'command.music.restartPrevious',
                parseLang: true
              })
              c.bot.musicPlayer.queue.push(['ram://', c.bot.musicPlayer.songName])
            } else {
              c.reply({
                text: 'command.music.error.neverPlayed',
                parseLang: true,
                color: '$error'
              })
            }
            return
          }
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
          if(c.bot.musicPlayer.setSpeed){
            c.bot.musicPlayer.setSpeed(20 / +c.args[0])
          }
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
          c.bot.musicPlayer.queue.forEach((item: [string, string], id: number) => {
            c.reply({
              text: 'command.music.queueItem',
              parseLang: true,
              with: [
                id + '',
                item[1]
              ]
            })
          })
          break
        }
        case 'goto':{
          if (c.bot.musicPlayer.playing) {
            
            c.bot.musicPlayer.restart = true
            let gotoTime = 0;
            if(c.args[0].includes(':')) {
              const times = c.args[0].split(':')
              if(times.length === 3) { // H:M:S
                gotoTime = +times[0] * 3600000
                gotoTime += +times[1] * 60000
                gotoTime += +times[2] * 1000
              } else { // M:S
                gotoTime = +times[0] * 60000
                gotoTime += +times[1] * 1000
              }
            } else {
              gotoTime = (+c.args[0]) * 1000
            }
            c.reply({
              text: 'command.music.gotoTime',
              parseLang: true,
              with: [ formatTime(gotoTime) ]
            })
            c.bot.musicPlayer.startFrom = gotoTime
            c.bot.musicPlayer.emit('songEnd')
          }
          break
        }
        case 'pause':
        case 'unpause':
        {
          if (!c.bot.musicPlayer.playing) {
            c.reply({
              text: 'command.music.error.notPlaying',
              parseLang: true,
              color: '$error'
            })
            return
          }
          let replyMessage = ''
          c.bot.musicPlayer.lastTime = Date.now()
          if(c.bot.musicPlayer.paused) {
            replyMessage = 'command.music.unpaused'
          } else {
            replyMessage = 'command.music.paused'
          }
          c.reply({
              text: replyMessage,
              parseLang: true
            })
          c.bot.musicPlayer.paused = !c.bot.musicPlayer.paused
          break
        }
        default:{
          c.reply({
            text: 'command.error.subcmd',
            parseLang: true,
            with: [
              `${c.prefix}help music`
            ],
            color: '$error'
          })
          break
        }
      }
    }
    this.consoleIndex = true
  }
}
