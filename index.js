//In this version I dont put a try+catch around everything. Only the things that need it like JS code evaluation.
const version="7.0.0"
const custom=false; //If you make a modified version, set this to true. This will disable auto updating (if added). If you release a modified version with update support set this to false, but make sure to set the update server to your own server.
const fs=require("fs")
console.log("Loading version "+version)
const isWindows=(process.platform=="win32")
const mcp=require("minecraft-protocol")
const servers=require("./servers.json")
let things={p:[]}
let pluginsDir=fs.readdirSync("./botplugins")
for(let i in pluginsDir){
	things.p.push(require("./botplugins/"+pluginsDir[i]+"/index.js"))
}
for(let i in things.p){
	things.p[i].load(things)
}
let bots=[]
for(let i in servers){
	bots[i]=mcp.createClient({
		host:servers[i].host,
		port:servers[i].port,
		username:version
	})
	bots[i].on("error",()=>{}) //Prevent many crashes. Do not remove this
	bots[i].index=+i
	for(let j in things.p){
		console.log("Loading "+things.p[j].info.name+" "+things.p[j].info.version+" on bot "+i)
		things.p[j].loadBot(bots[i],things)
	}
}
things.bots=bots