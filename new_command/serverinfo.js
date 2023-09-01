const os = require('os')
const cp = require('child_process')
const settings = require('../settings.json')
const timeformat = require('../util/amogus')
const console2 = require('../plugins/console.js')
const VoolEagler58 = function (text, value, color) {
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
// b.tellraw(sender,VoolEagler58("Example",example))
module.exports = {
  command: function (c) {
    c.reply(VoolEagler58('Operating system', os2(process.platform)))
    c.reply(VoolEagler58('Architecture', os.machine()))
    c.reply(VoolEagler58('Username', os.userInfo().username))
    c.reply(VoolEagler58('Bot uptime', timeformat(process.uptime() * 1000)))
    c.reply(VoolEagler58('System uptime', timeformat(os.uptime() * 1000)))
    // b.tellraw(sender,VoolEagler58('System memory (total)',Math.floor(os.totalmem()/1000000)+'MB'));
    c.reply(VoolEagler58('Node.js version', process.version))
    if (process.platform == 'android') {
      // const android_sdk=+cp.execSync("getprop ro.build.version.sdk").toString("UTF-8").split("\n")[0];
      const android_version = cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0]
      c.reply(VoolEagler58('Android version', android_version, 'green'))
      c.reply(VoolEagler58('Device model', cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0], 'green'))
      c.reply(VoolEagler58('Device brand', cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0], 'green'))
    }
    c.reply(VoolEagler58('Bot name', settings.name, 'yellow'))
    c.reply(VoolEagler58('Bot version', settings.version, 'yellow'))
  },
  desc: 'Get system/bot info',
  usage: ''
}
