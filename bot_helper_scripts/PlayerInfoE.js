var fs=require("fs");
module.exports = function(packet) {
  try{
  for(var i1c in packet.data){
    if(packet.action==0){
      global.p[packet.data[i1c].UUID]=packet.data[i1c];
      global.on[packet.data[i1c].UUID]=true;
      /*if(LockList.get(packet.data[i1c].UUID) && on[packet.data[i1c].UUID]){
        connectLockBot(packet.data[i1c].UUID)
      }*/
      fs.appendFile('Kaboom Join Leave Log.txt',global.getDateAndTime4L()+" "+global.p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") joined or unvanished.\n",function (err) {  if (err) throw err;  });    }
    if(packet.action==1){
    }
    if(packet.action==2){
      global.p[packet.data[i1c].UUID].ping=packet.data[i1c].ping;
    }
    if(packet.action==3){
    }
    if(packet.action==4){
      setTimeout(function(){global.on[packet.data[i1c].UUID]=false;},100)
      fs.appendFile('Kaboom Join Leave Log.txt',global.getDateAndTime4L()+" "+(function(){try{return global.p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+")"}catch(e){return packet.data[i1c].UUID}})()+" left or vanished.\n",function (err) {  if (err) throw err;  });
    } 
  }  
  }catch(e){}
}