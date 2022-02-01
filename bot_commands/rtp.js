module.exports={
  command:(bot,cmd,uuid,things)=>{
    bot.ccrun("tp "+uuid+" "+Math.floor(Math.random()*2000000-1000000)+" 100 "+Math.floor(Math.random()*2000000-1000000))
  }
}
