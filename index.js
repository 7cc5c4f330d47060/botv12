const mc = require("minecraft-protocol");
global.conf=require(process.cwd()+"/conf.json");
global.getDateAndTime4L=(a)=>{
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
const crypto=require("crypto");
const readline=require("readline");
global.fs=require("fs");
global.saymode=false;
global.P={};
global.confirmq=[];
global.loggerEnabled=1;
global.clqa=[];
let lang=require(process.cwd()+"/BotHelperScripts/LoggerHelper/index.js")
global._maestro=require(process.cwd()+"/BotHelperScripts/maestro.js")
cooldown=0;
let cmd_files=[]
cmd_files[0]=require(process.cwd()+"/Commands/Commands-1.inf");
cmd_files[1]=require(process.cwd()+"/Commands/Commands-2.inf");
global.commands={};
for(let i in cmd_files){
  for(let j in cmd_files[i]){
    if(!commands[j]){
      commands[j]=cmd_files[i][j]
      commands[j].fromFile=i;
    } else if (process.argv.includes("--force-conflicting-cmds") && !commands[j+"-"+i]) {
      console.error(`[Info] Conflicting command ${j} from command list ${i} is put in the command list as ${j}-${i}.`)
      commands[j+"-"+i]=cmd_files[i][j]
      commands[j+"-"+i].fromFile=i;
    } else if (process.argv.includes("--force-conflicting-cmds")) {
      let k = crypto.randomBytes(4).toString("hex");
      console.error(`[Warning] Command overlap detected with backup system. Conflicting command ${j} from command list ${i} is put in the command list as ${j}-${k}. Please consider renaming or removing this command.`)
      commands[j+"-"+k]=cmd_files[i][j]
      commands[j+"-"+k].fromFile=i;
    } else {
      console.error(`[Warning] Command overlap detected. Command ${j} from command list ${i} conflicts with command ${j} from command list ${commands[j].fromFile}. The conflicting command will be ignored. To force the conflicting command to be added to the full command list, run the script with argument "--force-conflicting-cmds".`)
    }
  }
}
for(let i in commands){
  if(commands[i].perms===undefined){
    console.error(`[Warning] Command ${i} does not have a permission level. Assigning permission level 0.`)
    commands[i].perms=0;
  }
}
p=require(process.cwd()+"/perms.json");
global.consoleOnly = conf.consoleOnly;
global.cmdid=[];
global.fullcmdid=[];
global.bots=[];
global.isMaestro=0;
global.noChatQueue=0;
global.javaUUID=(s)=>{
  const buffer = crypto.createHash('md5').update(s, 'utf8').digest()
  buffer[6] = (buffer[6] & 0x0f) | 0x30
  buffer[8] = (buffer[8] & 0x3f) | 0x80
  const fix=buffer.toString("hex");
  return fix.slice(0,8)+"-"+fix.slice(8,12)+"-"+fix.slice(12,16)+"-"+fix.slice(16,20)+"-"+fix.slice(20,32)
}
global.readlion = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "\x1b[0m\x1b[1m\x1b[37m> ",
  completer: L=>{
    try{let match=[];
    if(saymode && L.startsWith(".")){
      const cmd=L.slice(1);
      for(let i in commands){
        if(i.startsWith(cmd)){
          match.push("."+i)
        }
      }
      if(("exit").startsWith(cmd)){match.push(".exit")}
    } else {
      for(let i in commands){
        if(i.startsWith(L)){
          match.push(i)
        }
      }
    }
    return [match.length?match:[""],L];
    }catch(e){
      return [[L],L]
    }
  }
});
readlion.on("line",function(l){
  try{
    if(!saymode){
      global.command(conf.owner,l,true,"11111111-1111-5111-1111-111111111111");
    } else if(l==".exit"){
      saymode=0
    } else if(l.startsWith(".")){
      global.command(conf.owner,l.slice(1),true,"11111111-1111-5111-1111-111111111111");
    } else {
      cwc(l)
    }
  }catch(e){
    console.log(e)
  }
  readlion.prompt(false)
});
readlion.prompt(false);
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
if(conf.useConfName){
  _username=conf.confName
} else {
  _username="\xa7"+Math.floor(Math.random()*16).toString(16)+funnies(3)+"\xa7"+Math.floor(Math.random()*16).toString(16)+funnies(3);
}
global.adminCode=crypto.randomBytes(96).toString("hex");
global.bot=mc.createClient(
  {
    host:conf.server,
    port:conf.port,
    version:conf.mcversion,
    username: _username,
   }
);

