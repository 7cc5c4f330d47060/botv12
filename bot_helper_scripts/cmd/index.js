exports.commands={
	help: {
		command: function(c,n){
			var Page=((+(c.split(" ")[1]))-1)
			cwc(""+csl[0]+"Help - page "+csl[1]+""+(c.split(" ")[1]))
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+0].name+""+csl[0]+": "+cmdid[(Page*6)+0].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+1].name+""+csl[0]+": "+cmdid[(Page*6)+1].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+2].name+""+csl[0]+": "+cmdid[(Page*6)+2].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+3].name+""+csl[0]+": "+cmdid[(Page*6)+3].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+4].name+""+csl[0]+": "+cmdid[(Page*6)+4].h)}catch(e){}
			try{cwc(""+csl[1]+"|"+cmdid[(Page*6)+5].name+""+csl[0]+": "+cmdid[(Page*6)+5].h)}catch(e){}
		},
		perm: -Infinity,
		admin: 0
	},
	restart: {
		command: function(c,n){
			if(adminCode==(c.split(" ")[1])){
				client.write("chat",{message:""+csl[1]+"Restarting..."})
				clearInterval(cl);
				clearInterval(bc);
				clearInterval(cd);
				setTimeout(function(){process.exit(0)},1000);
			}
		},
		perm: -Infinity,
		admin: 0
	},
	perms: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have perm level "+csl[1]+""+getPerm(n)+""+csl[0]+".")
		},
		perm: -Infinity,
		admin: 0,
		h: "Checks your permission level."
	},
	admin: {
		command: function(c,n){
			cwc(""+csl[1]+""+n+""+csl[0]+", you have admin level "+csl[1]+""+getAdmin(n)+""+csl[0]+".")
		},
		perm: 0,
		admin: 0,
		h: "Checks your admin permission level."
	},
	"1a": {
		command: function(c,n){
			cwc("/gamemode creative @a")
		},
		perm: 0,
		admin: 0,
		h: "Puts everyone in creative mode."
	},
	"0a": {
		command: function(c,n){
			cwc("/gamemode survival @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in survival mode."
	},
	"2a": {
		command: function(c,n){
			cwc("/gamemode adventure @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in adventure mode."
	},
	"3a": {
		command: function(c,n){
			cwc("/gamemode spectator @a")
		},
		perm: 4,
		admin: 0,
		h: "Puts everyone in spectator mode."
	},
	"1m": {
		command: function(c,n){
			cwc("/gamemode creative "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in creative mode."
	},
	"0m": {
		command: function(c,n){
			cwc("/gamemode survival "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in survival mode."
	},
	"2m": {
		command: function(c,n){
			cwc("/gamemode adventure "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in adventure mode."
	},
	"3m": {
		command: function(c,n){
			cwc("/gamemode spectator "+n)
		},
		perm: 0,
		admin: 0,
		h: "Puts you in spectator mode."
	},
	zelkam: {
		command: function(c,n){
			cwc("&c|zelkam is disabled.")
		},
		perm: 0,
		admin: 0,
		h:"Swing an arm."
	},
	say: {
		command: function(c,n){
			cwc(c.slice(4))
		},
		perm: 0,
		admin: 0,
		h:"Make me say something."
	}
}