import chatlog from '../util/chatlog.js'
import { readdirSync, mkdirSync } from 'node:fs'
import settings from '../settings.js'

const checkLog = () => {
  if (settings.disableLogging) return
  try {
    if (!readdirSync('.').includes('logs')) mkdirSync('logs')
    const dateToday = new Date(Date.now())
    const dateTomorrow = new Date(Date.now() + 86400000)
    const filenameToday = `${dateToday.getUTCMonth() + 1}-${dateToday.getUTCDate()}-${dateToday.getUTCFullYear()}`
    const filenameTomorrow = `${dateTomorrow.getUTCMonth() + 1}-${dateTomorrow.getUTCDate()}-${dateTomorrow.getUTCFullYear()}`
    if (!readdirSync('./logs').includes(filenameToday)) mkdirSync(`logs/${filenameToday}`)
    if (!readdirSync('./logs').includes(filenameTomorrow)) mkdirSync(`logs/${filenameTomorrow}`) // Create tomorrow's log directory early
  } catch (e) {
    console.log(e) // Prevents some crashes when there is no space remaining on the storage medium the bot is on or when the permissions are incorrect
  }
}

setInterval(checkLog, 7200000) // Runs once every two hours,
checkLog() // and at bot startup.

export default function load (b) {
  b.on('plainchat', (msg, type) => {
    if (!settings.disableLogging && !settings.disableChatLogging) chatlog(`chat_${b.host.host}_${b.host.port}`, `[${type}] ${msg}`)
  })
  b.on('command', c => {
    if (!settings.disableLogging && !settings.disableCommandLogging) chatlog(`cmd_${b.host.host}_${b.host.port}`, `[${c.msgType}] ${c.username} (${c.uuid}): ${c.command}`)
  })
}
