import os from 'node:os'
import { execSync } from 'child_process'
import { getMessage, formatTime } from '../../util/lang.js'
import memoryconvert from '../../util/memoryconvert.js'
import { readdirSync, readFileSync } from 'node:fs'
import CommandContext from '../../util/CommandContext.js'

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
      if (readdirSync('/etc').includes('os-release')) {
        const osrelease = readFileSync('/etc/os-release').toString('utf8').split('\n')
        const osrelease2: any = {}
        for (const item of osrelease) {
          if (!item.includes('=')) continue
          let osrvalue = item.split('=')[1]
          if (osrvalue.startsWith('"') && osrvalue.endsWith('"')) { osrvalue = osrvalue.slice(1, osrvalue.length - 1) };
          osrelease2[item.split('=')[0]] = osrvalue
        }

        if (osrelease2.PRETTY_NAME) {
          return getMessage(lang, '%s', [osrelease2.PRETTY_NAME])
        } else {
          return getMessage(lang, `command.about.serverInfo.os.${o2}`)
        }
      } else {
        return getMessage(lang, `command.about.serverInfo.os.${o2}`)
      }
    }
    case 'openbsd':{
      return getMessage(lang, 'command.about.serverInfo.os.openbsd', [os.release()])
    }
    case 'darwin':{
      try {
        const osrelease = execSync('sw_vers').toString('utf8').split('\n')
        const osrelease2: any = {}
        for (const item of osrelease) {
          if (!item.includes(':\t')) continue
          osrelease2[item.split(':\t')[0]] = item.split(':\t')[1]
        }
        return getMessage(lang, '%s %s (%s)', [osrelease2.ProductName, osrelease2.ProductVersion, osrelease2.BuildVersion])
      } catch (e) {
        return getMessage(lang, 'command.about.serverInfo.os.macos')
      }
    }
    default:
      return o2
  }
}

export default async function aboutServer (c: CommandContext) {
  const displayInfo = function (name: string, infoFunc: any) {
    let thisItem
    try {
      thisItem = infoFunc()
    } catch (e) {
      console.error(e)
      thisItem = 'Error! (check console)'
    }

    c.reply({
      text: 'listItem',
      parseLang: true,
      with: [
        {
          text: getMessage(c.lang, name)
        },
        {
          text: thisItem,
          copyable: true
        }
      ]
    })
  }

  // Operating system
  displayInfo('command.about.serverInfo.os', () => {
    return os2(process.platform, c.lang)
  })

  // Kernel version: os.release()
  // On FreeBSD and OpenBSD, the kernel version is already stated in the result of os2.
  if (process.platform !== 'freebsd' && process.platform !== 'openbsd') {
    displayInfo('command.about.serverInfo.kernelVer', () => {
      return os.release()
    })
  }

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

  // System memory (used)
  displayInfo('command.about.serverInfo.usedMem', () => {
    return `${memoryconvert(os.totalmem() - os.freemem())} / ${memoryconvert(os.totalmem())} ` +
    `(${getMessage(c.lang, 'command.about.serverInfo.freeMem', [memoryconvert(os.freemem())])})`
  })

  // Username and UID
  displayInfo('command.about.serverInfo.osUsername', () => {
    return `${os.userInfo().username} (${os.userInfo().uid})`
  })

  // Hostname
  displayInfo('command.about.serverInfo.hostName', () => {
    return os.hostname()
  })

  // Current working directory (also baseDir)
  displayInfo('command.about.serverInfo.workingDir', () => {
    return process.cwd()
  })

  // Base directory - directory with TypeScript code, language data, settings, etc. in it
  displayInfo('command.about.serverInfo.baseDir', () => {
    return baseDir
  })

  // Directory with code in it
  displayInfo('command.about.serverInfo.codeDir', () => {
    return codeDir
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
}
