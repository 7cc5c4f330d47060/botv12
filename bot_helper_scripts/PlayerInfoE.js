module.exports = function(packet) {
  for(var i1c in packet.data){
    if(p[packet.data[i1c].UUID]){
    if(packet.action==0){
      p[packet.data[i1c].UUID]=packet.data[i1c];
      on[packet.data[i1c].UUID]=true;
      /*if(LockList.get(packet.data[i1c].UUID) && on[packet.data[i1c].UUID]){
        connectLockBot(packet.data[i1c].UUID)
      }*/
      fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") joined or unvanished.\n",function (err) {  if (err) throw err;  });    }
    if(packet.action==1){
      if(!leave) {on[packet.data[i1c].UUID]=true;}
    }
    if(packet.action==2){
      if(!leave) {on[packet.data[i1c].UUID]=true;}
    }
    if(packet.action==3){
      if(!leave) {on[packet.data[i1c].UUID]=true;}
    }
    if(packet.action==4){
      setTimeout(function(){on[packet.data[i1c].UUID]=false;},100)
      fs.appendFile('Kaboom Join Leave Log.txt',getDateAndTime4L()+" "+p[packet.data[i1c].UUID].name+" ("+packet.data[i1c].UUID+") left or vanished.\n",function (err) {  if (err) throw err;  });
    }
    }
}  
}