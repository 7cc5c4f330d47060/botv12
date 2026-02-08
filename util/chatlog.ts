import { appendFileSync } from 'node:fs'
import { resolve } from 'node:path'

export default function chatlog (fileName: string, item: string) {
  if (settings.disableLogging) return
  const dateToday = new Date(Date.now())
  const UTCYears = dateToday.getUTCFullYear().toString().padStart(4, '0')
  const UTCMonths = (dateToday.getUTCMonth() + 1).toString().padStart(2, '0')
  const UTCDays = dateToday.getUTCDate().toString().padStart(2, '0')
  const UTCHours = dateToday.getUTCHours().toString().padStart(2, '0')
  const UTCMinutes = dateToday.getUTCMinutes().toString().padStart(2, '0')
  const UTCSeconds = dateToday.getUTCSeconds().toString().padStart(2, '0')
  const UTCMilliSeconds = dateToday.getUTCMilliseconds().toString().padStart(3, '0')
  const filenameToday = `${UTCYears}-${UTCMonths}-${UTCDays}`
  const logDate = `${UTCYears}-${UTCMonths}-${UTCDays}T${UTCHours}:${UTCMinutes}:${UTCSeconds}.${UTCMilliSeconds}Z`
  
  appendFileSync(resolve(dataDir, 'logs', filenameToday, `${fileName}.txt`), `[${logDate}] ${item}\n`)
}
