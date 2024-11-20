const execute= (c) => {
  c.reply("Command has been disabled")
  //process.exit(0)
}
const aliases = ['reboot']
const level= 2

export { execute, aliases, level }