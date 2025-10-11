import { bots } from '../../index.js'
import CommandContext from '../../util/CommandContext.js'

export default async function displayServerList (c: CommandContext) {
  bots.forEach((item, i) => {
    if (c.bot.id === i && c.bot.host.options.hideLocally) return
    if (item.host.options.hidden && c.verify !== 2 && c.bot.id !== i) return
    let host = item.host.host
    const port = item.host.port
    if (host.match(/(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/)) {
      host = `[${host}]`
    }
    c.reply({
      text: 'command.about.serverListItem',
      parseLang: true,
      with: [
        i.toString(),
        {
          text: `${host}:${port ?? 25565}`,
          copyable: true
        },
        item.host.options.hidden ? 
          { text: 'command.about.serverList.hidden', parseLang: true } : ''
      ]
    })
  })
}
