module.exports={
    load:()=>{
        console.log("Loaded on global")
    },
    loadBot:(b)=>{
        console.log(`Loaded on bot ${b.id}`)
    }
}