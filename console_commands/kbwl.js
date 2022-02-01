module.exports={
  command:(cmd,things)=>{
    let botno=cmd.split(" ")[1]
    things.bots[+botno].write("chat",{message:"/fill ~ 0 ~ ~15 0 ~15 command_block"})  
    for(let i=0;i<=20;i++){
      things.bots[+botno].ccrun(``)
    }
    setTimeout(()=>{things.bots[+botno].write("chat",{message:"/gamemode creative"})},210)
    let enable=["off","on"].indexOf(cmd.split(" ")[2])
    if(enable==-1) return
    if(things.bots[+botno].kickjoin==enable) return
    things.bots[+botno].kickjoin=enable
    if(enable==1){
      things.bots[+botno].dateAtKbwlStart=Date.now();
      things.bots[+botno].ccrun(`/bossbar add unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} "Loading..."`)
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} players @a`)
      things.bots[+botno].ccrun("bcraw Whitelist enabled.")
      things.bots[+botno].opl=things.bots[+botno].players.length.toString();
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} max 2`)
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} value 1`)
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} color white`)
      things.bots[+botno].ccrun("/gamerule logAdminCommands false")
      things.bots[+botno].ccrun("/gamerule commandBlockOutput false")
      things.bots[+botno].ccrun("/data modify storage x x set value '["+Array(50).fill('{"selector":"@e"}')+"]'")
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} max ${things.bots[+botno].opl}`)
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} value 0`)
      things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} name "Kicking players... (0%)`)
      for(let i in things.bots[+botno].players){
        setTimeout(()=>{
          things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} value ${((i-0)+1)}`)
          things.bots[+botno].ccrun(`/bossbar set unnamedbot6wl:whitelist_${things.bots[+botno].dateAtKbwlStart} name "Kicking players... (${Math.floor(((i-0)+1)/things.bots[+botno].opl*100)}%)"`)
          things.bots[+botno].ccrun("bcraw Kicking player "+things.bots[+botno].players[i].name+" ("+((i-0)+1)+"/"+things.bots[+botno].players.length+")")
          if(!things.bots[+botno].canJoin(things.bots[+botno].players[i].name)) things.bots[+botno].ccrun('/execute as '+things.bots[+botno].players[i].UUID+' run title @s title {"nbt":"x","storage":"x","interpret":true}')
        },(cmd.split(" ")[3]?cmd.split(" ")[3]:2600)*i)
      }
    }
  }
}
