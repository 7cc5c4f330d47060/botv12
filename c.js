var AdminCode;
var net = require('net');
var w = require('ws');
var server = net.createServer();
server.on('connection', h);
server.listen(41050);
const õ = new w.Server({port:41062});
var wsc;
õ.on('connection', function(ò) {
  wsc=ò;
  ò.on('message', function(ô) {
    realconn.write("\u0004"+ô)
  });
  ò.send("\u0003"+AdminCode)
});
var realconn;


function h(c) {
  realconn = c;
  c.on('data', a);  
  c.on('close', tyy);  
  function a(d6) {  
	if (d6[0]==3){
		process.exit(0);
	} else if (d6[0]==4){
		for(var i in õ.clients){
			õ.clients[i].send(d6.slice(1))
		}
	} else if (d6[0]==5){
		var $$ = d6.toString('utf8');
		AdminCode=$$.slice(1);
		if(wsc){wsc.send("\u0003"+AdminCode)}
	}
  }
  function tyy(e){
	  
  }
}

