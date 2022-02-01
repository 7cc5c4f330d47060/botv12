//from v5, ported to v6
const fs=require("fs")
module.exports={
  command: (c,things)=>{
    const args=c.split(" ");
    args.shift();
    let bot=args.shift();
    fs.readFile("commandMessages/"+args.join(" "),"utf8",(e,d)=>{
      if(e){
        console.log(e);
      } else {
        let __chatQueue=d.split("\n")
        let botnos=[+bot]
        for(var i in __chatQueue){
          for(let j in botnos){
            if(!things.bots[botnos[j]]){
              continue;
            }
            things.bots[+botnos[j]].ccrun(__chatQueue[i])
            //console.log(19)
          }
        }
      //bots[+bot].ccoreq.unshift("&7Now reading file &d"+file+"&7 to chat")
      }
    })
  }
}
