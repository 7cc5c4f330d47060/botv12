const mc = require("minecraft-protocol");
const fs = require("fs");
const os = require("os");
const maestro = require("./BotHelperScripts/maestro.js")
const lang = require("./BotHelperScripts/LoggerHelper/index.js");
let _perms = require("./perms.json");
const readline = require("readline");
const crypto = require("crypto");
function getDateAndTime4L(a){
  if(!a) a=Date.now();
  let fw = new Date(a);
  return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+fw.getUTCHours()+":"+fw.getUTCMinutes()+":"+fw.getUTCSeconds()+":"+fw.getUTCMilliseconds()+"]";
}
process.on("exit",function(c){
  fs.appendFileSync("Exit Log.txt",getDateAndTime4L()+" X: "+c+"\n") //eXit
})
process.on("uncaughtException",function(e){//Error
  fs.appendFileSync("Exit Log.txt",getDateAndTime4L()+" E: "+e+"\n");
  console.log(e)
  process.reallyExit(0);
})

bridges=["813677042695536650","813678515558940692","814512716135530516"];
const srv=require("./srv.js")
const djs=require("discord.js")
global.dbot=new djs.Client();
dbot.on('ready', () => {
  try{
    console.log("[Info] Discord bot logged in.")
    var sendStr="";
    for(var i in bots){
      sendStr+="Bot "+i+" code: ```"+bots[i].adminCode+"```\n"
    }
    dbot.channels.cache.get("813670842365902898").send(sendStr)
  }catch(e){}
})
dbot.on("message",(msg)=>{
  try{
    if(bridges.includes(msg.channel.id) && msg.author.id!==dbot.user.id){
      if(Date.now()-dbot.dcmcbrtm<=1000) return;
      dbot.dcmcbrtm=Date.now();
      bots[bridges.indexOf(msg.channel.id)]._cwc("/bcraw &7[&dUnnamedBot Discord&7] &b"+msg.member.displayName+" &7> &f"+msg.content.substr(0,100))
    }
  }catch(e){}
})
setInterval(()=>{
  try{
    sendstr="";
    for(var i in bots){
      if(bots[i].oldCode!=bots[i].adminCode){
        sendstr+="Bot "+i+" code: ```"+bots[i].adminCode+"```\n"
      }
      bots[i].oldCode=bots[i].adminCode
    }
    if(sendstr!=""){
      dbot.channels.cache.get("813670842365902898").send(sendstr)
    }
  }catch(e){}
},3000)
global.javaUUID=(s)=>{
  const buffer = crypto.createHash('md5').update(s, 'utf8').digest()
  buffer[6] = (buffer[6] & 0x0f) | 0x30
  buffer[8] = (buffer[8] & 0x3f) | 0x80
  const fix=buffer.toString("hex");
  return fix.slice(0,8)+"-"+fix.slice(8,12)+"-"+fix.slice(12,16)+"-"+fix.slice(16,20)+"-"+fix.slice(20,32)
}

