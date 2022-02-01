module.exports={
  description: "Early init required for some functions",
  load: (bot,things)=>{
    bot.runned=(cmd,to)=>{
      if(bot.lastcmdrun[cmd]-Date.now()>-to){
        let time=Math.floor(((bot.lastcmdrun[cmd]+to)-Date.now())/100)/10
        let timeSeconds=Math.floor(time)%60
        let secondsPlural=true;
        if(timeSeconds==1){secondsPlural=false;}
        let timeTotalWholeMin=(Math.floor(time)-timeSeconds)/60
        let timeWholeMin=timeTotalWholeMin%60
        let minutePlural=true;
        if(timeWholeMin==1){minutePlural=false}
        let timeTotalWholeHrs=(timeTotalWholeMin-timeWholeMin)/60
        let timeWholeHrs=timeTotalWholeHrs%24
        let hourPlural=true
        if(timeWholeHrs==1){hourPlural=false}
        let timeTotalDays=(timeTotalWholeHrs-timeWholeHrs)/24
        let timeDays=timeTotalDays%365
        let dayPlural=true
        if(timeDays==1){dayPlural=false}
        let timeYears=(timeTotalDays-timeDays)/365
        let yearPlural=true
        if(timeYears==1){yearPlural=false}
        let yearsText="";
        let daysText="";
        let hoursText="";
        let minutesText="";
        let secondsText="";
        if(time!==Infinity){
          let secondsText=timeSeconds+" second"+(secondsPlural?"s ":" ")
          if(timeTotalWholeMin!==0 && timeSeconds==0){
            secondsText=""
          }
          if(timeWholeMin!==0){
            minutesText=timeWholeMin+" minute"+(minutePlural?"s ":" ")
          }
          if(timeWholeHrs!==0){
            hoursText=timeWholeHrs+" hour"+(hourPlural?"s ":" ")
          }
          if(timeDays!==0){
            daysText=timeDays+" day"+(dayPlural?"s ":" ")
          }
          if(timeYears!==0){
            yearsText=timeYears+" year"+(yearPlural?"s ":" ")
          }
          bot.ccrun(`/bcraw You must wait ${yearsText}${daysText}${hoursText}${minutesText}${secondsText}before running this command again.`);
        } else {
          bot.ccrun("/bcraw You can only run this command once.");
          //If the time is infinite
        }
        return 1;
      } else bot.lastcmdrun[cmd]=Date.now(); return 0
    }
    bot.players=[];
    bot.canJoin=(username)=>{
      if(username==bot.username) return true
      if(username=="\xa7b\xa7lhhhzzzsss") return true
      if(username=="maniaplay") return true
      if(username=="hexmanalt") return true
      if(username=="eva") return true
      if(username=="_ChipMC_") return true
      if(username=="ignGeri") return true
      if(username=="bartoszm77") return true
      if(username=="IuCC") return true
      if(username=="QuadraticKid") return true
      if(username=="TFTWPhoenix") return true
      if(username=="ayunami2000") return true
      if(username=="Namecheap") return true
/*    if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
      if(username=="eva") return true
*/    if(username.startsWith("\xa7b\xa7lHBot")) return true
      if(username.match(/§6§lѕвσт§.§.§.§./)) return true
      if(username.match(/\xa7[0-9a-f]kb\xa7[0-9a-f]bn/)) return true
//    if(username=="Adabellemine1984") return true
      return false
    }
    bot.on("player_info",p=>{
//      console.log(p)
      if(p.action===0){
        //if(bot.kickjoin || p.data[0].name=="Jonathan8161"){
          //
        //}

        for(let i in p.data){
          if(!bot.players.includes(p.data[i])) bot.players.push(p.data[i])
          if(bot.kickjoin || p.data[i].name=="Jonathan8161" || p.data[i].name=="L0LCAT" || p.data[i].name=="Adabellemine1985" || p.data[i].name.startsWith("sa"+"§c§lRedBot")){
            if(bot.canJoin(p.data[i].name)) return   
            bot.ccrun("/data modify storage x x set value '["+Array(50).fill('{"selector":"@e"}')+"]'")
            bot.ccrun('/execute as '+p.data[i].UUID+' run title @s title {"nbt":"x","storage":"x","interpret":true}')
          }
        }
      }
    })
    bot.lastcmdrun={}
    bot.wrongpos=1  
    bot.unvanished=1
    bot.dq=[]
  }
}