global.lockBots = [];
global.lock = (uuid)=>{
  if(lockc){
    return;
  };
  global.lockc=1;
  setTimeout(()=>{global.lockc=0},2000)
  try{lockBots[uuid] = mc.createClient({
    host: conf.server,   
    port: conf.port,    
    version: "1.14.4", 
    username: "Lock_"+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+"",
  });
  let name="LOCK"+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16);
  setTimeout(function(){lockBots[uuid].write("chat",{message:'/setblock ~ 15 ~ minecraft:command_block{Command:"/sudo '+uuid+' v off",auto:1b} destroy'})},1500);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/execute as "+uuid+" run deop @s[type=player]"})},2000);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/icu control "+uuid})},2500);
  }catch(e){
    console.log(e)
  }
}

prefix=conf.prefix;
global._chatQueue=[
  `Version ${conf.version}`,
  //"My prefix is "+prefix+", use "+prefix+"help for help.",
  "/bard",
  "/v on",
  "/gamemode spectator",
  "/prefix off",
  "/nick off",
  "/cspy on",
  "/god on"
];
global.chatQueue=global._chatQueue;
setInterval(function(){
  global.cwc("My prefix is "+prefix+", use "+prefix+"help for help.")
},900000) //15 minutes
chqm=function(){
  if(chatQueue[0]!==undefined && !noChatQueue){
    global.bot.write("chat",{message:chatQueue[0].substr(0,256)})
    chatQueue.shift();
  }
  setTimeout(chqm,conf.chqs)
}
setTimeout(chqm,5000)
setTimeout(function(){bot.write("chat",{message:"/op @s[type=player]"})},2750)
setTimeout(function(){bot.write("chat",{message:"/mute "+botuuid+" 0s"})},3000)
global.cwc=function(a){
  chatQueue.push(a.substr(0,256))
  if(a.slice(256).length){
    cwc(a.slice(256))
  }
}

let cursor = [0,0];
process.stdin.on("data",function(A){
  let B=A.toString("utf8");
  if(B.startsWith("\x1b[")){
    cursor=[+(B.slice(2).split(";")[0]),+(B.slice(2).split(";")[1])]
  }
})

