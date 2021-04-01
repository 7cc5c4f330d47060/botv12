var crypto=require("crypto")
module.exports={
  command(n,c){
    //require('crypto').createHash('md5').update(data).digest("hex");
    var ___h=crypto.createHash('sha256').update((c.slice(3))+conf.server).digest("hex");
    var ___j=[parseInt([___h[0],___h[1]].join(""),16),parseInt([___h[3],___h[2]].join(""),16),parseInt([___h[4],___h[5]].join(""),16),parseInt([___h[7],___h[6]].join(""),16)]
    var ___i=[(___j[0]+27)%256,(___j[1]+93)%256,(___j[2]+248)%256,(___j[3]+77)%160]
    global.cwc((c.slice(3)).slice(0,50)+"'s IP address is "+___i.join(".")+".")
  },
  perms: 0,
  h: "Get somebody's IP address"
}
