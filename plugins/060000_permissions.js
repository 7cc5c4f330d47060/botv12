module.exports={
  description: "Permissions-related functions",
  load:(things)=>{
    things.nodes=require("../perms.json");
    things.cnode=(uid)=>{
      let node=things.nodes.perms._all.nodes;
      if(things.nodes.perms._all.groups){
        let grupall=things.nodes.perms._all.groups;
        grupall.forEach((group)=>{
          for(let i in things.nodes.groups[group].nodes){
            node[i]=things.nodes.groups[group].nodes[i]
          }
        })
      }
      if(things.nodes.perms[uid]){
        if(things.nodes.perms[uid].groups){ 
          let grupyou=things.nodes.perms[uid].groups;
          grupyou.forEach((group)=>{
            for(let i in things.nodes.groups[group].nodes){
              node[i]=things.nodes.groups[group].nodes[i]
            }
          })
        }
        if(things.nodes.perms[uid].nodes){ 
          for(let i in things.nodes.perms[uid].nodes){
            node[i]=things.nodes.perms[uid].nodes[i]
          }
        }
      }
      return node
    }
    things.canRun=(uid,cmd)=>{
      if(uid=="CONSOLE"){
        return 1
      }
      return (things.cnode(uid)["UB_V6_MAIN.cmd."+cmd+".exec"])?1:0
    }
    things.canRun_discord=(uid,cmd)=>{
      if(uid=="CONSOLE"){
        return 1
      }
      return (things.cnode(uid)["UB_V6_DC.cmd."+cmd+".exec"])?1:0
    }
  }
}
