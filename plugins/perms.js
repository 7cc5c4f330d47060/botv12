const cmds = require('../util/commands.js')
const { getMessage } = require('../util/lang.js')
const hashcheck = require('../util/hashcheck.js')

module.exports = {
  load: (b) => {
    b.on("command", c => {
      const cmd = c.command.split(' ')
      const command = cmds[c.cmdName.toLowerCase()]
      const verify = hashcheck(cmd, c.uuid)
      const permsN = getMessage(c.lang, 'command.help.permsNormal')
      const permsT = getMessage(c.lang, 'command.help.permsTrusted')
      const permsO = getMessage(c.lang, 'command.help.permsOwner')
      if (command.level !== undefined && command.level > verify) {
        b.tellraw(c.uuid, {
          text: getMessage(c.lang, 'command.disallowed.perms')
        })
        b.tellraw(c.uuid, {
          text: getMessage(c.lang, 'command.disallowed.perms.yourLevel', [[permsN, permsT, permsO][verify]])
        })
        b.tellraw(c.uuid, {
          text: getMessage(c.lang, 'command.disallowed.perms.cmdLevel', [[permsN, permsT, permsO][command.level]])
        })
        c.cancel = true
      } else if (verify > 0) {
        c.rewriteCommand(cmd.slice(0, cmd.length - 1).join(' '))
        c.verify = verify;
      }
    })
  }
}
