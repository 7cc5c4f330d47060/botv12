const fs=require("fs")
module.exports={
  description: "Early init required for some functions",
  load: (things)=>{
    things.gconf=require("../gconf.json");
    things.getDateAndTime4L=(a)=>{
      if(!a) a=Date.now();
      let fw = new Date(a);
      return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+fw.getUTCHours()+":"+fw.getUTCMinutes()+":"+fw.getUTCSeconds()+":"+fw.getUTCMilliseconds()+"]";
    }
    things.logcheck=()=>{
      if(!fs.readdirSync(".").includes("UBotLogs")) fs.mkdirSync("UBotLogs") //base log dir
      let fw=new Date(Date.now());
      let fw_tomorrow=new Date(Date.now()+86400000);
      if(!fs.readdirSync("./UBotLogs").includes(fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear())) fs.mkdirSync("UBotLogs/"+fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear())
      if(!fs.readdirSync("./UBotLogs").includes(fw_tomorrow.getUTCDate()+"_"+(fw_tomorrow.getUTCMonth()+1)+"_"+fw_tomorrow.getUTCFullYear())) fs.mkdirSync("UBotLogs/"+fw_tomorrow.getUTCDate()+"_"+(fw_tomorrow.getUTCMonth()+1)+"_"+fw_tomorrow.getUTCFullYear())
    }
    setInterval(things.logcheck,3000000)//every 3ks
    things.logcheck();
  }
}
