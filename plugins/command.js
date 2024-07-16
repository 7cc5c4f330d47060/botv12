const fs=require("fs");
const Command=require("../util/Command.js");
let cmds={};
module.exports={
    load:()=>{
        module.exports.loadCMD();
    },
    loadBot:(b)=>{
        b.prefix="\""
        b.lastCmd=0;
        b.runCommand=(name, uuid, text)=>{
            if(Date.now-b.lastCmd<=1000){
                console.log("Executed too early, "+(Date.now-b.lastCmd)+"ms left");
                return;
            }
            const cmd=text.split(" ");
            if(cmds[cmd[0].toLowerCase()]){
                try{
                    cmds[cmd[0].toLowerCase()].execute(new Command(uuid,name,"nick N/A",text,"prefix N/A",b,false))
                } catch(e) { console.log(e); b.chat("An error occured (check console for more info)") }
            } else {
                b.chat("Command not found")
            }
        }
        b.printHelp=(uuid)=>{
            let helpCmds=[];
            for(const i in cmds){
                if(cmds[i].hidden) continue;
                helpCmds.push(b.prefix+i)
            }
            b.tellraw(uuid,JSON.stringify({"text":"Commands: "+helpCmds.join(" ")}));
        }
        b.printCmdHelp=(uuid,cmd)=>{
            b.tellraw(uuid,JSON.stringify({"text":cmd+cmds[cmd].usage+" - "+cmds[cmd].desc}));
        }
    },
    loadCMD:()=>{
        const botplug = []
        const bpl = fs.readdirSync('./plugins/commands')
        for (const i in bpl) {
            if (!bpl[i].endsWith('.js')) {
                continue
            }
            try {
                commandName=bpl[i].split(".js")[0];
                cmds[commandName]=require(`./commands/${bpl[i]}`);
                console.log("Loaded command "+commandName)
                if(cmds[commandName].aliases){
                    for(const j in cmds[commandName].aliases){
                        cmds[cmds[commandName].aliases[j]]={
                            execute:cmds[commandName].execute,
                            desc:"Alias to "+commandName,
                            usage:cmds[commandName].usage,
                            hidden:true,
                            consoleIndex:cmds[commandName].consoleIndex
                        };
                    }
                }
            } catch (e) { console.log(e); }
        }
    },
    cmds
}
