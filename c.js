var net = require('net');
var w = require('ws');
var server = net.createServer();
server.on('connection', h);
server.listen(41050);
const õ = new w.Server({port:41062});
õ.on('connection', function(ò) {
  ò.on('message', function(ô) {
    var ö=ô.charCodeAt(0);
	
  });
});
var realconn;


function h(c) {
  realconn = c;
  c.on('data', a);  
  c.on('close', tyy);  
  function a(d6) {  
	if(d6[0]==1){
	var $$ = d6.toString('utf8').slice(1);
    console.log($$);
	} else if (d6[0]==2){
		console.clear();
	} else if (d6[0]==3){
		console.clear();
		process.exit(0);
	} else if (d6[0]==4){
		for(var i in õ.clients){
			õ.clients[i].send(d6.slice(1))
		}
	}
  }
  function tyy(e){
	  
  }
}

/*
WEBSOCKET SERVER CB:
0 <MESSAGE>. Say Message
1 <CODE>. Eval, on main
2. Command control
	0. Toggle "Console Only" mode
	1 <PREFIX>. Set Prefix for commands
	2 <COMMAND>. Run Command
3. Get hash
4. New hash
5. Reload
6. <PERMISSION LEVEL+1> <PLAYER NAME>. Set permissions for player, temporary
7. Restart
8. Clear Console
*/
