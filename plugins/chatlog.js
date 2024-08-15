const chatlog = require("../util/chatlog.js")
const fs = require('fs')
const settings = require('../settings.json')

const checkLog = () => {
  if(settings.disableLogging) return;
  try {
    if (!fs.readdirSync('.').includes('botvXLogs')) fs.mkdirSync('botvXLogs');
    const dateToday = new Date(Date.now());
    const dateTomorrow = new Date(Date.now()+86400000);
    const filenameToday = `${dateToday.getUTCMonth()+1}-${dateToday.getUTCDate()}-${dateToday.getUTCFullYear()}`;
    const filenameTomorrow = `${dateTomorrow.getUTCMonth()+1}-${dateTomorrow.getUTCDate()}-${dateTomorrow.getUTCFullYear()}`;
    if (!fs.readdirSync('./botvXLogs').includes(filenameToday)) fs.mkdirSync(`botvXLogs/${filenameToday}`);
    if (!fs.readdirSync('./botvXLogs').includes(filenameTomorrow)) fs.mkdirSync(`botvXLogs/${filenameTomorrow}`); // Create tomorrow's log directory early
  } catch(e){
    console.log(e) // Prevents some crashes when disk space is full or when the permissions are incorrect
  }
}

setInterval(checkLog, 3600000) // Runs once every hour,
checkLog() // and at bot startup.

module.exports = {
  load: (b) => {
    b.on('plainchat', (msg, type) => {
      if(!settings.disableLogging && !settings.disableChatLogging) chatlog(`chat_${b.host.host}_${b.host.port}`, `[${type}] ${msg}`)
    })
    b.on('command', (name, uuid, text) => {
      if(!settings.disableLogging && !settings.disableCommandLogging) chatlog(`cmd_${b.host.host}_${b.host.port}`, `${name} (${uuid}): ${text}`)
    })
  }
}
