import Command from "./Command.js";
import CommandContext from "./CommandContext.js";

export default class UnknownCommand extends Command {
  constructor () {
    super()
    this.execute = async (c: CommandContext) => {
      c.reply({ text: 'command.error.unknown', parseLang: true })
    }
  }
}