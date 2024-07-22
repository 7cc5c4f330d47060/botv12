const os = require('os')
const cp = require('child_process')
const settings = require('../../settings.json')
const timeformat = require('../../util/timeformat.js')
const version = require("../../version.json")
const fs=require("fs")
const gr = function (text, value, color) {
  if (!color) color = 'white'
  return JSON.stringify({
    translate: '%s: %s',
    with: [
      {
        text,
        color
      },
      {
        text: value,
        color
      }
    ],
    hoverEvent: {
      action: 'show_text',
      contents: {
        text: 'Click to copy!'
      }
    },
    clickEvent: {
      action: 'copy_to_clipboard',
      value
    }
  })
}

const os2 = function (o2) {
  switch (o2) {
    case 'win32':
      return os.version()
      break
    case 'android':
      return 'Android'
      break
    case 'linux':
      return 'Linux' + ' ' + os.release()
      break
    default:
      return o2
  }
}
// b.tellraw(sender,gr("Example",example))
module.exports = {
  execute: function (c) {
    c.reply(gr('Operating system', os2(process.platform)))
    c.reply(gr('CPU', os.cpus()[0].model))
    c.reply(gr('Architecture', os.machine()))
    c.reply(gr('Username', os.userInfo().username))
    c.reply(gr('Bot uptime', timeformat(process.uptime() * 1000)))
    c.reply(gr('System uptime', timeformat(os.uptime() * 1000)))
    c.reply(gr('Node.js version', process.version))
    if (process.platform == 'linux' || process.platform == 'freebsd') {
      try{
        const osrelease = fs.readFileSync("/etc/os-release").toString("UTF-8").split("\n");
        let osrelease2={};
        for(const i in osrelease){
          if(!osrelease[i].includes("=")) continue;
          let osr_value=osrelease[i].split("=")[1];
          if(osr_value.startsWith("\"") && osr_value.endsWith("\"")){osr_value=osr_value.slice(1,osr_value.length-1)};
          osrelease2[osrelease[i].split("=")[0]]=osr_value;
        }

        if(osrelease2.PRETTY_NAME){
          c.reply(gr('Linux release', osrelease2.PRETTY_NAME, 'dark_green'))
        }
      } catch(e){
        c.reply('{"text":"/etc/os-release does not exist. Information may be limited."}')
      }
    } else if (process.platform == 'android') {
      const android_version = cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0]
      c.reply(gr('Android version', android_version, 'green'))
      const dModel=cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0];
      const dBrand=cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0];
      c.reply(gr('Device model', dBrand+dModel, 'green'))
    }
    c.reply(gr('Bot name', settings.name, 'yellow'))
    c.reply(gr('Bot version', version.bot, 'yellow'))
  },
  desc: 'Get system/bot info (ported from V9). Not complete.',
  usage: ''
}
