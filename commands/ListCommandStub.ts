import CommandContext from "../util/CommandContext"
import Command from "../util/Command.js";

export default class ListCommandStub extends Command {
  constructor () {
    super()
    this.name = 'list'
    this.execute = async (c: CommandContext) => {
      c.reply({text: 'command.list.ss22'})
      //Lists unvanished players. Vanished support will come later.
    }
  }
}