setInterval(function(){
  if(clqa.length){
    if(loggerEnabled){
      process.stdout.write("\x1b[2K");
      readline.cursorTo(process.stdout,0)
      console.log("\x1b[0m\x1b[1m\x1b[37m"+clqa[0])
      readlion.prompt(true)
    }
    clqa.shift();
  }
},10)
global.tfcount=+fs.readFileSync("./totalfreedom_streak");
global.cooldownAternos=0;
global.cspyon=0;
global.renamed=1;
global.muted=0
setInterval(()=>{if(!cspyon){cwc("/c on");cspyon=1;}},2500)
setInterval(()=>{if(muted){
          global.chatQueue.unshift("")
          global.chatQueue.unshift("")
          global.chatQueue.unshift("")
	  global.chatQueue.unshift("/mute "+botuuid+" 0s")
          noChatQueue=0;
          muted=0;
}},2500)
const rh = function(){return Math.floor(Math.random()*16).toString(16)}
setInterval(()=>{
  if(!renamed){
    setTimeout(()=>{_username="§"+rh()+rh()+"§"+rh()+rh()+"§"+rh()+rh()+"§"+rh()+rh()+"§"+rh()+rh();cwc("/username "+_username.replace(/§/g,"&"));cwc("a");},2000);
    setTimeout(()=>{renamed=1},2500);
  }
},2500)
let lastmsg = "";
let msgcount=0;
bot.on("chat",function(pack2){
  pack={message:JSON.parse(pack2.message)}
  let conv=lang.tth(pack.message);
  if(conv[2].startsWith("Successfully set your username to \"")){
    global.renamed=0;
    return;
  }
  if(msgcount > 100){
    if(lastmsg != pack2.message){
      msgcount--;
    } else {
      return;
    }
  } else if(lastmsg == pack2.message){
    msgcount++
  } else {
    msgcount--;
    if(msgcount<0){msgcount=0}
  }
  lastmsg = pack2.message;
  if(conv[2]=="") return
  if(conv[1]=="\xa72The chat has been cleared") return
  if(conv[1].endsWith('\xa7b: /setblock ~ 0 ~ command_block{Command:"sudo ** kaboom",auto:1b} destroy')) {
    return;
  }
  let uuid="11111111-1111-1111-1111-111111111111";
  if(conv[1].match(/\xa7[0-9a-f]\xa7k(\n|.){3}\xa7[0-9a-f]\xa7k(\n|.){3}/)){
    return;
  }//s(([ck]ript kid(die|()))|kid(die|()))
  if(conv[1].endsWith("§7Join the official unofficial §\xa72Kababoom Community Discord§7 at §c« §b§nhttps://discord.gg/jwmbpAB§c »")){ return
    if(Math.random<=0.05){
      cwc("nobody thats admin in that discord is a kaboom admin. still join it: https://discord.gg/jwmbpAB")
    }
  }
  
  if(!cooldownAternos){
    if(conv[2].match(/server\.pro|serv\.nu|1337src\.com|g\-s\.nu|mcnetwork\.me|mcpro\.io|my\-serv\.com|mygs\.co|mymcserver\.org|myserver\.gs|serv\.gs/i)){cwc("/cc");cwc("Dont join that server.");cooldownAternos=1}
    if(conv[2].match(/at[e\*][r\*][\*n]os/i)){
      if(conv[2].match(/at[e\*][r\*][n\*]os\.(me|host)/i) && !conv[2].match(/Aternos is shit!/)){
        cwc("/cc")
        cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        cwc("Aternos is shit!")
        cooldownAternos=1
      }
    }else
    if(conv[2].match(/min[e\*]hut/i) && !conv[2].match(/Minehut is shit!/)){
      if(conv[2].match(/min[e\*]hut\.(gg)/i)){
        cwc("/cc")
        cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        cwc("Minehut is shit!")
        cooldownAternos=1
      }
    }else
    if(conv[2].match(/windows/i) && !conv[2].match(/Windows is shit!/)){
      cwc("Windows is shit!")
      cooldownAternos=1
    }else
    if(conv[2].match(/mac(-| |()|\.|_)os/i) && !conv[2].match(/macOS is shit!/)){
      cwc("macOS is shit!")
      cooldownAternos=1
    }else
    if((conv[2].match(/chrom(e|ium|())(-| |()|\.|_)os/i) || conv[2].match(/(chrome|googl(e|()))(-| |()|\.|_)(b(it|ox|ook|ase)|pc|computer)/i) ) && !conv[2].match(/Chrome OS is shit!/)){
      cwc("Chrome OS is shit!")
      cooldownAternos=1
    }else
    if(conv[2].match(/total(-| |()|\.|_)freedom/i) && !(conv[2].match(/TotalFreedom is shit!/))){
      if(conv[2].match(/play\.totalfreedom\.(me)/i)){
        cwc("/cc")
        cwc("Dont join that server.")
        cooldownAternos=1
      } else {
        cwc("TotalFreedom is shit!")
        cooldownAternos=1
      }
    }
    setTimeout(()=>{cooldownAternos=0;},1500)
  }
  if(conv[2].match(/total(-| |()|\.|_)freedom/i) && !(conv[2].match(/TotalFreedom is shit!/))){
    if(tfcount>=75){
      //cwc("why would you say that? we went "+tfcount+" messages without saying it.")
      fs.writeFileSync("./totalfreedom_streak","0")
      let tfstreakfile = +fs.readFileSync("./max_totalfreedom_streak");
      if(tfcount>tfstreakfile){
        fs.writeFileSync("./max_totalfreedom_streak",tfcount+"")
      }
      fs.appendFile("./totalfreedom_log",getDateAndTime4L()+" "+tfcount+" messages\n",()=>{})
      tfcount=0;
    }
  } else {
    tfcount++
  }
  let processed = conv[0];
  let fileprocessed = conv[1];
  let ir = conv[2];
  if(conv[1].includes("has muted player "+_username) && !fileprocessed.includes("has muted player "+_username+"\u00a76 for\u00a7c now\u00a76.")){
    noChatQueue=1;
    muted=1;
  }
  if(fileprocessed.endsWith("§6Vanish for "+_username+"§6: disabled")){
      setTimeout(()=>{global.bot.write("chat",{message:"/essentials:evanish on"})},50)
  }
  if(fileprocessed.endsWith("§6Your nickname is now "+_username+"§6.")){
      cwc("/nick off")
  }
  if(fileprocessed==("Successfully disabled CommandSpy")){
    global.cspyon=0;
    return;
  }
  let isGreater = 0;
  
  if(P[pack2.sender]){
    name=P[pack2.sender].name;
  } else {
    name=""
  }
  uuid=pack2.sender;
  if(false){
    for(let i2a in jsonMsg.extra){
      if(jsonMsg.extra[i2a]){
        if(jsonMsg.extra[i2a].text){
          if(jsonMsg.extra[i2a].text.slice(0,2)==": " || jsonMsg.extra[i2a].text.slice(0,2)=="> "){
            if(jsonMsg.extra[i2a].text.slice(0,2)=="> "){isGreater=1;}
            if(jsonMsg.extra[i2a-1]){ 
              if(ir.includes(": "+global.prefix) || ir.includes("> "+prefix)){
                try{
                  if(ir.indexOf("]")+1 && (ir.indexOf("]")!=ir.indexOf("] ["))){ 
                    testname=ir.slice(ir.indexOf("]")+2).split(": ")[0];
                  } else if(isGreater && ir.indexOf("<")==0) {
                    testname=ir.slice(1).split("> ")[0];
                  } else {
                    testname = jsonMsg.extra[i2a-1].text
                  }
                }catch(e){}
                let preName = jsonMsg.extra[i2a-1].text;
                if(testname){
                  preName=testname
                };
                let ses="";
                //name="The name thing is being worked on.";
                for(let i33 in preName.split("\u00a7")){
                if(i33==0 && !preName.split("\u00a7")[i33].startsWith("\u00a7")  || !preName.split("\u00a7")[i33].slice(0,1).match(/[0-9a-fk-or]/)){
                  ses+=preName.split("\u00a7")[i33];
                }
                else
                {
                  ses+= preName.split("\u00a7")[i33].slice(1);}
                }
                for(let i22 in P){
                  let gn="";
                  for(let i33 in (P[i22].name+"").split("\u00a7")){
                    if((i33==0 && !P[i22].name.split("\u00a7")[i33].startsWith("\u00a7")) || !P[i22].name.split("\u00a7")[i33].slice(0,1).match(/[0-9a-fk-or]/)){
                      gn+=P[i22].name.split("\u00a7")[i33];
                    }
                    else
                    {
                      gn+= P[i22].name.split("\u00a7")[i33].slice(1);}

                    }
                    if(gn==ses){break;}
                  }
                break
              }
            }
          }
        }
      }
    };
    nf=1;
  }
  if(false){
  if(jsonMsg.translate) {
    if(jsonMsg.translate.startsWith("chat.type.") || jsonMsg.translate=="commands.message.display.incoming") {
      try{
        name = jsonMsg.with[0].text+"";
        if(jsonMsg.with[1].text){
          text2 = jsonMsg.with[1].text+"";
        } else {
          text2 = jsonMsg.with[1]+"";
        }
      }catch(e){};
  }}}
  let preText = conv[2].split([": ","> "][isGreater])
  let pt2 = preText[0]
  let preTextFirst = preText.shift();
  let text2 = preText.join([": ","> "][isGreater]);
  if(text2.startsWith(global.prefix)){
    if(!cooldown){
      try{
        CD(name,text2.slice(global.prefix.length),false,uuid);
        fs.appendFile('Command Log.txt',global.getDateAndTime4L()+" "+name+" ("+uuid+") ran command "+text2+"\n",function (err) {  if (err) throw err;  });    
      }catch(e){cwc(e+"")}
      cooldown=1;
      setTimeout(()=>{cooldown=0},2000)
    }
  }
  fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {if (err) throw err;});
  clqa.push(conv[0]);
})


