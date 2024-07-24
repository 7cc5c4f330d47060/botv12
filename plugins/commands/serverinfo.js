const os = require('os')
const cp = require('child_process')
const settings = require('../../settings.json')
const timeformat = require('../../util/timeformat.js')
const version = require("../../version.json")
const getMessage = require('../../util/lang.js')
const fs=require("fs")
const gr = function (l, text, value, color) {
  if (!color) color = 'white'
  return {
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
        text: getMessage(l,"copyText")
      }
    },
    clickEvent: {
      action: 'copy_to_clipboard',
      value
    }
  }
}

const os2 = function (o2,l) {
  switch (o2) {
    case 'win32':
      return os.version()
      break
    case 'android':
      return getMessage(l,"command.serverinfo.os.android")
      break
    case 'linux':
      return getMessage(l,"command.serverinfo.os.linux",[os.release()])
      break
    default:
      return o2
  }
}
module.exports = {
  execute: function (c) {
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.os"), os2(process.platform,c.lang)))
    if(os.cpus()[0]) c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.processor"), os.cpus()[0].model))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.arch"), os.machine()))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.osUsername"), os.userInfo().username))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.hostName"), os.hostname()))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.runTime"), timeformat(process.uptime() * 1000)))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.upTime"), timeformat(os.uptime() * 1000)))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.nodeVersion"), process.version))
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
          c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.osRelease"), osrelease2.PRETTY_NAME, 'dark_green'))
        }
      } catch(e){
        c.reply({text:getMessage(c.lang,"command.serverinfo.osRelease.missing")})
      }
    } else if (process.platform == 'android') {
      const android_version = cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0]
      c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.os.android.version"), android_version, 'green'))
      const dModel=cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0];
      const dBrand=cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0];
      c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.os.android.model"), dBrand+" "+dModel, 'green'))
    }
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.botName"), settings.name, 'yellow'))
    c.reply(gr(c.lang,getMessage(c.lang,"command.serverinfo.botVer"), version.bot, 'yellow'))
  }
}
