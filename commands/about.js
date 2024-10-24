import os from 'node:os'
import { execSync } from 'child_process'
import { getMessage, formatTime } from '../util/lang.js'
import memoryconvert from '../util/memoryconvert.js'
import { readdirSync, readFileSync } from "node:fs"
import { default as botVersion } from "../util/version.js"
import { default as version } from "../version.json" with { type: "json" }
import { bots } from "../index.js"


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
    text: getMessage(c.lang, 'command.about.license'),
    color: c.colors.secondary
  })
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
        for (const item of osrelease) {
          if (!item.includes('=')) continue
          let osrvalue = item.split('=')[1]
          if (osrvalue.startsWith('"') && osrvalue.endsWith('"')) { osrvalue = osrvalue.slice(1, osrvalue.length - 1) };
          osrelease2[item.split('=')[0]] = osrvalue
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
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: thisItem
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            },
            value: { // Added twice for backwards compatibility
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            }
          }
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

  // System memory (total)
  displayInfo('command.about.serverInfo.totalMem', () => {
    return memoryconvert(os.totalmem())
  })

  // System memory (free)
  displayInfo('command.about.serverInfo.freeMem', () => {
    return memoryconvert(os.freemem())
  })

  // System memory (used)
  displayInfo('command.about.serverInfo.usedMem', () => {
    return memoryconvert(os.totalmem() - os.freemem())
  })

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
  index.bots.forEach((item, i) => {
    if (c.bot.id === i && c.bot.host.options.hideLocally) return
    if (item.host.options && item.host.options.hidden && c.verify !== 2 && c.bot.id !== i) return
    let message = 'command.about.serverListItem'
    if (c.bot.id === i) message = 'command.about.serverListItem.thisServer'
    let host = item.host.host
    const port = item.host.port
    if (item.host.options && item.host.options.displayAsIPv6) {
      host = `[${host}]`
    }
    c.reply({
      translate: getMessage(c.lang, message),
      color: c.colors.secondary,
      with: [
        {
          text: i.toString(),
          color: c.colors.primary
        },
        {
          text: `${host}:${port}`,
          color: c.colors.primary,
          clickEvent: {
            action: 'copy_to_clipboard',
            value: `${host}:${port}`
          },
          hoverEvent: {
            action: 'show_text',
            contents: {
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            },
            value: { // Added twice for backwards compatibility
              text: getMessage(c.lang, 'copyText'),
              color: c.colors.secondary
            }
          }
        }
      ]
    })
  })
}

const execute = function (c) {
  let subcmd
  if (c.args.length >= 1) subcmd = c.args[0].toLowerCase()
  if (subcmd === 'servers') subcmd = 'serverlist'
  if (c.cmdName.toLowerCase() === 'serverinfo' || c.cmdName.toLowerCase() === 'specs') subcmd = 'server'
  if (c.cmdName.toLowerCase() === 'serverlist' || c.cmdName.toLowerCase() === 'servers') subcmd = 'serverlist'
  if (subcmd === 'server') {
    aboutServer(c)
  } else if (subcmd === 'serverlist') {
    displayServerList(c)
  } else {
    aboutBot(c)
  }
}
const aliases = ['info', 'serverlist', 'servers', 'serverinfo', 'specs']
export { execute, aliases }