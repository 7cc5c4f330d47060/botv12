const os=require("os");
const cp=require("child_process");
const settings=require("../../settings.json");
const VoolEagler58=function(text,value,color){
	if(!color) color="white";
	return JSON.stringify({
		translate:"%s: %s",
		with:[
			{
				text,
				color
			},
			{
				text: value,
				color
			},
		],
		hoverEvent:{
			action:"show_text",
			contents:{
				text:"Click to copy!"
			}
		},
		clickEvent:{
			action:"copy_to_clipboard",
			value
		},
	});
};
/*const windows_calc=function(a){
	//better solution found
	//this function was made on windows
	let windowsver;
	const ws=a.split(".");
	if(a=="5.1.2600"){ //Windows XP
		return "XP";
	} else if(a.startsWith("6.0")){ //Vista
		return "Vista";
	} else if(a.startsWith("6.1")){ //Windows 7 <3
		return "7";
	} else if(a.startsWith("6.2")){ //Windows 8
		return "8";
	} else if(a.startsWith("6.3")){ //Windows 8.1
		return "8.1";
	} else if(a.startsWith("6.4")){ //Windows 10 betas used version 6.4 before switching to 10.0
		return "10 Beta";
	} else if(a.startsWith("10.0")){ //Windows 10 and Windows 11
		if(+ws[2]>=21296){
			return "11";
		} else {
			return "10";
		}
	} else {
		return a;
	}
}*/
const os2=function(o2){
	switch (o2){
		case "win32":
			return os.version();//"Windows"+" "+windows_calc(os.release());
			break;
		case "android":
			return "Android";
			break;
		case "linux":
			return "Linux"+" "+os.release();
			break;
		default:
			return o2;
	}
}
//b.tellraw(sender,VoolEagler58("Example",example))
module.exports={
	command:function(b,msg,sender){
		b.tellraw(sender,VoolEagler58("Operating system",os2(process.platform)));
		b.tellraw(sender,VoolEagler58("Architecture",os.machine()));
		b.tellraw(sender,VoolEagler58("Username",os.userInfo().username));
		b.tellraw(sender,VoolEagler58("System memory (total)",Math.floor(os.totalmem()/1000000)+"MB"));
		b.tellraw(sender,VoolEagler58("Node.js version",process.version))
		if(process.platform=="android"){
			//const android_sdk=+cp.execSync("getprop ro.build.version.sdk").toString("UTF-8").split("\n")[0];
			const android_version=cp.execSync("getprop ro.build.version.release").toString("UTF-8").split("\n")[0];
			b.tellraw(sender,VoolEagler58("Android version",android_version,"green"));
			b.tellraw(sender,VoolEagler58("Device model",cp.execSync("getprop ro.product.model").toString("UTF-8").split("\n")[0],"green"));
			b.tellraw(sender,VoolEagler58("Device brand",cp.execSync("getprop ro.product.brand").toString("UTF-8").split("\n")[0],"green"));
		}
		b.tellraw(sender,VoolEagler58("Bot name",settings.name,"yellow"));
		b.tellraw(sender,VoolEagler58("Bot version",settings.version,"yellow"));
		/**b.tellraw(sender,`[{"text":"This bot is called U8 or UBot (formerly UnnamedBot). It was originally designed for free OP servers, but it also supports non-free OP / "},{"text":"partial OP","hoverEvent":{"action":"show_text","contents":{"text":"A server where vanilla commands are blocked but Essentials(X) commands are allowed"}}},{"text":" servers."}]`);
		b.ccq.push//(`/tellraw ${username} {"text":"It is written in JavaScript using minecraft-protocol."}`);
		b.tellraw(sender,`{"text":"Development for this version was started on 11 February 2023."}`);
		b.tellraw(sender,`{"text":"The first version was made in August 2020."}`);
		b.tellraw(sender,`{"text":"-------------------------","color":"black"}`);
		b.tellraw(sender,`{"text":"No version of this bot has anything to do with the \\\"nocom exploit\\\"."}`);*/
	},
	desc: "Testing command",
	usage: "",
	hidden: true
};
