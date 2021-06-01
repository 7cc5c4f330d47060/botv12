const fs=require("fs")
const crypto=require("crypto")
const translate = require('@vitalets/google-translate-api');
const virus = require('@freezegold/covid-19');
module.exports={
  help:{
    command:(bot,name,cmd,uuid)=>{
      const args = cmd.split(" ");
      if(args[1] !== undefined && botcommands[args[1]]){
        bot._cwc(`&r ${bot.prefix}${args[1]}${!botcommands[args[1]].u?"":" "+botcommands[args[1]].u}: ${botcommands[args[1]].h}`)
//        bot._cwc(`Usage: &r ${bot.prefix}${args[1]} ${botcommands[args[1]].u}`)
        return;
      } else if(args[1] !== undefined){
        bot._cwc("Unknown command "+args[1])
        return;
      }
      let c=[];
      for(var i in botcommands){
        c.push(["&c","&a"][+canRun(uuid,i)]+bot.prefix+i);
      }
      bot._cwc("&bCommands &7- "+c.join(" "));
    },
    perms: 0,
    h: "XDDDD",
    u: "[command]"
  },
  servers:{
    command:(bot,name,cmd,uuid)=>{
      //bot._cwc("&7Current connected servers:")
      for(var i in bots){
//        bot._cwc("&d"+bots[i]._server.replace(/\:/g,"&7:&b"))
      }
    },
    perms:0,
    h: "Get a list of the servers that the bot is connected to",
    u: ""
  },
  confirm:{
    command: (bot,n,c,U)=>{
      const C=(perms(U)==11)
      let args=c.split(" ");
      if(C){
        bot.clqa.push("The current admin code is: "+bot.adminCode);
        if(args[1]=="_SAYCODE"){
          bot._cwc("The current admin code is: "+bot.adminCode);
          return;
        } else if(args[1]=="_CONFIRM"){
          bot.command(bot,bot.confirmq[0].n,bot.confirmq[0].c,bot.confirmq[0].U,true);
          bot.confirmq.shift();
          return;
        } else if(args[1]=="_DENY"){
          bot._cwc("Action denied.")
          bot.confirmq.shift();
          return;
        }
      }
      if(args[1]===undefined) {
        if(bot.confirmq[0]===undefined) { 
          bot._cwc("No actions awaiting confirmation.")
        } else {
          bot._cwc(bot.confirmq.length+" action"+["","s"][bot.confirmq.length-1]+" awaiting confirmation.")
        }
      } else if((args[1])==bot.adminCode) {
        if(args[2] !== "deny"){
          bot.command(bot,bot.confirmq[0].n,bot.confirmq[0].c,bot.confirmq[0].U,true);
        } else {
          bot._cwc("Action denied.")
        }
        bot.confirmq.shift();
        bot.adminCode=crypto.randomBytes(96).toString("hex");
      } else {
        bot._cwc("Incorrect code.")
      }
    },
    perms: 1,
    h: "Confirm an admin action with a code"
  },
  perms:{
    command:(bot,name,cmd,uuid)=>{
      bot._cwc(`${name}, you have perm level ${perms(uuid)} (${role(uuid).join(", ")}).`)
      bot._cwc(`You are in the groups: ${t(uuid).join(", ")}`)
    },
    perms:0,
    h: "Get your permission level",
    u: ""
  },
  netmsg:{
    command:(bot,name,cmd,uuid)=>{
      for(var i in bots){
  //      if(bots[i]._server==bot._server) continue;
        if(cmd.split(" ")[1] === undefined){ return; }
        bots[i]._cwc(`&b${name}&d says&7: &d${cmd.slice(7)}`)
      }
    },
    perms:0,
    h: "Send a message to all servers the bot is on",
    u: "<message>"
  },
  /*chromebook:{
    command:(bot,name,cmd,uuid)=>{
      const chrbook=require("./chromebook.json");
      bot._cwc(chrbook[Math.floor(Math.random()*chrbook.length)])
    },
    h:"Chrome OS, or ChromeOS, is a very bad OS made by Google.",
    u:""
  },*/
  msg:{
    command: (bot,n,c,uuid)=>{
      const args=c.split(" ");
      let flag = "";
      if(args[1].startsWith("-")){
        flag=args[1].slice(1,args.length)
        args.shift();
      }
      args.shift();
      let file;
      if(flag.includes("r")){
        if(!hasPN(uuid,"_bot.command.msg.rootfs")){
          bot._cwc("Only console is allowed to access other files.")
          return;
        }
        file=args.join(" ");
      } else {
        file="./Commands/messages/"+args.join(" ");
      }
      if(file.includes("../") && !hasPN(uuid,"_bot.command.msg.parentdir")){
        bot._cwc("Only console is allowed to access files in parent directories. No files in the messages folder have \"..\" in their name.")
        return;
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
            d=d.split("\xa7").join("&")
          }
          if(flag.includes("R")){
            d=d.split("\xa7").join("")
          }
          let __chatQueue=d.split("\n")
          for(var i in __chatQueue){
            bot._cwc(__chatQueue[i])
            //console.log(19)
          }
        }
        bot.chatq.unshift("&7Now reading file &d"+file+"&7 to chat")
      })
    }
  },
  uuid:{
    command:(bot,name,cmd,uuid)=>{
      bot._cwc(`&d${name}&7, your UUID is &b${uuid}&7.`);
    },
    perms:0
  },
  quad:{
    command:(bot,name,cmd,uuid)=>{
      bot._cwc("quad is shit")
    }
  },

  rtp:{
    command:(bot,n,c,uuid)=>{ //v3
      var args=c.split(" ");
      var range=1000000
      if(args[1]){
        range=+(args[1]);
      }
      const x=Math.floor(Math.random()*(range*2)-range);
      const z=Math.floor(Math.random()*(range*2)-range);
      bot._cwc("/setblock ~ 69 ~ command_block{Command:\"/tp "+uuid+` ${x} 100 ${z}",auto:1b} destroy`);
    },
    perms: 0,
    h: "Teleport to a random location",
    u: "[range]"
  },
  ip: {
    command(bot,n,c,uuid){
      //require('crypto').createHash('md5').update(data).digest("hex");
      var ___h=crypto.createHash('sha512').update((c.slice(3))+bot._server).digest("hex");
      var ___j=[parseInt([___h[0],___h[1]].join(""),16),parseInt([___h[3],___h[2]].join(""),16),parseInt([___h[4],___h[5]].join(""),16),parseInt([___h[7],___h[6]].join(""),16)]
      var ___i=[(___j[0]+27)%256,(___j[1]+93)%256,(___j[2]+248)%256,(___j[3]+77)%160]
      bot._cwc((c.slice(3)).slice(0,50)+"'s IP address is "+___i.join(".")+".")

    },
    perms: 0,
    h: "Get somebody's IP address",
    u: "<username>"
  },
  hexman:{
    command:(bot)=>{
      bot._cwc("the owner (of the bot) is hexman (ed91e0e5b19763c8).")
    }
  },
  eval:{
    command: (bot,n,c,C)=>{
      try{
        bot._cwc(""+eval(c.slice(5)))
      }catch(e){
        bot._cwc(""+e)
      }
    },
    hidden: 1,
    console: 2
  },
  translate:{
  command:(bot,name,c)=>{try{
        translate(c.slice(c.split(" ")[1].length+c.split(" ")[2].length+11), { from: c.split(" ")[1], to: c.split(" ")[2] }).then(a=>{bot._cwc(a.text)}).catch(()=>{});
  }catch(e){}}
},
  covid:{
    command:(bot,name,cmd,uuid)=>{
      const args=cmd.split(" ");
      virus.covid(args[1],(err,res)=>{
        if(err) {bot._cwc(err);return};
        bot._cwc("Confirmed: "+res.confirmed)
        bot._cwc("Deaths: "+res.deaths)
        bot._cwc("Recovered: "+res.recovered)
      })
    },
    h:"fuck u iucc. get covid cases count and stuff"
  },
  echo:{
    command:(bot,name,cmd,uuid)=>{
      var pre="&r";
      if(hasPN(uuid,"_bot.command.echo.raw")){
        pre=""
      }
      bot._cwc(pre+cmd.slice(5).substr(0,250))
    },
    h:"Make the bot say something"
  },
  relog:{
    command:(bot,name,cmd,uuid)=>{
      bot.end()
    },
    h:"Relog the bot",
    confirm:1
  },
  block:{
    command:(bot,name,cmd,uuid)=>{
      const args=cmd.split(" ");
      if(args.length==1) return;
      _perms[args[1]]=[-1,[],"",[]]
      bot._cwc("Successfully blocked "+args[1])
    },
    h:"Block a user from running bot commands",
    u:"<UUID>",
    confirm:1
  }

}
