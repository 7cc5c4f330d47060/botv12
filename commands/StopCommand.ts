import Command from "../util/Command.js"

export default class StopCommand extends Command {
  constructor () {
    super()
    this.name = 'stop'
    this.execute = async () => {
      process.exit(1)
    }
    this.aliases = ['exit']
    this.level = 2
  }
}
