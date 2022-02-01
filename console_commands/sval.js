//maniaplay hbot trusted channel
const crypto = require('crypto');
module.exports={
  command:(cmd,things)=>{
    let botno=cmd.split(" ")[1]
    const sha256 = crypto.createHash('sha256');
    const command = cmd.slice(6+botno.length);
    const time = Math.floor(+new Date() / 10000);
    const raw = `${command.replace(/&[0-9a-fklmnor]/g, '')};${things.bots[+botno].username.replace(/§[0-9a-fklmnor]/g, '')};${time};This is a super secret key 769as90xlkl901yjkla5jjmxnzsi9c90121okljxa897sKJjdnsjAUJ8Aals890aduixAKjkadof78AIJKOKLahduisaASAd312wsqa`;
    sha256.update(raw);
    const hash = sha256.digest();
    const big_int = hash.slice(0, 4).readUInt32BE();
//    console.log(big_int);
    things.bots[+botno].chatmsg(`${command} ${big_int.toString(36)}`)
  }
}