perms=(n)=>{
  if(p[n]){
    return p[n][0];  }
  return 0;
}
role=(n)=>{
  if(p[n] && p[n][1]){
    return p[n][1]
  }
  return "User"
}
global.bit=function bit(number,index){
  if(number!==undefined){
    return (Array(4-number.toString(2).length).fill("0").join("")+number.toString(2))[index]=="1";
  } else {
    return false
  }
}
global.wl={
  maniaplay:{
    "*":2
  }
};
global.bl={};
//wl 0: normal
//wl non-zero: bypass insufficient permissions
//wl 2: bypass console only mode if consoleOnly does not end with .5
//wl 3: bypass console only commands if commands console only value is not 2
//wl 4: bypass confirmation

//wl/bl format: wl[name][cmd | *]=value

//bl 0: normal
//bl 1: blacklisted

//bl overrides wl values except 2 and 3
global.command=function(name,cmd,console,uuid,confirm){
  const truecmd=cmd.split(" ")[0].toLowerCase();
  if(!commands[truecmd]){
    return;
  }
  if(wl[name] && (bit(wl[name][truecmd],0) || bit(wl[name]["*"],0))) confirm=1;
  if(console){
    commands[truecmd].command(name,cmd,console);
    return;
  }
  if(consoleOnly && !(wl[name] && (bit(wl[name][truecmd],2) || bit(wl[name]["*"],2)) && consoleOnly-Math.floor(consoleOnly)!==0.5)) {
    if(consoleOnly>=2){
      cwc("Console only mode is enabled.")
      return;}
  }
  if(commands[truecmd].console && !(wl[name] && (bit(wl[name][truecmd],1) || bit(wl[name]["*"],1))) || commands[truecmd].console===2) {
    cwc(prefix+truecmd+" may only be run from console.");
    return
  }
  if(bl[name] && bl[name][truecmd]){
    cwc(`${name}, you are not allowed to run ${prefix}${cmd}.`);
    return;
  }
  if((commands[truecmd].confirm && !confirm)){
    confirmq.push({n:name,c:cmd,U:uuid});
    cwc("Awaiting confirmation, use "+prefix+"confirm <admin-code> to confirm.")
    return;
  }
  if((perms(name)>=commands[truecmd].perms) || (wl[name] && (bit(wl[name][truecmd],3) || bit(wl[name]["*"],3)))){
    commands[truecmd].command(name,cmd,console,uuid)
  }
}
global.CD=global.command;
global.countdown=1;
global.packetc=40;
setInterval(function(){
  packetc--;
  if(packetc<=0){
    process.exit(1)
  }
  if(packetc<=15 && countdown){
    console.log(packetc)
  }
},1000)
global.on={};
global.seen={};
for(let i=0;i<=15;i++){
  let j=i.toString(16);
  try{
    global.seen[j]=require(process.cwd()+"/seen/seen_"+j+".json")
  } catch(e){
    try{
      global.seen[j]=require(process.cwd()+"/seen/seen_"+j+"_backup.json")
    }catch(e){
      try{
        console.error(`[Warning] Seen database for UUIDs beginning with \"${j}\" has been corrupted.`)
        require("child_process").execSync(`cp ./seen/seen_${j}.json ./seen_corrupted/seen_${j}_${Date.now()}.json`)//fuck windows
        console.log
        let _data=fs.readFileSync(process.cwd()+"/seen/seen_"+j+".json")
        fs.writeFileSync(process.cwd()+"/seen/seen_"+j+".json",_data.slice(0,-1))
        process.exit(8)
      } catch(e){
        //console.error(`[Warning] Seen database for UUIDs beginning with \"${j}\" is possibly unrepairable.
      }
    }
  }
}
global.getSeen=(t)=>{
  if(seen[t[0]] && seen[t[0]][t]){
    return seen[t[0]][t];
  }
  for(let i in seen){
    if(seen[i][t]){
      return seen[i][t];
    } else {
      for(let j in seen[i]){
        if(seen[i][j][1]===t){
          return seen[i][j]
        }
      }
    }
  }
  return [-1,""]
}
global.setSeen=(t,s)=>{
  if(s[1]){
    if(s[1].match(/[\x00-\x1f]/)){
      return;
    }
  }
  seen[t[0]][t]=s;
  fs.writeFile("seen/seen_"+t[0]+".json",JSON.stringify(seen[t[0]]),()=>{})
  fs.writeFile("seen/seen_"+t[0]+"_backup.json",JSON.stringify(seen[t[0]]),()=>{})
}
let LockList = ["0b9e7389-db90-3554-87f3-4e4f984e68e6"];
bot.on("player_info",function(packet) {
  try{
  for(let i1c in packet.data){
    if(packet.action==0){
      global.P[packet.data[i1c].UUID]=packet.data[i1c];
      global.on[packet.data[i1c].UUID]=true;
      if(packet.data[i1c].name==conf.autolock){
        chatQueue.unshift("/icu control "+conf.autolock)
      }
      if(packet.data[i1c].name.match(/\xa7[0-9a-f]\xa7k(\n|.){3}\xa7[0-9a-f]\xa7k(\n|.){3}/)){
        cwc("/mute "+packet.data[i1c].UUID+" 10y")
      }
      fs.appendFile('Kaboom Join Leave Log.txt',global.getDateAndTime4L()+" "+global.P[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") joined or unvanished.\n",()=>{})
      //console.log(packet.data[i1c].name)
      //setSeen(packet.data[i1c].UUID,[Date.now(),global.P[packet.data[i1c].UUID].name])
      //fs.writeFile("lastSeen.json",JSON.stringify(seen),()=>{})
    } else if(packet.action==1){
      fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" "+global.P[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") went to "+["Survival","Creative","Adventure","Spectator"][packet.data[i1c].gamemode]+"\n",()=>{})
    } else if(packet.action==2){global.on[packet.data[i1c].UUID]=true;
    } else if(packet.action==3){global.on[packet.data[i1c].UUID]=true;
    } else if(packet.action==4){global.on[packet.data[i1c].UUID]=true;
      setTimeout(()=>{if(LockList.includes(packet.data[i1c].UUID) && on[packet.data[i1c].UUID] && !lockBots[packet.data[i1c].UUID]){
        //lockBots[packet.data[i1c].UUID].end();
        //lockBots[packet.data[i1c].UUID]=0;
      }},100)
      global.on[packet.data[i1c].UUID]=false
      fs.appendFile('Kaboom Join Leave Log.txt',global.getDateAndTime4L()+" "+(function(){try{return global.P[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+")"}catch(e){return packet.data[i1c].UUID}})()+" left or vanished.\n",()=>{});
      //setSeen(packet.data[i1c].UUID,[Date.now(),global.P[packet.data[i1c].UUID].name]);
      //fs.writeFile("lastSeen.json",JSON.stringify(seen),()=>{})
    } 
  }  
  }catch(e){}
})
global.botuuid = bot.uuid;
bot.on('login', p=>{
  if(p.entityId){
    global.bot.write("chat",{message:"/icu control tyr1402"})
    global.entityid=p.entityId
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+` The bot has logged in (entity id ${entityid}).\n`,()=>{})
  }
})
bot.on('success', p=>{
  botuuid=bot.uuid
  //bot.write("chat",{message:"/tp ~ ~ ~100000"})
  //setTimeout(()=>{bot.write("chat",{message:"/setworldspawn"})},200)
  global.bot.write("chat",{message:"/"+["vanish","evanish","v","ev","essentials:vanish","essentials:evanish","essentials:ev","essentials:v"][Math.floor(Math.random()*8)]+" on"})
})

bot.on('game_state_change', p=>{
  if(p.reason==1){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" End raining\n",()=>{})
  } else if(p.reason==2){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" Begin raining\n",()=>{})
  } else if(p.reason==3){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" Change gamemode -> "+["Survival","Creative","Adventure","Spectator"][p.gameMode]+"\n",()=>{})
    if(p.gameMode!=3){
      cwc("/gamemode spectator")
    }
  } else if(p.reason==4){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" Win game -> "+["Just respawn player","Roll the credits and respawn player"][p.gameMode]+"\n",()=>{})
  } else if(p.reason==6){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" Arrow hit player\n",()=>{})
  } else if(p.reason==10){
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" Play elder guardian mob appearance (effect and sound)\n",()=>{})
  }
})
bot.on('entity_status', p=>{
  if(p.entityId==global.entityid && p.entityStatus == 24) {
    cwc("/op @s[type=player]")
    fs.appendFile('Other Log.txt',global.getDateAndTime4L()+" The bot has been deopped.\n",()=>{})
  }
})
global.botEvents={};
global.setslotsin1s = 0;
setTimeout(()=>{bot.on('set_slot', (data)=>{
  setslotsin1s++;
  setTimeout(()=>{setslotsin1s--},1000)
})},2000)
bot.on('packet', (data, meta)=>{
  packetc=30;
})
global.stopped=0;
bot.on("end",(()=>{
  if(!stopped){
    process.exit(7)
  }
}))

