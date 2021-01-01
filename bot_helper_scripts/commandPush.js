module.exports=(n,c)=>{
  if(!countdown){countdown=1;setTimeout(function(){countdown=0},4000)} else if (countdown){return}
  if(c=="clearcmdq"||c.split(" ")[0]=="confirm"){global.commandQueue[0]={n:n,c:c};return;}
  global.fs.appendFile('Command Log.txt',global.getDateAndTime4L()+" \""+n+"\" ran command: \""+c+"\"\n",function (err) {  if (err) throw err;  });
  global.commandQueue.push({n:n,c:c})
}