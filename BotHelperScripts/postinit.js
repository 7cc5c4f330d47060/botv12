module.exports=()=>{
  // init "something is shit" messages
  global._osinfo={}
  // hidden help
  cmdid[-14]={n:"",h:"hi there. theres nothing before this."}
  cmdid[-7]={n:"",h:"Good job. You have found page 0."}
  cmdid[-6]={n:"",h:"This bot was made by "+conf.owner+". Please report bugs to them"}
  cmdid[-5]={n:"",h:"The prefix is usually > (greater than). Sometimes it's different."}
  cmdid[-4]={n:"",h:"Some commands have extra options. For example, \"msg -S file\" will read file to chat, and replace any read section signs with the \"&\" symbol."}
  cmdid[-3]={n:"",h:"Some commands are \"console-only\", which means only the owner can run them at console. The console also can do more or different things with some commands."}
  cmdid[-2]={n:"",h:"If a normal player attempts to run a console only command, a message will be shown, and the command will not be run."}
  cmdid[-7*0.4]={n:"",h:"Page 0.6"}
  cmdid[-Infinity]={n:"",h:"Page -Infinity"}
  cmdid[NaN]={n:"",h:`Please specify a valid page number. For the first page of help, do \"${prefix}help page 1\".`}
  for(var i in cmdid){
    if(i<0){
      fullcmdid[i]=cmdid[i]
    }
  }
  fullcmdid[NaN]=cmdid[NaN]
  // if the bot is running on Windows, block the chat file command
  if(process.platform=="win32"){
    commands.msg.console=1;
    _osinfo.windows=1;
    if(require("child_process").execSync("whoami").startsWith("nt authority")){
      console.log("[Info] Don't run as NT AUTHORITY")
    }
  }
  if(process.platform=="darwin"){ // i'm not testing this one (macOS)
    _osinfo.dmac=1;
  }
  _osinfo.chrome={};
  if(process.platform=="linux"){
    _osinfo.linux=1;
    if(require("child_process").execSync("whoami")=="root"){
      console.log("[Info] Don't run as root")
    }
    fs.access("/usr/share/chromeos-assets/",(e)=>{ // i'm not testing this one either (Chrome OS)
      if(!e){
        _osinfo.chrome.os=1;
        if(require(os.userInfo().username=="chronos")){
          console.log("[Info] Go get mrchromebox script and install Linux on your chrome device")
          _osinfo.chrome.user=1
        }
        _osinfo.linux=0;
      }
    })
  }
  // Non-OS info
  if(conf.server.includes(".aternos.")){
    _osinfo.aternos=1;
  }
  if(conf.server.includes(".minehut.")){
    _osinfo.minehut=1;
  }
  if(conf.server.includes("totalfreedom")){
    fs.writeFileSync(".nojoin","1")
    process.exit(5);
  }
}
