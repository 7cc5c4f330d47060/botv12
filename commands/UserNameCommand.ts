import Command from "../util/Command.js"
import CommandContext from "../util/CommandContext.js"


export default class UserNameCommand extends Command {
  constructor () {
    super()
    this.name = 'username'
    this.hidden = true
    this.execute = async (c: CommandContext) => {
      if(!c.bot._client) return
      c.reply({
        text: 'command.username',
        parseLang: true,
        color: '$secondary',
        with: [
          {
            text: c.bot._client?.username,
            copyable: true,
            color: '$primary'
          },
          {
            text: c.bot._client?.uuid,
            copyable: true,
            color: '$primary'
          }
        ]
      })
    }
    this.consoleIndex = true
  }
}
