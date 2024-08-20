import * as os from "os"
import { execSync } from "child_process"
import { getMessage, formatTime } from '../util/lang.mjs'
import { readdirSync, readFileSync } from "fs"
import { default as botVersion } from "../util/version.js"
import { default as version } from "../version.json" with { type: "json" }
import { bots } from "../index.mjs"

const aboutBot = function (c) {
  c.reply({
    translate: getMessage(c.lang, 'command.about.author'),
    color: c.colors.secondary,
    with: [
      {
        text: version.botName,
        color: c.colors.primary
      },
      {
        text: version.botAuthor,
        color: c.colors.primary
      }
    ]
  })
  if (version.isPreRelease) {
    c.reply({
      text: getMessage(c.lang, 'command.about.preRelease'),
      color: c.colors.secondary
    })
  }
  c.reply({ text: '' })
  c.reply({
    translate: getMessage(c.lang, 'command.about.sourceCode'),
    color: c.colors.secondary,
    with: [
      {
        text: version.sourceURL,
        color: c.colors.primary,
        clickEvent: {
          action: 'open_url',
          value: version.sourceURL
        },
        hoverEvent: {
          action: 'show_text',
          contents: {
            text: getMessage(c.lang, 'command.about.sourceCode.openInBrowser')
          },
          value: { // Added twice for backwards compatibility
            text: getMessage(c.lang, 'command.about.sourceCode.openInBrowser')
          }
        }
      }
    ]
  })
}

const os2 = function (o2, l) {
  switch (o2) {
    case 'win32':
      return `${os.version()}`
    case 'android':{
      try {
        const version = execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0]
        return getMessage(l, 'command.about.serverInfo.os.android', [version])
      } catch (e) {
        return getMessage(l, 'command.about.serverInfo.os.android.noVersion')
      }
    }
    case 'linux':
    case 'freebsd':{
      if (readdirSync('/etc').includes('os-release')) {
        const osrelease = readFileSync('/etc/os-release').toString('UTF-8').split('\n')
        const osrelease2 = {}
        for (const i in osrelease) {
          if (!osrelease[i].includes('=')) continue
          let osrvalue = osrelease[i].split('=')[1]
          if (osrvalue.startsWith('"') && osrvalue.endsWith('"')) { osrvalue = osrvalue.slice(1, osrvalue.length - 1) };
          osrelease2[osrelease[i].split('=')[0]] = osrvalue
        }

        if (osrelease2.PRETTY_NAME) {
          return getMessage(l, '%s', [osrelease2.PRETTY_NAME])
        } else {
          return getMessage(l, `command.about.serverInfo.os.${o2}`)
        }
      } else {
        return getMessage(l, `command.about.serverInfo.os.${o2}`)
      }
    }
    default:
      return o2
  }
}

const aboutServer = function (c) {
  const displayInfo = function (name, infoFunc) {
    let thisItem
    try {
      thisItem = infoFunc()
    } catch (e) {
      console.error(e)
      thisItem = 'Error! (check console)'
    }
    c.reply({
      translate: '%s: %s',
      color: c.colors.primary,
      with: [
        {
          text: getMessage(c.lang, name),
          color: c.colors.secondary
        },
        {
          text: thisItem,
          color: c.colors.primary
        }
      ]
    })
  }

  // Operating system
  displayInfo('command.about.serverInfo.os', () => {
    return os2(process.platform, c.lang)
  })

  // Kernel version: os.release()
  displayInfo('command.about.serverInfo.kernelVer', () => {
    return os.release()
  })

  // Processor
  if (os.cpus()[0]) {
    displayInfo('command.about.serverInfo.processor', () => {
      return os.cpus()[0].model
    })
  }

  if (os.cpus()[0]) {
    // Processor architecture
    displayInfo('command.about.serverInfo.arch', () => {
      return os.machine()
    })
  }

  // Username and UID
  displayInfo('command.about.serverInfo.osUsername', () => {
    return `${os.userInfo().username} (${os.userInfo().uid})`
  })

  // Hostname
  displayInfo('command.about.serverInfo.hostName', () => {
    return os.hostname()
  })

  // Current working directory
  displayInfo('command.about.serverInfo.workingDir', () => {
    return process.cwd()
  })

  // Node.js® version
  displayInfo('command.about.serverInfo.nodeVersion', () => {
    return process.version
  })

  // Bot uptime
  displayInfo('command.about.serverInfo.runTime', () => {
    return formatTime(process.uptime() * 1000, c.lang)
  })

  // System uptime
  displayInfo('command.about.serverInfo.upTime', () => {
    return formatTime(os.uptime() * 1000, c.lang)
  })

  if (process.platform === 'android') {
    // Device model
    displayInfo('command.about.serverInfo.os.android.model', () => {
      const brand = execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0]
      const model = execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0]
      return `${brand} ${model}`
    })
  }

  // Bot version
  displayInfo('command.about.serverInfo.botVer', () => {
    return botVersion
  })
}

const displayServerList = function (c) {
  for (const i in bots) {
    if (bots[i].host.options && bots[i].host.options.hidden) continue
    c.reply({
      translate: getMessage(c.lang, 'command.about.serverListItem'),
      color: c.colors.secondary,
      with: [
        {
          text: i.toString(),
          color: c.colors.primary
        },
        {
          text: `${bots[i].host.host}:${bots[i].host.port}`,
          color: c.colors.primary
        }
      ]
    })
  }
}

export default {
  execute: function (c) {
    if (c.args[0] === 'server') {
      aboutServer(c)
    } else if (c.args[0] === 'serverlist') {
      displayServerList(c)
    } else {
      aboutBot(c)
    }
  },
  aliases: ['info']
}
