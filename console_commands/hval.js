//maniaplay hbot trusted channel
const crypto = require('crypto');
module.exports={
  command:(cmd,things)=>{
    let botno=cmd.split(" ")[1]
    const sha256 = crypto.createHash('sha256');
    const command = cmd.slice(6+botno.length);
    const time = Math.floor(+new Date() / 10000);
    const raw = `${command.replace(/&[0-9a-fklmnor]/g, '')};${things.bots[+botno].username.replace(/§[0-9a-fklmnor]/g, '')};${time};This is a trusted key 76fc8VZAjQVLK204CGD4oBl30N2CFm`;
    sha256.update(raw);
    const hash = sha256.digest();
    const big_int = hash.slice(0, 4).readUInt32BE();
//    console.log(big_int);
    things.bots[+botno].chatmsg(`${command} ${big_int.toString(36)}`)
  }
}
