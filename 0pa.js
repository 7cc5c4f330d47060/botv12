const mc = require('minecraft-protocol')

const states = mc.states

const args = process.argv.slice(2)
let host = "shield.0b0t.org"
let port = 25565
let version = "1.13.2"
const srv = mc.createServer({
  'online-mode': false,
  port: 25565,
  keepAlive: false,
  version: version,
  motd: "commands.deop.success"
})
var usernames=[];
srv.on('login', function (client) {
  const addr = client.socket.remoteAddress
  let endedClient = false
  let endedTargetClient = false
  client.on('end', function () {
    endedClient = true
    if (!endedTargetClient) { targetClient.end('End') }
  })
  client.on('error', function (err) {
    endedClient = true
    if (!endedTargetClient) { targetClient.end('Error') }
  })
  const targetClient = mc.createClient({
    host: host,
    port: port,
    username: "@gmail.com",
	password: "",
    keepAlive: false,
    version: client.version
  })
  client.on('packet', function (data, meta) {
    if (targetClient.state === states.PLAY && meta.state === states.PLAY) {
      if (!endedTargetClient) { targetClient.write(meta.name, data) }
    }
  })
  targetClient.on('packet', function (data, meta) {
    if (meta.state === states.PLAY && client.state === states.PLAY) {
      if (!endedClient) {
		if (meta.name === 'player_info') {
			for(var i1c in data.data){
				if(data.action==0){
					if(data.data[i1c].name!=undefined){
						usernames[data.data[i1c].UUID]=data.data[i1c].name+" ("+data.data[i1c].UUID+")"
						setTimeout(function(){client.write("chat",{message:'{"text":"'+usernames[data.data[i1c].UUID]+" went to \u00a7"+(data.data[i1c].gamemode+9).toString(16)+["Survival","Creative","Adventure","Spectator"][data.data[i1c].gamemode]+"\u00a7r Mode!"+'"}'})},100)
					}
				}
				if(data.action==1){
					if(data.data[i1c].gamemode!=undefined){
						setTimeout(function(){client.write("chat",{message:'{"text":"'+usernames[data.data[i1c].UUID]+" went to \u00a7"+(data.data[i1c].gamemode+9).toString(16)+["Survival","Creative","Adventure","Spectator"][data.data[i1c].gamemode]+"\u00a7r Mode!"+'"}'})},100)
					}
				}
				if(data.action==4){
					if(data.data[i1c].name!=undefined){
						delete usernames[data.data[i1c].UUID];
					}
				}
			}		
		}
		//entity_update_attributes		
        client.write(meta.name, data)
        if (meta.name === 'set_compression') {
          client.compressionThreshold = data.threshold
        } 
      }
    }
  })
  targetClient.on('end', function () {
    endedTargetClient = true
    if (!endedClient) { client.end('End') }
  })
  targetClient.on('error', function (err) {
    endedTargetClient = true
    if (!endedClient) { client.end('Error') }
  })
})

