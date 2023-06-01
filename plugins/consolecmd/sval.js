//const index=require("../../index.js");
//Much of this code is from a message in the SBot discord.
//https://discord.com/channels/824090767546515467/929919205984321547/929920970997772360
const index=require("../../index.js");
const settings=require("../../settings.json");
module.exports={
	command:function(msg){
		//javascript/node
		const args = msg.split(" ");
		const crypto = require("crypto");
		const sha256 = crypto.createHash("MD5");
		const command = args.slice(2).join(" ");
		const time = Math.floor(+new Date() / 20000);
		const raw = ":"+`${command.replace(/&[0-9a-fklmnor]/g, "")};${index.bots[+args[1]].username};${time};${settings.sbotKey}`;
		sha256.update(raw);
		const hash = sha256.digest();
		const big_int = hash.slice(0, 4).readUInt32BE();
		//if you have client.chat as a function or use mineflayer
		index.bots[+args[1]].chat(`:${command} ${big_int.toString(36)}`);
	},
	desc: "Testing command",
	usage: " [text]"
};
