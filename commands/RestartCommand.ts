import Command from "../util/Command.js"

export default class RestartCommand extends Command {
  constructor () {
    super()
    this.name = 'restart'
    this.execute = async () => {
      process.exit(0)
    }
    this.aliases = ['reboot']
    this.level = 2
  }
}
