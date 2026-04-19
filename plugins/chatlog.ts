import chatlog from '../util/chatlog.js'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import CommandContext from '../util/CommandContext.js'
import Botv12Client from '../util/Botv12Client.js'
import { resolve } from 'node:path'
import { Worker } from 'node:worker_threads'
import exists from '../util/existsAsync.js'
// import { Worker } from 'node:worker_threads'

globalThis.logFileName = ''

const checkLog = async () => {
  if (settings.disableLogging) return
  const startDate = new Date(startTime)
  const year = startDate.getUTCFullYear()
  const month = startDate.getUTCMonth() + 1
  const day = startDate.getUTCDate()
  if (!await exists(resolve(dataDir, 'logs'))) await mkdir(resolve(dataDir, 'logs'))
  if (await exists(resolve(dataDir, 'logs', 'lastDir.txt'))) {
    const jsonData = (await readFile(resolve(dataDir, 'logs', 'lastDir.txt'))).toString('utf8')
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
    const a = new Worker(resolve(codeDir, 'util', 'chatlog_compress.js'), {
      workerData: resolve(dataDir, 'logs', jsonData)
    })
    a.on('exit', () => {
      if (debugMode) console.log('[debug] Finished compressing logs')
    })
  } else {
    const dateParts = [(year + '').padStart(4, '0'), (month + '').padStart(2, '0'), (day + '').padStart(2, '0')]
    logFileName = `${dateParts.join('-')}_1`
  }
  await mkdir(resolve(dataDir, 'logs', logFileName)) // This directory should never exist under normal operation.
  writeFile(resolve(dataDir, 'logs', 'lastDir.txt'), logFileName)
}

checkLog() // and at bot startup.

export default function load (b: Botv12Client) {
  b.on('plainchat', (msg: string, type: string) => {
    if (!settings.disableLogging && !settings.disableChatLogging) chatlog(`chat_${b.host.host}_${b.host.port}`, `[${type}] ${msg}`)
  })
  b.on('command', (c: CommandContext) => {
    if (!settings.disableLogging && !settings.disableCommandLogging) chatlog(`cmd_${b.host.host}_${b.host.port}`, `[${c.msgType}] ${c.username} (${c.uuid}): ${c.command}`)
  })
}
