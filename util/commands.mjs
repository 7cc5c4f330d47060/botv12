const cmds = Object.create(null)

import { default as commandTest } from "../commands/test.mjs"
import { default as commandSay } from "../commands/say.mjs"
import { default as commandNetmsg } from "../commands/netmsg.mjs"
import { default as commandHelp } from "../commands/help.mjs"
import { default as commandAbout } from "../commands/about.mjs"
import { default as commandCb } from "../commands/cb.mjs"
import { default as commandCloop } from "../commands/cloop.mjs"
import { default as commandEval } from "../commands/eval.mjs"
import { default as commandLogoff } from "../commands/logoff.mjs"
import { default as commandRefill } from "../commands/refill.mjs"
import { default as commandRestart } from "../commands/restart.mjs"
import { default as commandSettings } from "../commands/settings.mjs"
import { default as commandStop } from "../commands/stop.mjs"
import { default as commandTemplate } from "../commands/template.mjs"
import { default as commandTpr } from "../commands/tpr.mjs"
import { default as commandVerify } from "../commands/verify.mjs"

cmds.test = commandTest
cmds.say = commandSay
cmds.netmsg = commandNetmsg
cmds.help = commandHelp
cmds.about = commandAbout
cmds.cb = commandCb
cmds.cloop = commandCloop
cmds.eval = commandEval
cmds.logoff = commandLogoff
cmds.refill = commandRefill
cmds.restart = commandRestart
cmds.settings = commandSettings
cmds.stop = commandStop
cmds.template = commandTemplate
cmds.tpr = commandTpr
cmds.verify = commandVerify

for(const commandName in cmds){
  if (cmds[commandName].aliases) {
    for (const j in cmds[commandName].aliases) {
      cmds[cmds[commandName].aliases[j]] = {
        execute: cmds[commandName].execute,
        alias: commandName,
        usage: cmds[commandName].usage,
        level: cmds[commandName].level,
        hidden: true,
        consoleIndex: cmds[commandName].consoleIndex
      }
    }
  }
}

export default cmds
