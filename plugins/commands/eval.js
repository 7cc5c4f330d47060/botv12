const textformat=require("../../util/textformat.js")
const index=require("../../index.js") // Not used in the code, but may be used by users of the command
module.exports={
    execute: (c)=>{
        try{
            console.log(eval(c.args.join(" ")));
        }catch(e){
            console.error(e);
        }
    },
    hidden: true,
    level: 3
}
