import { default as settings } from '../settings.json' with {type: "json"}
export default class Command {
    constructor (uuid, user, nick, cmd, senderType, msgType, msgSubtype, prefix, bot, prefs) {
        this.uuid=uuid;
        this.reply = text => bot.tellraw(uuid, text)
        this.username = user;
        this.nickname = nick;
        this.args = cmd.split(' ').slice(1)
        this.cmdName = cmd.split(' ')[0]
        this.prefix = prefix
        this.colors = settings.colors
        this.verify = 0
        this.host = "google.com"
        this.port = 443
    }
}