const os = require('os')
const cp = require('child_process')
const timeformat = require('../../util/timeformat.js')
const version = require('../../version.json')
const lang = require('../../util/lang.js')
const fs = require('fs')
const gr = function (l, text, value, color) {
  if (!color) color = 'white'
  return {
    translate: '%s: %s',
    color: color.primary,
    with: [
      {
        text,
        color: color.secondary
      },
      {
        text: value,
        color: color.primary
      }
    ],
    hoverEvent: {
      action: 'show_text',
      contents: {
        text: getMessage(l, 'copyText')
      }
    },
    clickEvent: {
      action: 'copy_to_clipboard',
      value
    }
  }
}

const os2 = function (o2, l) {
  switch (o2) {
    case 'win32':
      return `${os.version()} (${os.release})`
    case 'android':
      return getMessage(l, 'command.serverinfo.os.android')
    case 'linux':
      return getMessage(l, 'command.serverinfo.os.linux', [os.release()])
    default:
      return o2
  }
}
module.exports = {
  execute: function (c) {
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.os'), os2(process.platform, c.lang), c.colors))
    if (os.cpus()[0]) c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.processor'), os.cpus()[0].model, c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.arch'), os.machine(), c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.osUsername'), `${os.userInfo().username} (${os.userInfo().uid})`, c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.hostName'), os.hostname(), c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.workingDir'), process.cwd(), c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.runTime'), lang.formatTime(process.uptime() * 1000, c.lang), c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.upTime'), lang.formatTime(os.uptime() * 1000, c.lang), c.colors))
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.nodeVersion'), process.version, c.colors))
    if (process.platform === 'linux' || process.platform === 'freebsd') {
      try {
        const osrelease = fs.readFileSync('/etc/os-release').toString('UTF-8').split('\n')
        const osrelease2 = {}
        for (const i in osrelease) {
          if (!osrelease[i].includes('=')) continue
          let osrvalue = osrelease[i].split('=')[1]
          if (osrvalue.startsWith('"') && osrvalue.endsWith('"')) { osrvalue = osrvalue.slice(1, osrvalue.length - 1) };
          osrelease2[osrelease[i].split('=')[0]] = osrvalue
        }

        if (osrelease2.PRETTY_NAME) {
          c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.osRelease'), osrelease2.PRETTY_NAME, c.colors))
        }
      } catch (e) {
        c.reply({ text: getMessage(c.lang, 'command.serverinfo.osRelease.missing') })
      }
    } else if (process.platform === 'android') {
      const androidVersion = cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0]
      c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.os.android.version'), androidVersion, c.colors))
      const dModel = cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0]
      const dBrand = cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0]
      c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.os.android.model'), dBrand + ' ' + dModel, c.colors))
    }
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.botName'), version.botName, c.colors))
    let botVersion = version.botVersion
    let gitCommit
    let gitBranch
    try {
      gitCommit = cp.execSync('git rev-parse --short HEAD').toString('UTF-8').split('\n')[0]
      gitBranch = cp.execSync('git rev-parse --abbrev-ref HEAD').toString('UTF-8').split('\n')[0]
    } catch (e) {
      gitCommit = false
      gitBranch = false
    }
    if (gitCommit) {
      botVersion += ` (${gitCommit} - ${gitBranch})`
    }
    c.reply(gr(c.lang, getMessage(c.lang, 'command.serverinfo.botVer'), botVersion, c.colors))
  }
}
