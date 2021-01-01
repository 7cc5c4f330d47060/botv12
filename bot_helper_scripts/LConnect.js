module.exports=()=>{
  global.client = require("minecraft-protocol").createClient({
    host: conf.server,   
    port: conf.port,    
    version: conf.version, 
    username: "\u00a7"+Math.floor(Math.random()*16).toString(16)+"\u00a7\u00a7"+["\u0000","\u0001","\u0002","\u0003","\u0004","\u0005","\u0006","\u0007"][Math.floor(Math.random()*8)]+["\u0008","\u0009","\u007f","\u000b","\u000c","\u000d","\u000e","\u000f"][Math.floor(Math.random()*8)]+["\u0010","\u0011","\u0012","\u0013","\u0014","\u0015","\u0016","\u0017"][Math.floor(Math.random()*8)]+["\u0018","\u0019","\u001a","\u001b","\u001c","\u001d","\u001e","\u001f"][Math.floor(Math.random()*8)]+"   ",
  });
}