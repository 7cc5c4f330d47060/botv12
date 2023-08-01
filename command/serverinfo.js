const os=require('os');
const cp=require('child_process');
const settings=require('../settings.json');
const timeformat = require('../util/amogus');
const console2=require('../plugins/console.js'); 
const VoolEagler58=function(text,value,color){
	if(!color) color='white';
	return JSON.stringify({
		translate:'%s: %s',
		with:[
			{
				text,
				color
			},
			{
				text: value,
				color
			},
		],
		hoverEvent:{
			action:'show_text',
			contents:{
				text:'Click to copy!'
			}
		},
		clickEvent:{
			action:'copy_to_clipboard',
			value
		},
	});
};
/*const windows_calc=function(a){
	//better solution found
	//this function was made on windows"
		return "Vista";
	} else if(a.startsWith("6.1")){ //Windows 7 <3
		return "7";
	} else if(a.startsWith("6.2")){ //Windows 8
		return "8";
	} else if(a.startsWith("6.3")){ //Windows 8.1
		return "8.1";
	} else if(a.startsWith("6.4")){ //Windows 10 betas used version 6.4 before switching to 10.0
		return "10 Beta";
	} else if(a.startsWith("10.0")){ //Windows 10 and Windows 11
		if(+ws[2]>=21296){
			return "11";
		} else {
			return "10";
		}
	} else {
		return a;
	}
}*/
const os2=function(o2){
	switch (o2){
	case 'win32':
		return os.version();//"Windows"+" "+windows_calc(os.release());
		break;
	case 'android':
		return 'Android';
		break;
	case 'linux':
		return 'Linux'+' '+os.release();
		break;
	default:
		return o2;
	}
};
//b.tellraw(sender,VoolEagler58("Example",example))
module.exports={
	command_b:function(b,msg,sender){
		b.tellraw(sender,VoolEagler58('Operating system',os2(process.platform)));
		b.tellraw(sender,VoolEagler58('Architecture',os.machine()));
		b.tellraw(sender,VoolEagler58('Username',os.userInfo().username));
		b.tellraw(sender,VoolEagler58('Bot uptime',timeformat(process.uptime() * 1000)));
		b.tellraw(sender,VoolEagler58('System uptime',timeformat(os.uptime() * 1000)));
		//b.tellraw(sender,VoolEagler58('System memory (total)',Math.floor(os.totalmem()/1000000)+'MB'));
		b.tellraw(sender,VoolEagler58('Node.js version',process.version));
		if(process.platform=='android'){
			//const android_sdk=+cp.execSync("getprop ro.build.version.sdk").toString("UTF-8").split("\n")[0];
			const android_version=cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0];
			b.tellraw(sender,VoolEagler58('Android version',android_version,'green'));
			b.tellraw(sender,VoolEagler58('Device model',cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0],'green'));
			b.tellraw(sender,VoolEagler58('Device brand',cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0],'green'));
		}
		b.tellraw(sender,VoolEagler58('Bot name',settings.name,'yellow'));
		b.tellraw(sender,VoolEagler58('Bot version',settings.version,'yellow'));

	},
	command_c: function (msg){
		console.log(VoolEagler58('Operating system',os2(process.platform)));
		console.log(VoolEagler58('Architecture',os.machine()));
		console.log(VoolEagler58('Username',os.userInfo().username));
		console.log(VoolEagler58('Bot uptime',timeformat(process.uptime() * 1000)));
		console.log(VoolEagler58('System uptime',timeformat(os.uptime() * 1000)));
		//b.tellraw(sender,VoolEagler58('System memory (total)',Math.floor(os.totalmem()/1000000)+'MB'));
		console.log(VoolEagler58('Node.js version',process.version));
		if(process.platform=='android'){
			//const android_sdk=+cp.execSync("getprop ro.build.version.sdk").toString("UTF-8").split("\n")[0];
			const android_version=cp.execSync('getprop ro.build.version.release').toString('UTF-8').split('\n')[0];
			console.log(VoolEagler58('Android version',android_version));
			console.log(VoolEagler58('Device model',cp.execSync('getprop ro.product.model').toString('UTF-8').split('\n')[0]));
			console.log(VoolEagler58('Device brand',cp.execSync('getprop ro.product.brand').toString('UTF-8').split('\n')[0]));
		}
		console.log(VoolEagler58('Bot name',settings.name));
		console.log(VoolEagler58('Bot version',settings.version));

	},
	desc: 'Get system/bot info',
	usage: ''
};
