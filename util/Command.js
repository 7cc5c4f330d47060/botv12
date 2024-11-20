import { default as settings } from '../settings.js'
export default class Command {
    constructor (uuid, user, nick, cmd, senderType, msgType, msgSubtype, prefix, bot, verify) {
        this.uuid=uuid;
        this.reply = text => bot.tellraw(uuid, text)
        this.username = user;
        this.nickname = nick;
        this.command = cmd;
        this.type = senderType;
        this.msgType = msgType;
        this.msgSubtype = msgSubtype; 
        this.args = cmd.split(' ').slice(1)
        this.cmdName = cmd.split(' ')[0]
        this.prefix = prefix
        this.colors = settings.colors
        this.lang = settings.defaultLang
        this.verify = verify
        this.host = bot.host.host
        this.port = bot.host.port
        this.bot = bot
    }
}