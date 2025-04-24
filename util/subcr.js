import CommandR from './cr.js'
export default class SubCommandR extends CommandR {
  constructor () {
    super()
    
    this.aliases = [];

    this.runCommand = function (context){
      const args = context.args
      let subCommand = args[0]
      const command = this.getCommand(subCommand)
      if(command) {
        args.splice(0, 1)[0]
        context.rewriteCommand(args.join(" "))
      } else if (this.getCommand(context.cmdName)) {
        subCommand = context.cmdName
      } else {
        subCommand = 'base'
      }
      this.getCommand(subCommand).execute(context)
    }

    this.register = function (name, payload, aliases) {
      if(name !== 'base') this.aliases.push(name)
      const command = {}
      command.execute = payload
      if (aliases) for (const alias of aliases){
        this._aliases[alias] = name
        this.aliases.push(alias)
      }
      command.aliases = aliases
      this._commands[name] = command
    }
  }
}
