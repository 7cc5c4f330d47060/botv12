const execute = c => {
  c.reply({
    text: 'command.verify.success',
    parseLang: true,
    with: [
      {
        text: `command.perms${c.level}`,
        parseLang: true
      }
    ]
  })
}
const aliases = ['verify']
const level = 1

export { execute, aliases, level }
