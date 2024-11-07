import { default as settings } from '../settings.json' with {type: "json"}
import { default as version } from '../version.json' with {type: "json"}
import { bots } from "../index.js"
import botVersion from "../util/version.js"
import chatlog from '../util/chatlog.js'

process.on("uncaughtException",(e, o)=>{
  for(const i in bots){
    try{
      bots[i].ccq[0]=`/tellraw ${version.botAuthor} ${
        JSON.stringify({
          translate: "%s\n",
          color: settings.colors.fatalError,
          with: [
            `An error occured and ${version.botName} will now shut down.`
          ]
        })
      }`
      bots[i].advanceccq()
      const stack = e.stack.split("\n")
      for(const item of stack){
        bots[i].ccq[0]=`/tellraw ${version.botAuthor} ${
          JSON.stringify({
            text: item,
            color: settings.colors.fatalError
          })
        }`
        bots[i].advanceccq()
      }
      bots[i].ccq[0]=`/tellraw ${version.botAuthor} ${
        JSON.stringify({
          translate: "\n%s",
          color: settings.colors.fatalError,
          with: [
            [
              "Additional info:\n",
              `Bot version: ${botVersion}`
            ]
          ]
        })
      }`
      bots[i].advanceccq() // Force the command queue to advance
    } catch (e) {}
  }
  chatlog("error", e.stack)
  console.error(e)
  process.exit(1)
})

export default function load (b) {
  // Due to the nature of this plugin, it does not need to do anything at the bot level
}