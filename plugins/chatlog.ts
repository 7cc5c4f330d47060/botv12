import chatlog from '../util/chatlog.js'
import { readdirSync, mkdirSync } from 'node:fs'
import CommandContext from '../util/CommandContext.js'
import Botv12Client from '../util/Botv12Client.js'
import { resolve } from 'node:path'

const checkLog = () => {
  if (settings.disableLogging) return
  try {
    if (!readdirSync(baseDir).includes('logs')) mkdirSync(resolve(baseDir, 'logs'))
    const dateToday = new Date(Date.now())
    const dateTomorrow = new Date(Date.now() + 86400000)
    const monthToday = (dateToday.getUTCMonth() + 1).toString().padStart(2, '0')
    const monthTomorrow = (dateTomorrow.getUTCMonth() + 1).toString().padStart(2, '0')
    const dayToday = dateToday.getUTCDate().toString().padStart(2, '0')
    const dayTomorrow = dateTomorrow.getUTCDate().toString().padStart(2, '0')
    const yearToday = dateToday.getUTCFullYear().toString().padStart(4, '0')
    const yearTomorrow = dateTomorrow.getUTCFullYear().toString().padStart(4, '0')
    const filenameToday = `${yearToday}-${monthToday}-${dayToday}`
    const filenameTomorrow = `${yearTomorrow}-${monthTomorrow}-${dayTomorrow}`
    if (!readdirSync(resolve(baseDir, 'logs')).includes(filenameToday)) mkdirSync(resolve(baseDir, 'logs', filenameToday))
    if (!readdirSync(resolve(baseDir, 'logs')).includes(filenameTomorrow)) mkdirSync(resolve(baseDir, 'logs', filenameTomorrow)) // Create tomorrow's log directory early
  } catch (e) {
    console.log(e) // Prevents some crashes when there is no space remaining on the storage medium the bot is on or when the permissions are incorrect
  }
}

setInterval(checkLog, 7200000) // Runs once every two hours,
checkLog() // and at bot startup.

export default function load (b: Botv12Client) {
  b.on('plainchat', (msg: string, type: string) => {
    if (!settings.disableLogging && !settings.disableChatLogging) chatlog(`chat_${b.host.host}_${b.host.port}`, `[${type}] ${msg}`)
  })
  b.on('command', (c: CommandContext) => {
    if (!settings.disableLogging && !settings.disableCommandLogging) chatlog(`cmd_${b.host.host}_${b.host.port}`, `[${c.msgType}] ${c.username} (${c.uuid}): ${c.command}`)
  })
}
