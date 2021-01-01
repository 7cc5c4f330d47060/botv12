
	
var CommandChatQS = require('./CommandChatQS.js')
var CommandClearQ = require('./CommandClearQ.js')
var CommandCommandSpy = require('./CommandCommandSpy.js')
var CommandConfirm = require('./CommandConfirm.js')
var CommandConsole = require('./CommandConsole.js')
var CommandDeopAll = require('./CommandDeopAll.js')
var CommandEval = require('./CommandEval.js')
var CommandGamemode = require('./CommandGamemode.js')
var CommandHelp = require('./CommandHelp.js')
var CommandInfo = require('./CommandInfo.js')
var CommandIP = require('./CommandIP.js')
var CommandLogger = require('./CommandLogger.js')
var CommandLock = require('./CommandLock.js')
var CommandOpAll = require('./CommandOpAll.js')
var CommandPerms = require('./CommandPerms.js')
var CommandP = require('./CommandP.js')
var CommandPrefix = require('./CommandPrefix.js')
var CommandReload = require('./CommandReload.js')
var CommandRestart = require('./CommandRestart.js')
var CommandSay = require('./CommandSay.js')
var CommandServer = require('./CommandServer.js')
var CommandStopLag = require('./CommandStopLag.js')
var CommandT = require('./CommandT.js')
var CommandTabCode = require('./CommandTabCode.js')
var CommandTabComplete = require('./CommandTabComplete.js')
var CommandU = require('./CommandU.js')
var CommandUUIDtoUMAL = require('./CommandUUIDtoUMAL.js')
var CommandWMU = require('./CommandWMU.js') 
var CommandZelkam = require('./CommandZelkam.js')//nothing to do with Zelkam
var DisabledCommand = require('./DisabledCommand.js') 
class Commands {
	static cmdid = [];
static commands = {
  help: new CommandHelp(),
  confirm: new CommandConfirm(),
  "": new CommandPrefix(),
  clearcmdq: new CommandClearQ(),
  restart: new CommandRestart(null,null,{c:global.client}),
  perms: new CommandPerms(),
  "1a": new CommandGamemode(null,null,"creative @a",0,0),
  "0a": new CommandGamemode(null,null,"survival @a",2,1),
  "2a": new CommandGamemode(null,null,"adventure @a",2,1),
  "3a": new CommandGamemode(null,null,"spectator @a",2,1),
  "1m": new CommandGamemode(null,null,"creative",0,0),
  "0m": new CommandGamemode(null,null,"survival",0,0),
  "2m": new CommandGamemode(null,null,"adventure",0,0),
  "3m": new CommandGamemode(null,null,"spectator",0,0),
  swing: new CommandZelkam(),
  deopall: new CommandDeopAll(),
  opall: new CommandDeopAll(),
  logger: new CommandLogger(),
  say: new CommandSay(),
  tc: new CommandTabComplete(),
  ping2: new CommandServer(),
  chqs: new CommandChatQS(),
  info: new CommandInfo(),
  ip: new CommandIP(),
  u: new CommandU(),
  eval: new CommandEval(),
  reload: new CommandReload(),
  lock: new CommandLock(),
  console: new CommandConsole(),
  cspy: new CommandCommandSpy(),
  ping3: new CommandP(),
  stoplag: new CommandStopLag(),
  "7": new CommandTabCode(),
  whomadeyou: new CommandWMU(),
  uuidtoleastmost: new CommandUUIDtoUMAL(),
  t: new CommandT()
}
}
var a1aa=function(c,a){
  for(var i1a in a){
	Commands.commands[a[i1a]]={};
    Commands.commands[a[i1a]].h="Alias for |"+c;
    Commands.commands[a[i1a]].u=Commands.commands[c].u;
	Commands.commands[a[i1a]].command=Function("a","b","c","Commands.commands[\'"+c+"\'].command(a,b,c)")
  }
}
a1aa("swing",["swingarm"])
a1aa("deopall",["da","d@a"])
a1aa("opall",["oa","o@a"])
a1aa("1a",["1all","gmcall"])
a1aa("0a",["0all","gmsall"])
a1aa("2a",["2all","gmaall"])
a1aa("3a",["3all","gmspall"])
a1aa("1m",["1","gmc"])
a1aa("0m",["0","gms"])
a1aa("2m",["2","gma"])
a1aa("3m",["3","gmsp"])
a1aa("ping3",["p"])
for(var i1b in Commands.commands){Commands.cmdid.push({name:i1b,h:Commands.commands[i1b].h,usage:Commands.commands[i1b].u})}
module.exports=Commands;
