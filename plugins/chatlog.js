const settings = require('../settings.json')
const rl2 = require('readline')
const console2 = require('./console.js') // it was a bad name before uwu
const fs = require('fs')
const log_filename = require('../util/logname.js')
const log_date = require('../util/logdate.js')
const logcheck = () => {
  if (!fs.readdirSync('.').includes('UBotLogs')) fs.mkdirSync('UBotLogs') // base log dir
  const fw = new Date(Date.now())
  const fw_tomorrow = new Date(Date.now() + 86400000)
  if (!fs.readdirSync('./UBotLogs').includes(fw.getUTCDate() + '_' + (fw.getUTCMonth() + 1) + '_' + fw.getUTCFullYear())) fs.mkdirSync('UBotLogs/' + fw.getUTCDate() + '_' + (fw.getUTCMonth() + 1) + '_' + fw.getUTCFullYear())
  if (!fs.readdirSync('./UBotLogs').includes(fw_tomorrow.getUTCDate() + '_' + (fw_tomorrow.getUTCMonth() + 1) + '_' + fw_tomorrow.getUTCFullYear())) fs.mkdirSync('UBotLogs/' + fw_tomorrow.getUTCDate() + '_' + (fw_tomorrow.getUTCMonth() + 1) + '_' + fw_tomorrow.getUTCFullYear())
}
setInterval(logcheck, 3000000)// every 50 minutes
logcheck()
module.exports = {
  load: function () {
  },
  load2: function (b) {
    b.on('chatClear', (text) => {
      if (b.discordReady) b.disqueue.push(text)
    })
    b.on('chatAnsi', (text) => {
      console2.write('[Chat/' + b.id + '] ' + text)
      /* rl2.cursorTo(process.stdout,0);
			rl2.clearLine(process.stdout,0);
			console.log("[Chat/"+b.id+"] "+text);
			if(index.p.readlineLoaded){
				index.p.rl.prompt(true);
			} */
    })
    b.on('chatMotd', (text) => {
      if (settings.fileLogging && b.o.fileLogging) {
        fs.appendFileSync(log_filename(Date.now(), b.host, b.port), log_date() + ' ' + text + '\n')
      }
    })
    // for(const i in cmsg){
    /* if(cmsg[i]=="" || cmsg[i]==" "){
				continue;
			} */
    // if(b.discordReady) b.disqueue.push(cmsg[i]);
    /* rl2.cursorTo(process.stdout,0);
			rl2.clearLine(process.stdout,0);
			console.log("[Chat/"+b.id+"] "+console_msg[i]);
			const fw=new Date(Date.now());
			if(settings.fileLogging && b.o.fileLogging){
				fs.appendFileSync("UBotLogs/"+fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear()+"/chat_"+b.host+"_"+b.port+".txt",module.exports.log_date()+" "+filemsg[i]+"\n");
			}
			if(index.p.readlineLoaded){
				index.p.rl.prompt(true);
			}
		} */
  }
}
