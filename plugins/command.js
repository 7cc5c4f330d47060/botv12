import cmds from "../util/commands.js" 
import { default as settings } from '../settings.json' with {type: "json"}
import Command from '../util/Command.js'
export default function load (b) {
  b.on('chat', (data) => { // constructor (uuid, user, nick, cmd, senderType, msgType, msgSubtype, prefix, bot, prefs) {
    const fullCommand = data.message
    for (const prefix of settings.prefixes) {
      if (fullCommand.startsWith(prefix)) {
        const command = fullCommand.slice(prefix.length)
        b.runCommand(data.username, data.nickname, data.uuid, command, data.type, data.subtype, prefix)
      }
    }
  })
  b.runCommand = function (user, nick, uuid, command, type, subtype, prefix){
    const context = new Command(uuid, user, nick, command, "minecraft", type, subtype, prefix, b, {})
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
/*
{
  parsed: true,
  json: {
    color: '#FF99DD',
    hoverEvent: { action: 'show_text', contents: [Object] },
    translate: '%s %s › %s',
    with: [ [Object], [Object], [Object] ]
  },
  type: 'system',
  subtype: 'chipmunkmod_name3',
  uuid: '00000000-265d-39fa-979f-d8c9d835084e',
  message: 'uwu',
  nickname: 'owo439895035',
  username: 'owo439895035'
}
*/