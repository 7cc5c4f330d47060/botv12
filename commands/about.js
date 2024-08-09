const version = require('../version.json')
const { getMessage } = require('../util/lang.js')
const botVersion = require('../util/version.js')

const aboutBot = function (c){
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
  c.reply({ text: '' })
  c.reply({
    translate: getMessage(c.lang, 'command.about.version'),
    color: c.colors.secondary,
    with: [
      {
        text: botVersion,
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
      return `${os.version()} (${os.release})`
    case 'android':
      return getMessage(l, 'command.serverinfo.os.android')
    case 'linux':
      return getMessage(l, 'command.serverinfo.os.linux', [os.release()])
    default:
      return o2
  }
}

const aboutServer = function (c){
  const displayInfo = function (name, infoFunc) {
    c.reply({
      translate: '%s: %s',
      with:[
        {
          text: getMessage(c.lang, name)
        },
        {
          text: infoFunc()
        }
      ]
    })
  }

  // Testing the new system
  displayInfo('command.about.serverInfo.os.freebsd', () => {
    return "testing!"
  })
}
module.exports = {
  execute: function (c) {
    if(c.args[0] === 'server'){
      aboutServer(c)
    } else {
      aboutBot(c)
    }
  },
  aliases: ['info']
}
