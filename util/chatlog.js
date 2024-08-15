const fs = require('fs')
const settings = require('../settings.json')

module.exports = function(fileName, item){
  if(settings.disableLogging) return;
	const dateToday = new Date(Date.now());
	const UTCHours = dateToday.getUTCHours();
	const UTCMinutes = dateToday.getUTCMinutes().toString().padStart(2,"0");
	const UTCSeconds = dateToday.getUTCSeconds().toString().padStart(2,"0");
	const UTCMilliSeconds = dateToday.getUTCMilliseconds().toString().padStart(3,"0");
	const filenameToday = `${dateToday.getUTCMonth()+1}-${dateToday.getUTCDate()}-${dateToday.getUTCFullYear()}`;
	const logDate = `${dateToday.getUTCMonth()+1}/${dateToday.getUTCDate()}/${dateToday.getUTCFullYear()} ${UTCHours}:${UTCMinutes}:${UTCSeconds}.${UTCMilliSeconds}`;
	fs.appendFileSync(`botvXLogs/${filenameToday}/${fileName}.txt`, `[${logDate}] ${item}\n`)
}