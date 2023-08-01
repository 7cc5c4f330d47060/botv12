//next: command_7
const index = require('../index.js');
const settings = require('../settings.json');
const genCode = require('../util/genhash.js');
const log_filename = require('../util/logname.js');
const log_date = require('../util/logdate.js');
const fs = require('fs');
//index.p.cmdloader=1;
const loadplug_new = () => {
	let botplug = Object.create(null); //block __proto__ and constructor
	const bpl = fs.readdirSync('command');
	let id = 0;
	for (const i in bpl) {
		if (!bpl[i].endsWith('.js')) {
			continue;
		}
		try {
			const name = bpl[i].slice(0, bpl[i].length - 3);
			botplug[name] = require(`../command/${bpl[i]}`);
			botplug[name].id = id++;
			if (botplug[name].aliases) {
				for (const j in botplug[name].aliases) {
					botplug[botplug[name].aliases[j]] = {};
					botplug[botplug[name].aliases[j]].command_b = botplug[name].command_b;
					botplug[botplug[name].aliases[j]].command_c = botplug[name].command_c;
					botplug[botplug[name].aliases[j]].command_d = botplug[name].command_d;
					botplug[botplug[name].aliases[j]].verify = botplug[name].verify;
					botplug[botplug[name].aliases[j]].coreRequired = botplug[name].coreRequired;
					botplug[botplug[name].aliases[j]].opRequired = botplug[name].opRequired;
					botplug[botplug[name].aliases[j]].delay = botplug[name].delay;
					botplug[botplug[name].aliases[j]].desc = `Alias for ${name}`;//botplug[name].desc;
					botplug[botplug[name].aliases[j]].usage = botplug[name].usage;
					botplug[botplug[name].aliases[j]].hidden = true;
				}
			}
			// botplug.push());
		} catch (e) { console.log(e); }
	}
	return botplug;
};

module.exports = {
	newcommands: loadplug_new(),
	load: function () {
		// i guess no more sex ...
	},
	load2: function (b) {
		b.cmddelay = {};
		b.prefix = settings.prefix;
		b.lastCommand = 1293840000000; //January 1, 2011
		b.autoVerify = false; //Enabled for debug purpose
		if (!b.o.command_time) {
			b.o.command_time = 1000;
		}
		b.rc = function (cmdFormat, sender, user, cmd) {
			//console.log(cmdFormat,sender,user,cmd)
			if (b.o.commands_disabled) return;
			if (b.username == user) return;
			let v = false;
			if (b.prefix == '"' && cmd.endsWith('"')) { //Quote
				return;
			}
			if (b.prefix == '?' && cmd == '') { //Single question mark
				return;
			}
			if (Date.now() - b.lastCommand <= b.o.command_time) {
				return;
			} else {
				b.lastCommand = Date.now();
			}
			//b.send("Comment")
			const args = cmd.split(' ');
			const command = cmd.split(' ')[0].toLowerCase();
			try {
				if (module.exports.newcommands[command]) {
					if (module.exports.newcommands[command].delay && b.cmddelay[command] && Date.now() - b.cmddelay[command] <= module.exports.newcommands[command].delay && !b.o.cc_enabled) {
						b.message(`You must wait ${Math.floor((b.cmddelay[command] - Date.now() + module.exports.newcommands[command].delay) / 1000)} more second${Math.floor((b.cmddelay[command] - Date.now() + module.exports.newcommands[command].delay) / 1000) == 1 ? '' : 's'} to run this command again.`);
						return;
					} else {
						b.cmddelay[command] = Date.now();
					}
					//if(module.exports.commands[command].verify && sender!="00000000-0000-0000-0000-Console00000"){
					if (!b.autoVerify && args[args.length - 1] != genCode(user) && module.exports.newcommands[command].verify) {
						b.message('Invalid hash');
						return;
					} else if (args[args.length - 1] == genCode(user) || b.autoVerify) {
						v = true;
					}
					if (module.exports.newcommands[command].coreRequired && !b.o.cc_enabled) {
						b.send('Command core is disabled, command will not run.');
					} else if (module.exports.newcommands[command].opRequired && (b.o.partial_op || b.o.deop)) {
						b.send('OP access is disabled, command will not run.');
					} else {
						module.exports.newcommands[command].command_b(b, module.exports.newcommands[command].format ? cmdFormat : cmd, sender, user, v);
					}
					fs.appendFileSync(log_filename(Date.now(),b.host,b.port,'cmd'),`${log_date()} ${user} (${sender}): ${cmd}\n`)
				} else {
					//b.send(`Command ${b.prefix+command} does not exist, try ${b.prefix}help for a list of commands.`.slice(0,100));
				}
			} catch (err) {
				b.send(err + '');
			}
			//b.send("Command: "+cmd+" from UUID "+sender+" ("+user+")")
		};
		b.on('command_u', b.rc);
		b.on('playermsg', (clear, uuid, name, sussy) => {
			if (clear.startsWith(b.prefix)) b.emit('command_u', sussy.slice(b.prefix.length), uuid, name, clear.slice(b.prefix.length));
		});
	}
};
