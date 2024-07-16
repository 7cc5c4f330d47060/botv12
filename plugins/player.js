module.exports={
    load:()=>{
    },
    loadBot:(b)=>{
        b.findUUID=(name)=>{
            return "00000000-0000-0000-0000-000000000000"
        }
        b.findRealName=(name)=>{
            return "Stereo Madness"
        }
    }
}