module.exports={
  command:(m,c,things)=>{
    let a="";
    for(let b in things.discordcmds){
      a+=("!"+b)
    }
    m.channel.send(a)
  }
}  
