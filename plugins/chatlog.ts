import chatlog from '../util/chatlog.js'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import CommandContext from '../util/CommandContext.js'
import Botv12Client from '../util/Botv12Client.js'
import { resolve } from 'node:path'
import { Worker } from 'node:worker_threads'
// import { Worker } from 'node:worker_threads'

globalThis.logFileName = ''

const checkLog = () => {
  if (settings.disableLogging) return
  const startDate = new Date(startTime)
  const year = startDate.getUTCFullYear()
  const month = startDate.getUTCMonth() + 1
  const day = startDate.getUTCDate()
  if (!existsSync(resolve(dataDir, 'logs'))) mkdirSync(resolve(dataDir, 'logs'))
  if (existsSync(resolve(dataDir, 'logs', 'lastDir.txt'))) {
    const jsonData = readFileSync(resolve(dataDir, 'logs', 'lastDir.txt')).toString('utf8')
    let id = +jsonData.split('_')[1]
    const date = jsonData.split('_')[0]
    let dateParts = date.split('-')
    if (+dateParts[0] === year &&
      +dateParts[1] === month &&
      +dateParts[2] === day
    ) {
      id += 1
    } else {
      id = 1
      dateParts = [(year + '').padStart(4, '0'), (month + '').padStart(2, '0'), (day + '').padStart(2, '0')]
    }
    logFileName = `${dateParts.join('-')}_${id}`
    new Worker(resolve(codeDir, 'util', 'chatlog_compress'), {
      workerData: resolve(dataDir, 'logs', jsonData)
    })
  } else {
    const dateParts = [(year + '').padStart(4, '0'), (month + '').padStart(2, '0'), (day + '').padStart(2, '0')]
    logFileName = `${dateParts.join('-')}_1`
  }
  mkdirSync(resolve(dataDir, 'logs', logFileName)) // This directory should never exist under normal operation.
  writeFileSync(resolve(dataDir, 'logs', 'lastDir.txt'), logFileName)
}

// setInterval(checkLog, 7200000) // Runs once every two hours,
checkLog() // and at bot startup.

export default function load (b: Botv12Client) {
  b.on('plainchat', (msg: string, type: string) => {
    if (!settings.disableLogging && !settings.disableChatLogging) chatlog(`chat_${b.host.host}_${b.host.port}`, `[${type}] ${msg}`)
  })
  b.on('command', (c: CommandContext) => {
    if (!settings.disableLogging && !settings.disableCommandLogging) chatlog(`cmd_${b.host.host}_${b.host.port}`, `[${c.msgType}] ${c.username} (${c.uuid}): ${c.command}`)
  })
}