fs.readFile(".nojoin",(e,d)=>{
  if(e){
    console.log(e)
  } else {
    if(d!="0"){
      process.reallyExit(0)
    }
  }
})

global.icusIn30m = 0;
bot.icuDetector = [ 0, 0 ];
bot.on(`position`, function(data, packetMeta) {
  bot.icuDetector[0] = data.teleportId;
});
setInterval(()=>{
  //var difference = bot.icuDetector[0] - bot.icuDetector[1];
  if(setslotsin1s > 300){
    icusIn30m++;
    setTimeout(()=>{icusIn30m--},1800000)
    if(icusIn30m>=20){
      fs.appendFileSync(".nojoin","1");
      process.exit(4);
    } //im probably going to see .nojoin tomorrow [jan 9 2021]
    console.log("The bot is being icu controlled. Relogging...")
    setslotsin1s = 0;
    global.botEvents = global.bot._events;
    global.bot.end();
    global.noChatQueue=1;
    global.chatQueue=global._chatQueue=[
      "Relogged due to ICU.",
      `Version ${conf.version}`,
      //"My prefix is "+prefix+", use "+prefix+"help for help.",
      "/bard",
      "/v on",
      "/gamemode spectator",
      "/prefix off",
      "/nick off",
      "/cspy on",
      "/god on"
    ]
    setTimeout(()=>{
      global.bot=mc.createClient(
        {
          host:conf.server,
          port:conf.port,
          version:"1.15.2",
          username: "\u00a7"+Math.floor(Math.random()*16).toString(16)+"\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0008","\u0009","\u007f","\u000b","\u000c","\u000d","\u000e","\u000f"][Math.floor(Math.random()*8)]+["\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017"][Math.floor(Math.random()*8)]+["\u0018","\u0019","\u001a","\u001b","\u001c","\u001d","\u001e","\u001f"][Math.floor(Math.random()*8)]+"   ",
        }
      );
      global.bot._events.chat=global.botEvents.chat;
      global.bot._events.player_info=global.botEvents.player_info;
      global.bot._events.login=global.botEvents.login;
      global.bot._events.game_state_change=global.botEvents.game_state_change;
      global.bot._events.entity_status=global.botEvents.entity_status;
      setTimeout(()=>{global.bot._events.set_slot=global.botEvents.set_slot;},2000)
      global.bot._events.packet=global.botEvents.packet;
      global.botuuid = javaUUID("OfflinePlayer:"+bot.username);
    },6000)
    setTimeout(()=>{bot.write("chat",{message:"/op @s[type=player]"})},8750)
    setTimeout(()=>{bot.write("chat",{message:"/mute "+botuuid+" 0s"})},9000)
    setTimeout(()=>{global.noChatQueue=0;},11000)
  } else if (setslotsin1s!=0 && setslotsin1s!=37 && setslotsin1s!=-37) {
    bot.write("chat",{message:"/ci"})
    setTimeout(()=>{setslotsin1s=0},750)
  }
  //bot.icuDetector[1] = bot.icuDetector[0];
},1000) // anti icu
for(let i in commands){
  if(!commands[i].hidden){
    cmdid.push({h:commands[i].h,u:commands[i].u,n:i})
  }
  fullcmdid.push({h:commands[i].h,u:commands[i].u,n:i})
}
setTimeout(()=>{
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });  
},3000)
_x=0;

require("./BotHelperScripts/postinit.js")();
//phibots 2b2t thing cool so i add it
global.c2=new require("net").Socket().connect(41050,"127.0.0.1",()=>{})
c2.on("data",(x3)=>{
  if(x3[0]==4){
    commands.restart.command();
  }
})
