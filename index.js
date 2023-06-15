//Source code of the shittiest free-OP server bot.
//If you found this file, please stop reading it. The source code
//below is guaranteed to be bad. People have died reading just this
//index.js file. /j

//Global options (settings.json):
//name: Bot name
//coreName: Command core name (names the command blocks)
//secureMode: Disables raw JavaScript evaluation
//version: Bot version
//fileLogging: Log chat to file (disable on devices with limited storage, logs can get large)
//discordLink: Link to Discord server, included with messages sent from the chat bridges
//colors: Color scheme
//	colors.primary: Color for main parts of text (important information)
//	colors.secondary: Color for other parts of text
//	colors.tertiary: Color for messages (netmsg, Discord, etc)
//	colors.primaryDark: Dark version of colors.primary
//	colors.secondaryDark: Dark version of colors.secondary
//	colors.tertiaryDark: Dark version of colors.tertiary
const mp=require("minecraft-protocol");
const fs=require("fs");
const crypto=require("crypto");
const servers=require("./servers.json");
const settings=require("./settings.json");
if(servers.length==0){
	console.log("There are no servers in servers.json. Please add a server.");
	process.exit(1);
}
const cp=require("child_process");
//const os=require("os")
const op=process.platform;//();

//const isLinux=(op=="linux" || op=="android");
const isAndroid=(op=="android");
//const isWindows=(op=="win32");
let android_sdk;
let android_version;
if(isAndroid){
	android_sdk=+cp.execSync("getprop ro.build.version.sdk").toString("UTF-8").split("\n")[0];
	android_version=cp.execSync("getprop ro.build.version.release").toString("UTF-8").split("\n")[0];
	console.log(`Running on Android ${android_version} (${android_sdk})`);
}

const secureMode=false;
const user=cp.execSync("whoami").toString("UTF-8").split("\n")[0]; //Only tested on Linux so far
if(secureMode && (user=="root" || user.toLowerCase().includes("nt authority"))){
	process.exit(1);
}

if(isAndroid && secureMode && android_sdk<24){ //Android 7.0
	console.log("Android version too old. Upgrade to Android 7.0 or higher, or disable secure mode.");
	process.exit(1);
}

let bots=[];
const en=[
	"Yee",
	"Yeer",
	"Yeeg",
	"Yeeish",
	"Yeeler",
	"Eagl",
	"Eagler",
	"Vigg",
	"Darver",
	"Darvler",
	"Vool",
	"Yigg",
	"Deev"
];
const rb=function(length){
	return crypto.randomBytes(Math.ceil(length/2)).toString("hex").substring(0,length);
};
const usernameGen=(legal)=>{
	let prefix;
	if(legal){
		//prefix="UBotv8_"
		return en[Math.floor(Math.random()*en.length)]+en[Math.floor(Math.random()*en.length)]+(Math.floor(Math.random()*90)+10);
	} else {
		//new allink extras
		//const selectors=["a","e","p","r","s"];
		//prefix=`@${selectors[Math.floor(Math.random()*selectors.length)]}[distance=`
		//prefix="distance=";
		prefix="@a[bb_"
	}
	const chars=16-prefix.length;
	const suffix=rb(chars);
	return prefix+suffix;
};
const createBot=(h,p,o)=>{
	//Bot per-server options:
	//disabled: Disable connection to server
	//legacy_name: Uses just player name rather than prefix+player name to determine sender UUID
	//ccore_teleport: Teleport for command core. Disable on servers which slow down when unloaded chunks are loaded.
	//autocrash: Crash the server
	//om: Online mode
	//cc_enabled: Enable command core
	//partial_op: Enable joining to servers with reduced permissions
	//deop: Enable joining to servers with reduced permissions
	//legal_username: Use a username with only legal characters (Latin alphabet, numbers and _)
	//chatqueue_split: How many characters will messages be split at (default: 250)
	//chatqueue_speed: Rate at which messages are sent
	//msg_split: Message seperator (default: ": ")
	//hidden: Hide server from commands that display a list of servers
	//version: Minecraft version to join as (default: 1.19.2)
	//vanilla_cc: Use setblock for command core
	//sudo_username: Whether to use username or uuid for sudo command
	//command_time: Command cooldown, in milliseconds (default: 2500)
	//discord_enabled: Enable Discord bridge for this bot
	//discord_channel: Discord channel to send messages to
	//kick_method: Method used to kick players
	//startup_disabled: Disable version/prefix announcement
	//netmsg_disabled: Disable global broadcast commands, such as netmsg
	//commands_disabled: Disable commands
	//ad_rate: Rate at which the help command/Discord server are advertised
	//no_self_care: Disables self care
	//")checks of various things ("
	if(o.disabled){
		console.log("[Info] Bot connecting to "+h+":"+(p?p:25565)+" is not enabled.");
		return 4;
	}
	const b=mp.createClient({
		host:h,
		port:p,
		username:o.om?settings.onlineuser:usernameGen(o.legal_username),
		password:o.om?settings.onlinepass:null,
		auth: o.om?"microsoft":"offline",
		version: o.version?o.version:"1.19.2",
		hideErrors: true
	});
	b.o=o;
	b.on("error",(e)=>{
		console.log(`[Error/${b.id}] ${e}`);
	});
	b.host=h;
	b.port=p;
	b.real=true;
	return b;
};

//plugins (everything because of habit & modular bots are better)
//for the most part this is from u6
let p={};

//DO NOT TOUCH
module.exports.createBot=createBot;
module.exports.bots=bots;
module.exports.p=p;
module.exports.secure=secureMode;
//end of DO NOT TOUCH

global.loadplug=(botno)=>{
	let botplug=[];
	const bpl=fs.readdirSync("plugins");
	for(const i in bpl){
		if(!bpl[i].endsWith(".js")){
			continue;
		}
		try{
			botplug.push(require(`./plugins/${bpl[i]}`));
		}catch(e){console.log(e);}
	}
	botplug.forEach((plug)=>{
		try{
			if(botno!==undefined){
				if(plug.load2){
					plug.load2(bots[botno]);
				}
				//console.log("reload")
			} else {
				plug.load();
				//console.log("non-reload")
			}
			//console.log(`[Info] Loaded ${plug.description}`)
		}catch(e){console.log(e);}
	});
};

global.loadplug();
//require("./test.js")
//console.log(JSON.stringify(p))

for(let i in servers){
	const mcb=createBot(servers[i].host,servers[i].port,servers[i].opt);
	if(mcb==4){
		bots[i]={
			id:i,
			real:false,
			send:()=>{},
			host:servers[i].host,
			port:servers[i].port,
			o:servers[i].opt
		};
		continue;
	}
	bots.push(mcb);
	bots[i].id=i;
	global.loadplug(i);
}
