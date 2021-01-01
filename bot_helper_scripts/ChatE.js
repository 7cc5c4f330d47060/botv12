  const crypto=require("crypto")
  function javaUUID (s) {
    const hash = crypto.createHash('md5')
    hash.update(s, 'utf8')
    const buffer = hash.digest()
    buffer[6] = (buffer[6] & 0x0f) | 0x30
    buffer[8] = (buffer[8] & 0x3f) | 0x80
    return buffer
  }
   global.cspyRequests=0;
   setInterval(()=>{
     if(global.cspyRequests == 1 && (global.cspyRequests+"") == "1"){
		 global.cwc("/cspy "+["off","on"][+global.cspyMode]);
		 global.cspyRequests=0;
	 }
   },2000)
module.exports=function(packet) {try{
	//console.log(packet)
  if(!global.destroyed){//try{if(packet.message.includes("apmunute")){return}}catch(e){}
  var jsonMsg = JSON.parse(packet.message);
  var nf=0;
  var name;
  var cont = lang.tth(jsonMsg)
  var processed = cont[0];
  var fileprocessed = cont[1];
  var ir = cont[2];
  if((fileprocessed.startsWith("\u00a76You have been muted") && !ir.startsWith("You have been muted for now"))){
	  global.isMuted=1;
  }
  if(global.isMuted && fileprocessed.includes("has muted player "+client.username) && !fileprocessed.includes("has muted player "+client.username+"\u00a76 for \u00a7cnow\u00a76.")){
	  var n=javaUUID("OfflinePlayer:"+client.username).toString("hex")
	  global.cwc("/mute "+n.slice(0,8)+"-"+n.slice(8,12)+"-"+n.slice(12,16)+"-"+n.slice(16,20)+"-"+n.slice(20,32)+" 0s")
  }
  //if(fileprocessed.match(/§b[0-9a-f]{16}§b: \/mute [0-9a-f]{16} 0s/u)){return}
  // if(fileprocessed.match(/§b[\x00-\x1f]{4}§b: \/execute at @a run setblock ~ 255 ~ command_block\{Command:\"fill ~ 0 ~ ~ 255 ~/)){return}
  var testname=0;
  if(jsonMsg.extra){
    for(var i2a in jsonMsg.extra){
      if(jsonMsg.extra[i2a]){
        if(jsonMsg.extra[i2a].text){
          if(jsonMsg.extra[i2a].text.slice(0,2)==": "){
            if(jsonMsg.extra[i2a-1]){ 
			if(ir.includes(": "+global.prefix)){
			 try{if(ir.indexOf("]")+1 && (ir.indexOf("]")!=ir.indexOf("] ["))){ 
				testname=ir.slice(ir.indexOf("]")+2).split(": ")[0];
				
				//console.log(testname)
             } else { testname = jsonMsg.extra[i2a-1].text}}catch(e){}
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

  
  var pt2 = preText[0]
  var preTextFirst = preText.shift();
  var text2 = preText.join(": ");
  if(text2.startsWith(global.prefix)){
    CD(name,text2.slice(global.prefix.length));
  }

  if(ir.endsWith("disabled")){
    if((ir.indexOf("Vanish for")!=-1)&&ir.indexOf("Vanish for")<=2){
      cwc("/evanish on")
    }
  }

  if(fileprocessed==("Successfully "+["enabled","disabled"][+global.cspyMode]+" CommandSpy")){
    global.cspyRequests++;
  }
  if(global.fileLogger){
  fs.appendFile('Kaboom Log.txt',getDateAndTime4L()+" "+(fileprocessed+"\n"),function (err) {  if (err) throw err;  });
  }

  return;
  }}catch(e){}
}