module.exports=(uuid)=>{
  try{lockBots[uuid] = global.mc.createClient({
    host: conf.server,   
    port: conf.port,    
    version: conf.version, 
    username: "\u00a7o\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+["\u0000","\u0001","\u0002","\u0003","\u0009","\u0005","\u0006","\u0012"][Math.floor(Math.random()*8)]+"   ",
  });
  global.lclock=true;
  setTimeout(function(){global.lclock=false},4500)
  var name="LOCK"+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16)+Math.floor(Math.random()*16).toString(16);
  setTimeout(function(){lockBots[uuid].write("chat",{message:'/setblock ~ 15 ~ minecraft:command_block{Command:"/sudo '+uuid+' v off",auto:1b} destroy'})},1500);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/sudo "+uuid+" username "+name})},2000);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/execute as "+uuid+" run deop @s[type=player]"})},2500);
  setTimeout(function(){lockBots[uuid].write("chat",{message:"/icu control "+name})},3000);
  }catch(e){
    console.log(e)
  }
}