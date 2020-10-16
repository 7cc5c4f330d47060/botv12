module.exports=function(packet) {
  if(!global.destroyed){
  var jsonMsg = JSON.parse(packet.message);
  var nf=0;
  var name;
  var cont = lang.tth(jsonMsg)
  var processed = cont[0];
  var fileprocessed = cont[1];
  var ir = cont[2];
  var testname=0;
  
  if(jsonMsg.extra){
    for(var i2a in jsonMsg.extra){
      if(jsonMsg.extra[i2a]){
        if(jsonMsg.extra[i2a].text){
          if(jsonMsg.extra[i2a].text.slice(0,2)==": "){if(ir.includes(": "+global.prefix)){
            if(jsonMsg.extra[i2a-1]){ 
			 try{if(ir.indexOf("]")+1){ 
				testname=ir.slice(ir.indexOf("]")+2).split(": ")[0];
				
				//console.log(testname)
             }}catch(e){}
              var preName = jsonMsg.extra[i2a-1].text;
			  if(testname){preName=testname};
			  var ses="";
			  name="The name thing is being worked on."
			  for(var i33 in preName.split("\u00a7")){
			    //if(preName.split("\u00a7")[i33]==""){ses+="\u00a7"}else
				if(i33==0 && !preName.split("\u00a7")[i33].startsWith("\u00a7")  || !preName.split("\u00a7")[i33].slice(0,1).match(/[0-9a-fk-or]/)){ses+=preName.split("\u00a7")[i33];}else{
				ses+= preName.split("\u00a7")[i33].slice(1);}
			  }
			  for(var i22 in p){
				var gn="";
				for(var i33 in p[i22].name.split("\u00a7")){
			      //if(p[i22].name.split("\u00a7")[i33]==""){gn+="\u00a7"}else
				  if((i33==0 && !p[i22].name.split("\u00a7")[i33].startsWith("\u00a7")) || !p[i22].name.split("\u00a7")[i33].slice(0,1).match(/[0-9a-fk-or]/)){ gn+=p[i22].name.split("\u00a7")[i33];}else{
				  gn+= p[i22].name.split("\u00a7")[i33].slice(1);}
				}
				//console.log(gn)
				//console.log(ses)
				if(gn==ses){name=p[i22].name;break;}
			  }
              break
            }
		}}
        }
      }
    };
    nf=1;
  }
  if(!nf){
  if(jsonMsg.translate) {
    if(jsonMsg.translate.startsWith("chat.type.") || jsonMsg.translate=="commands.message.display.incoming") {
      try{
        name = jsonMsg.with[0].text+"";
        if(jsonMsg.with[1].text){
          text2 = jsonMsg.with[1].text+"";
        } else {
          text2 = jsonMsg.with[1]+"";
        }
      }catch(e){};
  }}}
  if(lang.tth(jsonMsg)[0]==undefined){return;}
  var preText = ir.split(": ");
  var pt2 = preText[0]
  var preTextFirst = preText.shift();
  if(text2==undefined){ var text2 = preText.join(": ");}
  if(text2.startsWith(global.prefix)){
    CD(name,text2.slice(global.prefix.length));
  }
  if(ir.endsWith("disabled")){
    if((ir.indexOf("Vanish for")!=-1)&&ir.indexOf("Vanish for")<=3){
      cwc("/evanish on")
    }
  }
  if(ir.startsWith("Your nickname is now ")){
    cwc("/nick off")
  }
  if(ir.startsWith("Successfully "+["enabled","disabled"][+global.cspyMode]+" CommandSpy")){
    global.cwc("/cspy "+["off","on"][+global.cspyMode])
  }
  if(global.fileLogger){
  fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
  }
  if(global.consoleLogger){
  chatLogQueue.push("\x1b[0m\x1b[1m\x1b[37m"+processed);
  }
  return;
  }
}