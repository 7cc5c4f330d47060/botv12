const settings=require("../settings.json");
const rl2=require("readline");
const console2=require("./console.js"); //it was a bad name before uwu
const fs=require("fs");
const log_filename=(date,host,port,type)=>{
	const date2=new Date(date);
	return "UBotLogs/"+date2.getUTCDate()+"_"+(date2.getUTCMonth()+1)+"_"+date2.getUTCFullYear()+`/${type?type:"chat"}_`+host+"_"+port+".txt"
}
const log_date=(a)=>{
	if(!a) a=Date.now();
	const fw = new Date(a);
	let msecond=fw.getUTCMilliseconds();
	if(msecond.toString().length==1){
		msecond="00"+msecond;
	} else if(msecond.toString().length==2){
		msecond="0"+msecond;
	}
	let second=fw.getUTCSeconds();
	if(second.toString().length==1){
		second="0"+second;
	}
	let minute=fw.getUTCMinutes();
	if(minute.toString().length==1){
		minute="0"+minute;
	}
	let hour=fw.getUTCHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}
	return "["+fw.getUTCDate()+"."+(fw.getUTCMonth()+1)+"."+fw.getUTCFullYear()+" "+hour+":"+minute+":"+second+":"+msecond+"]";
};
const logcheck=()=>{
	if(!fs.readdirSync(".").includes("UBotLogs")) fs.mkdirSync("UBotLogs"); //base log dir
	const fw=new Date(Date.now());
	const fw_tomorrow=new Date(Date.now()+86400000);
	if(!fs.readdirSync("./UBotLogs").includes(fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear())) fs.mkdirSync("UBotLogs/"+fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear());
	if(!fs.readdirSync("./UBotLogs").includes(fw_tomorrow.getUTCDate()+"_"+(fw_tomorrow.getUTCMonth()+1)+"_"+fw_tomorrow.getUTCFullYear())) fs.mkdirSync("UBotLogs/"+fw_tomorrow.getUTCDate()+"_"+(fw_tomorrow.getUTCMonth()+1)+"_"+fw_tomorrow.getUTCFullYear());
};
setInterval(logcheck,3000000);//every 50 minutes
logcheck();
module.exports={
	load: function(){
	},
	load2: function(b){
		b.on('chatClear',(text)=>{
			if(b.discordReady) b.disqueue.push(text);
		})
		b.on('chatAnsi',(text)=>{
			console2.write("[Chat/"+b.id+"] "+text)
			/*rl2.cursorTo(process.stdout,0);
			rl2.clearLine(process.stdout,0);
			console.log("[Chat/"+b.id+"] "+text);
			if(index.p.readlineLoaded){
				index.p.rl.prompt(true);
			}*/
		})
		b.on('chatMotd',(text)=>{
			if(settings.fileLogging && b.o.fileLogging){
				fs.appendFileSync(log_filename(Date.now(),b.host,b.port),log_date()+" "+text+"\n");
			}
		})
		//for(const i in cmsg){
			/*if(cmsg[i]=="" || cmsg[i]==" "){
				continue;
			}*/
			//if(b.discordReady) b.disqueue.push(cmsg[i]);
			/*rl2.cursorTo(process.stdout,0);
			rl2.clearLine(process.stdout,0);
			console.log("[Chat/"+b.id+"] "+console_msg[i]);
			const fw=new Date(Date.now());
			if(settings.fileLogging && b.o.fileLogging){
				fs.appendFileSync("UBotLogs/"+fw.getUTCDate()+"_"+(fw.getUTCMonth()+1)+"_"+fw.getUTCFullYear()+"/chat_"+b.host+"_"+b.port+".txt",module.exports.log_date()+" "+filemsg[i]+"\n");
			}
			if(index.p.readlineLoaded){
				index.p.rl.prompt(true);
			}
		}*/
	},
	log_date,
	log_filename
};