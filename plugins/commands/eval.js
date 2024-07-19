const textformat=require("../../util/textformat.js")
const index=require("../../index.js") //Not used in the code, but may be used by users of the command
module.exports={
    execute: (c)=>{
        if(c.type!="console"){
            c.reply(textformat("Eval command is currently not available to players in Minecraft due to security issues."))
        };
        try{
            console.log(eval(c.args.join(" ")));
        }catch(e){
            console.error(e);
        }
    },
    desc: "Run JavaScript code", // Command description
    usage: '', // Command usage
    hidden: true
}
