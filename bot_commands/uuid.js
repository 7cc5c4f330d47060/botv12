module.exports={
  command:(bot,cmd,uuid)=>{
    bot.write("chat",{message:uuid})
  },
  help:"Find UUID. Useful if the server does not have a bot with this command."
}
