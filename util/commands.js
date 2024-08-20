const cmds = Object.create(null)

import { default as commandTest } from "../commands/test.mjs"
import { default as commandSay } from "../commands/say.mjs"

cmds.test = commandTest
cmds.say = commandSay

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
