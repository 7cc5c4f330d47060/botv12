module.exports={
    load:()=>{
        
    },
    loadBot:(b)=>{
        b.cloops=[];
        b.addCloop=function (command, rate){
            b.cloops.push({
                command,
                rate,
                interval: setInterval(()=>{b.ccq.push(command)},rate)
            })
            b.ccq.push(command)
        }
        b.removeCloop=function (index){
            clearInterval(b.cloops[index].interval)
            b.cloops.splice(index,1)
        }
        b.clearCloops=function (){
            for(const i in b.cloops){
                clearInterval(b.cloops[i].interval)
            }
            b.cloops=[];
        }
    }
}