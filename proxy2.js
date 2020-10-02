const mc = require('minecraft-protocol')

const states = mc.states

const args = process.argv.slice(2)
let host = "magicflowers.aternos.me"
let port = 25565
let version = "1.12.2"
const srv = mc.createServer({
  'online-mode': false,
  port: 20,
  keepAlive: false,
  'max-players': 2
})
srv.on('connection', function (client) {
  const addr = client.socket.remoteAddress;
  var a=0;
  for(i in srv.clients){
	  if(srv.clients[i].socket.remoteAddress==addr){
		  a++;
	  }
	  if(a>=2){client.end("YOU ARE NOT WELCOME HERE ON TWO CLIENTS!!!");return;}
  }
  return;
})
srv.on('login', function (client) {
  const addr = client.socket.remoteAddress;
  console.log(addr);
  let endedClient = false
  let endedTargetClient = false
  client.on('end', function () {
    endedClient = true
    if (!endedTargetClient) { targetClient.end() }
  })
  client.on('error', function (err) {
    endedClient = true
    if (!endedTargetClient) { targetClient.end('Error') }
  })
  const targetClient = mc.createClient({
    host: host,
    port: port,
    username: "2a10a",
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
	  if (meta.name === 'title') {
			  return;
		  }
	if (meta.name === 'boss_bar') {
			  return;
		  }
		if (meta.name === 'chat') {
			  if(data.message.indexOf("le 9gga are legion")+1){return};
		  }
        client.write(meta.name, data)
        if (meta.name === 'set_compression') {
          client.compressionThreshold = data.threshold
        } 
      }
    }
  })
  targetClient.on('kick_disconnect', function (gt) {
    endedTargetClient = true
    if (!endedClient) { client.end(gt.reason) }
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

