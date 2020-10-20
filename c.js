var net = require('net');
var w = require('ws');
var server = net.createServer();
server.on('connection', h);
server.listen(41050);
const õ = new w.Server({port:8080});
õ.on('connection', function connection(ò) {
  ò.on('message', function incoming(ô) {
    var ö=ô.charCodeAt[0]
  });
});
function h(c) {    
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
	} 
  }
  function tyy(e){
	  
  }
}