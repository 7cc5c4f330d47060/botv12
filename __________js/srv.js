const ws=require("ws");
global.wss=new ws.Server({port:38552})
global.wscs=[]
wss.on('connection', function connection(wsc) {
  console.log("[Info] New connection: "+wsc._socket.remoteAddress)
  wscs.push(wsc)
  wsc.___clientNo=wscs.indexOf(wsc);
  console.log("[Info] This connection has been given ID number "+wsc.___clientNo);
  wsc.on("close",()=>{
    console.log("[Info] Connection "+wsc.___clientNo+" closed.")
    wscs.splice(wsc.___clientNo,1)
  })
})
