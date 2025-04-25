const reply = function (name, item) {
  return {
    text: 'listItem',
    parseLang: true,
    with: [
      `command.test.${name}`,
      {
        text: item,
        copyable: true
      }
    ]
  }
}
const execute = c => {
  c.reply(reply('uuid', c.uuid))
  c.reply(reply('username', c.username))
  c.reply(reply('nickname', c.nickname))
  c.reply(reply('command', c.command.slice(0, 1024)))
  c.reply(reply('msgType', c.msgType))
  c.reply(reply('msgSubtype', c.msgSubtype))
  c.reply(reply('prefix', c.prefix))
  c.reply(reply('args', c.args.join(', ').slice(0, 1024)))
  c.reply(reply('verify', c.verify.toString()))
  c.reply(reply('host', c.host))
  c.reply(reply('port', c.port.toString()))
  c.reply(reply('lang', c.lang))
}
export { execute }