for(var i in _perms){
  if(i.startsWith("UUID:")){
    _perms[javaUUID("OfflinePlayer:"+i.slice(5))]=_perms[i]
  }
}
global.hexxd=()=>{
  return String.fromCharCode(Math.floor(Math.random()*16)+16)
}
global.funnies = (___a)=>{
  let _a23="";
  for(let i=0;i<___a*2;i++){
    _a23+=hexxd()
  }
  return _a23
}
global.perms=(uuid)=>{
  if(_perms[uuid]){
    return _perms[uuid][0];
  }
  return 0;
}
global.role=(uuid)=>{
  if(_perms[uuid] && _perms[uuid][1] !== undefined){
    return _perms[uuid][1];
  }
  return ["User"]
}
global.t=(uuid)=>{
  if(_perms[uuid] && _perms[uuid][3] !== undefined){
    return _perms[uuid][3];
  }
  return ["User"];
}
global.canRun=function(uuid,cmd){
  if(hasPN(uuid,"_bot.command."+cmd.split(" ")[0].toLowerCase()+".command")){
    return true;
  }
  return false;
}
global.nodes=require("./pn.json")
for(var i in _perms){
  if(i.startsWith("UUID:")){
    _perms[javaUUID("OfflinePlayer:"+i.slice(5))]=_perms[i]
  }
}
global.hasPN=function(uuid,node){
  let yes=false;
  for(var i=0; i<=perms(uuid); i++){
    if(nodes[0][i] && nodes[0][i][node] !== undefined){
      yes=nodes[0][i][node];
    }
  }
  const _t=t(uuid);
  for(var j in _t){
    var i=_t[j]
    //console.log("_"+i+"_")
    if(nodes[1][i] && nodes[1][i][node] !== undefined){
      yes=nodes[1][i][node];
      //console.log(JSON.stringify(nodes[1][i]))
    }
  }
  if(nodes[2][uuid] && nodes[2][uuid][node]){
    yes=nodes[2][uuid][node];
  }
  if(uuid=="e23a69d2-809f-64b4-8d92-3ab9e0f28823"){
    //yes=true;
  }
  return yes;
}
global.botcommands = require("./botcmd.js");
const consolecmds = {
  say:{
    command:(cmd)=>{
      const args=cmd.split(" ");
      const botno=+args[1];
      const chromebook = cmd.slice(5+args[1].length);
      if(args[1]=="*"){
        for(var i=0; i<bots.length; i++){
          bots[+i]._cwc(chromebook);
        }
        return;
      }
      bots[botno]._cwc(chromebook);
    }
  },
  eval:{
    command:(cmd)=>{
      console._log(eval(cmd.slice(5)));
    }
  },
  relogall:{
    command:(cmd)=>{
      for(var i in bots){
        bots[i].end();
      }
    }
  },
  botcmd:{
    command:(cmd)=>{
      const args=cmd.split(" ");
      const botno=+args[1];
      const chromebook = cmd.slice(8+args[1].length);
      if(args[1]=="*"){
        for(var i=0; i<bots.length; i++){
          bots[+i].command(bots[+i],"Console",chromebook,"e23a69d2-809f-64b4-8d92-3ab9e0f28823");
        }
        return;
      }
      bots[botno].command(bots[botno],"Console",chromebook,"e23a69d2-809f-64b4-8d92-3ab9e0f28823");
    }
  },
  msg:{
    command: (c)=>{
      const args=c.split(" ");
      let flag = "";
      if(args[1].startsWith("-")){
        flag=args[1].slice(1,args.length)
        args.shift();
      }
      args.shift();
      let file;
      if(flag.includes("r")){
        file=args.join(" ");
      } else {
        file="./Commands/messages/"+args.join(" ");
      }
      bot.chatq.unshift("&7Now opening file &d"+file)
      fs.readFile(file,"utf8",(e,d)=>{
        if(e){
          console.log(e);
        } else {
          if(flag.includes("s")){
            d=d.replace(/ /g, " &r")
          }
          if(flag.includes("C")){
            d=d.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, " ")
          }
          if(flag.includes("c")){
            d=d.replace(/[\x00-\x09\x0B-\x1F\x7F]/g, "")
          }
          if(flag.includes("a")){
            d=d.split("&").join("&&r")
          }
          if(flag.includes("S")){
            let __chatQueue=d.split("\xa7").join("&").split("\n")
          } else if(flag.includes("R")){
            let __chatQueue=d.split("\xa7").join("").split("\n")
          } else {
            let __chatQueue=d.split("\n")
          }
          for(var i in __chatQueue){
            bot._cwc(__chatQueue[i])
          }
        }
        bot.chatq.unshift("&7Now reading file &d"+file+"&7 to chat")
      })
    }
  },
  restart:{
    command:(cmd)=>{
      for(var i in bots){
        bots[i].write("chat",{message:"The bot is restarting."})
      }
      setTimeout(process.exit,100);
    }
  },
  relog:{
    command:(cmd,uuid)=>{
      let args=cmd.split(" ");
      bots[+args[1]].end();
    }
  }
}
const rl=readline.createInterface({
  input:process.stdin,
  output:process.stdout,
  prompt:"\x1b[0m\x1b[1m\x1b[37m> "
})
rl.on("line",(l)=>{
  try{
    _cmd = l.split(" ")[0].toLowerCase();
    consolecmds[_cmd].command(l)
  }catch(e){console.log(e)}
  rl.prompt(false)
})
rl.prompt(false);
global.conf={mcVersion:"1.16.4"};
console._log=(a)=>{
  console.log("\x1b[0m\x1b[1m\x1b[37m"+a);
}
global.bots=[]; //so the user can select one or more bots at console
function createBot(_server,_115){
  fs.access("./"+_server+"/",fs.constants.F_OK,(e)=>{
    if(e){
      fs.mkdir("./"+_server+"/",()=>{})
    }
  })
  const server = _server.split(":")[0];
  let port=25565;
  if(_server.includes(":")){
    port = +_server.split(":")[1]
  }
  let bot=mc.createClient({
    host: server,
    port: port,
    /*username:"abcdefg"*/  username: "\xa7"+Math.floor(Math.random()*16).toString(16)+funnies(3)+"\xa7"+Math.floor(Math.random()*16).toString(16)+funnies(3)
  })
bot.ccrun=(cmd)=>{
    bot.write('update_command_block',{location:{x:bot.x+(bot.cmdindex%16),y:0,z:bot.z+(bot.cmdindex >> 4)},command:cmd,mode:1,flags:4})
    bot.cmdindex++;
    bot.cmdindex=bot.cmdindex%256
  }
  bot.confirmq=[];
  bot.oldCode=bot.adminCode=crypto.randomBytes(96).toString("hex");
  bot._server=_server;
  bot.P={};
  bot.on("player_info",(packet)=>{
    for(let i1c in packet.data){
      if(packet.action==0){
        try{if(packet.data[i1c].name=="Skeppy"){setTimeout(function(){bot.ccrun("sudo Skeppy username fake skeppy")},3000);bot.ccrun("bcraw &4&l[&c&lOP&4&l] &c"+bot.username+"&r: &rf a k e   a s s   s k e p p y")}}catch(e){}
    //    if(packet.data[i1c].name=="sadwsdasadIuCC"){ bot._cwc("/icu control IuCC")}
        bot.P[packet.data[i1c].UUID]=packet.data[i1c];
        if(packet.data[i1c].name.match(/dsoig[0-9]/)){
          bot.chatq.unshift(`#cb sudo * icu control ${packet.data[i1c].UUID}`)
          bot.chatq.unshift(`#cb v ${packet.data[i1c].UUID} off`)
        }
      }
    }
  })
  bot.on("success",(packet)=>{
  bot.write("settings",{locale:"en_us",viewDistance:6,chatFlags:0,chatColors:true,mainHand:0,skinParts:255})
  bot.x=((Math.floor(Math.random()*1000000)) >> 4 ) * 16
  bot.z=((Math.floor(Math.random()*1000000)) >> 4 ) * 16
  setTimeout(()=>{
  bot.socket.setTimeout(25000);
  bot.socket.on("timeout",()=>{
    bot.end();
  })
  },1000)
    console._log(`[Info] Bot ${bots.indexOf(bot)} has connected to server ${bot._server}.`);
    bot._cwc(`/mute ${bot.uuid} 0s`);
  })
  
  bot.on("position",(p)=>{
    if(p.x!==bot.x || p.z!==bot.z){
    bot.offpos=1;//  bot._cwc(`/tp ${bot.x} 100 ${bot.z}`)
    }
    if(p.teleportId===0){
    }
    bot.write("teleport_confirm",{teleportId:p.teleportId})
  })
var cooldownAternos=0;
bot.on('login', p=>{
  if(p.entityId){
    bot.write("chat",{message:"/essentials:evanish on"})
    bot.entityid=p.entityId
  }
  bot._cwc(`/forceload add ${bot.x} ${bot.z}`);
  bot._cwc(`/fill ${bot.x} 0 ${bot.z} ${bot.x+15} 0 ${bot.z+15} command_block destroy`);
})
  bot.cmdindex=0;
  
  bot.on('entity_status', p=>{
    if(p.entityId==bot.entityid && p.entityStatus == 24) {
      bot._cwc("/op @s[type=player]")
    }
  })
  bot.offpos=1
  bot.cspy==1;
  bot.int2=setInterval(()=>{
    if(bot.cspy==0){
      bot._cwc("/cspy on");
      bot.cspy=1;
    }
    if(bot.offpos){
      bot._cwc(`/tp ${bot.x} 100 ${bot.z}`)
      bot.offpos=0
    }
  },1500)
  bot.prefix="?";
  bot.cooldown=0;
  bot.logger=1;
  bot.command=(bot,name,cmd,uuid,confirm)=>{
    try{
      let _cmd=cmd.split(" ")[0].toLowerCase();
      if(!botcommands[_cmd]) return
      if(uuid!=="e23a69d2-809f-64b4-8d92-3ab9e0f28823"){
  if((botcommands[_cmd].confirm && !confirm)){
    bot.confirmq.push({n:name,c:cmd,U:uuid});
    bot._cwc("Awaiting confirmation, use "+bot.prefix+"confirm <admin-code> to confirm.")
    return;
  }
        if(Date.now()-bot.cooldown <= 3000 && !confirm) return;
        bot.cooldown=Date.now();
        if(!canRun(uuid,cmd)) return;
      }
      fs.appendFile(bot._server+'/cmd.log',getDateAndTime4L()+" "+name+" ("+uuid+") ran command "+cmd+"\n",function (err) {  if (err) throw err;  });
      botcommands[_cmd].command(bot,name,cmd,uuid); //bot._cwc(name+", commands are being worked on.")
    }catch(e){bot._cwc(e+"")}
  }
  bot.discordQueue=[];
  bot.disint=setInterval(()=>{
    try{
      if(bot.discordQueue.join("").replace(/[\x00-\x20\x7f-\x9f]/g,"").length==0) return;
      dbot.channels.cache.get(bridges[bot.index]).send(bot.discordQueue.join("\n").replace(/\@/g,"@\u200b").substr(0,1990))
      bot.discordQueue=[];
    }catch(e){}
  },3000)
  bot._115=_115;
  bot.on("chat",(packet)=>{
    try{
      const json=JSON.parse(packet.message);
      const conv=lang.tth(json);
      bot.discordQueue.push(conv[2]);
     if(!cooldownAternos){
    if(conv[2].match(/server\.pro|serv\.nu|1337src\.com|g\-s\.nu|mcnetwork\.me|mcpro\.io|my\-serv\.com|mygs\.co|mymcserver\.org|myserver\.gs|serv\.gs/i)){bot._cwc("/cc");bot._cwc("Dont join that server.");cooldownAternos=1}
    if(conv[2].match(/at[e\*][r\*][\*n]os/i)){
      if(conv[2].match(/at[e\*][r\*][n\*]os\.(me|host)/i) && !conv[2].match(/Aternos is shit!/)){
        bot._cwc("/cc")
        bot._cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        bot._cwc("Aternos is shit!")
        cooldownAternos=1
      }
    }else
    if(conv[2].match(/min[e\*]hut/i) && !conv[2].match(/Minehut is shit!/)){
      if(conv[2].match(/min[e\*]hut\.(gg)/i)){
        bot._cwc("/cc")
        bot._cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        bot._cwc("Minehut is shit!")
        cooldownAternos=1
      }
    }else
    if((conv[2].match(/windows/i) || conv[2].match(/microsoft/i)) && !conv[2].match(/Windows is shit!/)){
//      bot._cwc("Windows is shit!")
      cooldownAternos=1
    }else
    if(conv[2].match(/mac(-| |()|\.|_)os/i) && !conv[2].match(/macOS is shit!/)){
      bot._cwc("macOS is shit!")
      cooldownAternos=1
    }else
    if((conv[2].match(/(chrome|google)(-| |()|\.|_)os/i) || conv[2].match(/(chrome|google)(-| |()|\.|_)(b(it|ox|ook|ase)|pc|computer)/i) ) && !conv[2].match(/Chrome OS is shit!/) && !conv[1].match(bot.username)){
      bot._cwc("Chrome OS is shit!")
      cooldownAternos=1
    }else
    if(conv[2].match(/total(-| |()|\.|_)freedom/i) && !(conv[2].match(/TotalFreedom is shit!/))){
      if(conv[2].match(/play\.totalfreedom\.(me)/i)){
        bot._cwc("/cc")
        bot._cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        bot._cwc("TotalFreedom is shit!")
        cooldownAternos=1
      }
    }
    setTimeout(()=>{cooldownAternos=0;},1500)
  }
 if(conv[2].toLowerCase().includes("dsddassadsadfajhdfeavjhaewgfafsdcjnbmcefwrancafdsnafdscvdfncbvasdcfnmbvdfsxdvanmSVSnmbxvsDNvnbdSCVDNBMVDSVNBSDACVsADCVASDNBVASDCnSCDAvSDACNvSADCnmbSADCVmnbCSADviucc")){ return; }
      if(conv[2].startsWith("You are no lfsdafgasojsdghfkiasfcghzfxciksugsfdcjkasdgkjsfdhgasdfkjgdasfkjagjdkasfgadsfjkhgasdfjhsafdgjkhsdfagsdfajkhgsdfakjhsdafgkjhsdafgasdfjkhgdsfajhasdfgjkhdasfgsdjfahgasdfjkgsdfakjhfsdagjkhdfsagfdajskgafdsjkhgadfsjkhfdgasjkhfdsgafjsdhgadfsjkhgfsadjhfdsgajkhfasdgjfhsdaonger controlling \"IuCC\".")){bot._cwc("/icu control IuCC");return;}
      if(conv[2]=="The chat has been cleared") return;
      if(conv[2].match("Roizor")) return
      if(conv[2]=="") return;
      if(conv[2]=="Successfully disabled CommandSpy"){
        bot.cspy=0;
        return;
      }
      if(conv[2].match(/dsoig[0-9]\: \/op dsoig[0-9]/)){ bot._cwc("/deop "+conv[2].slice(0,6))}
      if(conv[2].match(/dsoig[0-9]/)) return;
        if(conv[1].endsWith("§6Vanish for "+bot.username+"§6: disabled")){
          setTimeout(()=>{bot.write("chat",{message:"/essentials:evanish on"})},50)
        }
      if(conv[2].includes(": "+bot.prefix)){
        let __cmd = conv[2].split(": "+bot.prefix);
        let name="";
        if(bot._115){
          name=conv[2].split(": "+bot.prefix)[0].split(" ").reverse()[0];
          for(var i in bot.P){
            if(bot.P[i].name===name){
              packet.sender=bot.P[i].UUID
            }
          }
        }
        __cmd.shift();
        const _cmd=__cmd.join(": "+bot.prefix);
        bot.command(bot,bot.P[packet.sender]?bot.P[packet.sender].name:name, _cmd, packet.sender)
      }
      bot.clqa.push(`[Chat/${bot.index}] ` + conv[0]);
      fs.appendFile(bot._server+"/chat.log",getDateAndTime4L()+" "+(conv[1]+"\n"),function (err) {if (err) throw err;})
    }catch(e){}
  })
  bot.chatq=["Version 4.0.0", "/cspy on","/v on"]
  bot.clqa=[];
  bot._cwc=function(msg){
    bot.chatq.push(msg.substr(0,256));
    if(msg.slice(256).length){
      bot._cwc(msg.slice(256))
    }
  };
  bot.chqm=()=>{
    if(bot.chatq[0] !== undefined){
      bot.write("chat",{message:bot.chatq[0]});
    }
    bot.chatq.shift();
    bot.timc=setTimeout(bot.chqm, 260)
  }
  bot.bel=0
  bot.timc=setTimeout(bot.chqm, 4000)
  bot.int1=setInterval(function(){
    if(bot.clqa.length){
      if(bot.logger){process.stdout.write("\x1b[2K");
      readline.cursorTo(process.stdout,0)
      if(bot.clqa[0].includes("TFTWPhoenix") &&bot.bel){
        process.stdout.write("\x07")
      }
      console.log("\x1b[0m\x1b[1m\x1b[37m"+bot.clqa[0])
      rl.prompt(true)}
      bot.clqa.shift();
    }
  },20)
  bot.on("end",()=>{
    console._log(`[Info] Bot ${bots.indexOf(bot)} has disconnected from server ${bot._server}.`)
    clearTimeout(bot.timc);
    clearInterval(bot.adint);
    clearInterval(bot.int1);
    clearInterval(bot.int2);
    setTimeout(()=>{createBot(bot._server)},5000)
  })
  bot.on("error",()=>{
  })

  bot.adint=setInterval(()=>{bot._cwc("My prefix is "+bot.prefix+", use "+bot.prefix+"help for help.")},300000)
  for(let i in bots){
    if(bots[i]._server==_server){
      bots[i].end();
      bots[i]=bot;
      bot.index=+i;
      return bot;
    }
  }
  bots.push(bot);
  bot.index=bots.indexOf(bot);
  return bot;
}
createBot("play.kaboom.pw:25565");
createBot("recyclebot.tech:25565");
//createBot("localhost:6004")
dbot.login("token removed")
