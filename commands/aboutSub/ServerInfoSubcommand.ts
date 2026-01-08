import os from 'node:os'
import { execSync } from 'child_process'
import { getMessage, formatTime } from '../../util/lang.js'
import memoryconvert from '../../util/memoryconvert.js'
import { readdirSync, readFileSync } from 'node:fs'
import CommandContext from '../../util/CommandContext.js'
import Command from '../../util/Command.js'

const parseOSRelease = (): Record<string, string> => {
  if (readdirSync('/etc').includes('os-release')) {
    const osrelease = readFileSync('/etc/os-release').toString('utf8').split('\n')
    const osrelease2: Record<string, string> = {}
    for (const item of osrelease) {
      if (!item.includes('=')) continue
      let osrvalue = item.split('=')[1]
      if (osrvalue.startsWith('"') && osrvalue.endsWith('"')) { osrvalue = osrvalue.slice(1, osrvalue.length - 1) };
      osrelease2[item.split('=')[0]] = osrvalue
    }
    return osrelease2
  }
  return {}
}

const os2 = function (o2: string, lang: string) {
  switch (o2) {
    case 'win32':
      return `${os.version()}`
    case 'android':{
      try {
        const version = execSync('getprop ro.build.version.release').toString('utf8').split('\n')[0]
        return getMessage(lang, 'command.about.serverInfo.os.android', [version])
      } catch (e) {
        return getMessage(lang, 'command.about.serverInfo.os.android.noVersion')
      }
    }
    case 'linux':
    case 'freebsd':{
      const osrelease2 = parseOSRelease()
      try {
        if (osrelease2.PRETTY_NAME) {
          return getMessage(lang, '%s', [osrelease2.PRETTY_NAME])
        } else {
          return getMessage(lang, `command.about.serverInfo.os.${o2}`)
        }
      } catch (e) {
        if(debugMode) console.log(e)
        return getMessage(lang, `command.about.serverInfo.os.${o2}`)
      }
    }
    case 'openbsd':{
      return getMessage(lang, 'command.about.serverInfo.os.openbsd', [os.release()])
    }
    case 'darwin':{
      try {
        const swvers = execSync('sw_vers').toString('utf8').split('\n')
        const swvers2: any = {}
        for (const item of swvers) {
          if (!item.includes(':\t')) continue
          swvers2[item.split(':\t')[0]] = item.split(':\t')[1]
        }
        return getMessage(lang, '%s %s (%s)', [swvers2.ProductName, swvers2.ProductVersion, swvers2.BuildVersion])
      } catch (e) {
        if(debugMode) console.log(e)
        return getMessage(lang, 'command.about.serverInfo.os.macos')
      }
    }
    default:
      return o2
  }
}

export default class ServerInfoSubcommand extends Command {
  constructor () {
    super()
    this.name = "server"
    this.aliases = [ "serverinfo" ]
    this.execute = async (c: CommandContext) => {
      const displayInfo = function (name: string, infoFunc: () => any) {
        let thisItem
        try {
          thisItem = infoFunc()
        } catch (e) {
          console.error(e)
          thisItem = 'Error! (check console)'
        }
        if (thisItem.length === 0) return

        c.reply({
          text: 'listItem',
          parseLang: true,
          with: [
            {
              text: getMessage(c.lang, name)
            },
            thisItem
          ]
        })
      }

      c.reply({
        text: 'command.about.serverInfo.systemInfoHeader',
        parseLang: true,
        color: 'aqua' // Aqua is temporary until colors are re-added to settings
      })

      // Operating system
      displayInfo('command.about.serverInfo.os', () => {
        return os2(process.platform, c.lang)
      })

      // Operating system version for some Linux systems, since sometimes PRETTY_NAME excludes
      // version information.
      displayInfo('command.about.serverInfo.osVersion', () => {
        try {
          const or = parseOSRelease()
          if (or.VERSION_ID) return or.VERSION_ID
          else if (or.VERSION) return or.VERSION
          else return ''
        } catch (e) {
          if(debugMode) console.log(e)
          return ''
        }
      })

      // Kernel version: os.release()
      // On FreeBSD and OpenBSD, the kernel version is already stated in the result of os2.
      if (process.platform !== 'freebsd' && process.platform !== 'openbsd') {
        displayInfo('command.about.serverInfo.kernelVer', () => {
          return os.release()
        })
      }

      // Processor, if it can be determined through Node.js
      displayInfo('command.about.serverInfo.processor', () => {
        return os.cpus()[0].model ?? ''
      })

      // Processor architecture
      displayInfo('command.about.serverInfo.arch', () => {
        return os.machine()
      })

      // System memory
      displayInfo('command.about.serverInfo.usedMem', () => {
        return `${memoryconvert(os.totalmem() - os.freemem())} / ${memoryconvert(os.totalmem())} ` +
        `(${getMessage(c.lang, 'command.about.serverInfo.freeMem', [memoryconvert(os.freemem())])})`
      })

      // Username, and OS UID if not on Windows
      displayInfo('command.about.serverInfo.osUsername', () => {
        let output = os.userInfo().username
        if(process.platform != 'win32') output += ` (${os.userInfo().uid})`
        return output
      })

      // Hostname
      displayInfo('command.about.serverInfo.hostName', () => {
        return os.hostname()
      })

      // Bot uptime
      displayInfo('command.about.serverInfo.runTime', () => {
        return formatTime(process.uptime() * 1000)
      })

      // System uptime
      displayInfo('command.about.serverInfo.upTime', () => {
        return formatTime(os.uptime() * 1000)
      })

      if (process.platform === 'android') {
        // Device model
        displayInfo('command.about.serverInfo.os.android.model', () => {
          const brand = execSync('getprop ro.product.brand').toString('utf8').split('\n')[0]
          const model = execSync('getprop ro.product.model').toString('utf8').split('\n')[0]
          return `${brand} ${model}`
        })
      }

      c.reply({
        text: 'command.about.serverInfo.botInfoHeader', 
        parseLang: true,
        color: 'aqua'
      })

      // Current working directory (usually the same as baseDir)
      displayInfo('command.about.serverInfo.workingDir', () => {
        return process.cwd()
      })

      // Base directory - directory with TypeScript code, language data, settings, etc. in it
      displayInfo('command.about.serverInfo.baseDir', () => {
        return baseDir
      })

      // Directory with compiled JavaScript code in it
      displayInfo('command.about.serverInfo.codeDir', () => {
        return codeDir
      })

      // Command line (process.argv)
      displayInfo('command.about.serverInfo.cmdLine', () => {
        return process.argv.join(' ')
      })

      // Debug Mode Status
      displayInfo('command.about.serverInfo.debugMode', () => {
        return {text: `bf.${debugMode}1`, parseLang: true}
      })
    }
  }
}
