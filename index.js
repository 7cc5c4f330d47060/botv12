//0% Skidded™
//the parts that are are stated
const startms=Date.now();
const m = require("minecraft-protocol");
//let bots=[];
const servers=require("./servers.json");
let things={};
things.bots=[];
const fs=require("fs")
global.loadplug=()=>{
  let botplug=[];
  let bpl=fs.readdirSync("plugins")
  for(var i in bpl){
    if(!bpl[i].endsWith(".js")){
      continue
    }
    try{
      botplug.push(require(`./plugins/${bpl[i]}`));
    }catch(e){console.log(e)}
  }
  botplug.forEach((plug)=>{
    try{
      plug.load(things)
      console.log(`[Info] Loaded ${plug.description}`)
    }catch(e){console.log(e)}
  })
}
global.loadplug();
things.createBot=(server,port,options)=>{
  things.randomstring=()=>{
    let out="";
    for(let i=0;i<=5;i++){
      out+=String.fromCharCode(Math.floor(Math.random()*26)+96)
    }
    return out
  }
  let bot=m.createClient({
//    username:"U\x00\x00amedBot v\xa766",
    auth: !options.om?"mojang":"microsoft",
    username:!options.om?things.randomstring():"Email removed",
    password:!options.om?false:"Password removed",
    host:server,
    port:port
  })
  bot.on("error",(e)=>{
    console.log(e)
  })
  //idk if this is anywhere else
  bot.botopt=options
  bot.host=server
  bot.port=port
  bot.loadbotplug=()=>{
    let botplug=[];
    let bpl=fs.readdirSync("botplugins")
    for(var i in bpl){
      if(!bpl[i].endsWith(".js")){
        continue
      }
      try{
        botplug.push(require(`./botplugins/${bpl[i]}`));
      }catch(e){console.log(e)}
    }
    botplug.forEach((plug)=>{
      plug.load(bot,things)
      console.log(`[Info] Loaded ${plug.description}`)
    })
  }
  bot.loadbotplug();
  return bot
}
servers.forEach(function(server){
  let bot=things.createBot(server.host,server.port,server.opt)
  things.bots.push(bot)
  bot.index=things.bots.indexOf(bot)
})  
console.log("started in "+(Date.now()-startms)+" milliseconds")
