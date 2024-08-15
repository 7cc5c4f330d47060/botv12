const fs = require('fs')
const settings = require('../settings.json')

module.exports = function (fileName, item) {
  if (settings.disableLogging) return
  const dateToday = new Date(Date.now())
  const UTCYears = dateToday.getUTCFullYear()
  const UTCMonths = dateToday.getUTCMonth() + 1
  const UTCDays = dateToday.getUTCDate()
  const UTCHours = dateToday.getUTCHours()
  const UTCMinutes = dateToday.getUTCMinutes().toString().padStart(2, '0')
  const UTCSeconds = dateToday.getUTCSeconds().toString().padStart(2, '0')
  const UTCMilliSeconds = dateToday.getUTCMilliseconds().toString().padStart(3, '0')
  const filenameToday = `${UTCMonths}-${UTCDays}-${UTCYears}`
  const logDate = `${UTCMonths}/${UTCDays}/${UTCYears} ${UTCHours}:${UTCMinutes}:${UTCSeconds}.${UTCMilliSeconds}`
  fs.appendFileSync(`logs/${filenameToday}/${fileName}.txt`, `[${logDate}] ${item}\n`)
}
