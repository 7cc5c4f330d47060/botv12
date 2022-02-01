module.exports={
  command:(bot,cmd,uuid,things)=>{
    if(bot.runned(cmd.split(" ")[0].toLowerCase,7000)==1) return
    const nodes=things.cnode(uuid);
    //console.log(nodes)
    for(let i in nodes){
      bot.chatmsg(["&c","&a"][+Boolean(nodes[i])]+i)
    }
  }
}
