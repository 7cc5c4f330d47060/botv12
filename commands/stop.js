const execute= (c) => {
  c.reply("Command has been disabled")
  //process.exit(1)
}
const aliases = ['exit']
const level= 2

export { execute, aliases, level }