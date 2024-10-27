import cmds from "../util/commands.js" 
import { default as settings } from '../settings.json' with {type: "json"}
import Command from '../util/Command.js'
export default function load (b) {
  b.on('chat', (data) => {
    const fullCommand = data.message
    for (const prefix of settings.prefixes) {
      if (fullCommand.startsWith(prefix)) {
        const command = fullCommand.slice(prefix.length)
        b.runCommand(data.username, data.nickname, data.uuid, command, data.type, data.subtype, prefix)
      }
    }
  })
  b.runCommand = function (user, nick, uuid, command, type, subtype, prefix){
    const context = new Command(uuid, user, nick, command, "minecraft", type, subtype, prefix, b, 0, {})
    if(cmds[context.cmdName.toLowerCase()]){
      try {
        cmds[context.cmdName.toLowerCase()].execute(context)
      } catch (e) {
        console.log(e)
        context.reply({
          text: "An error occured (check console)"
        })
      }
    }
  }
}
