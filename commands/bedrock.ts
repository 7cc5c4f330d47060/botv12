import CommandContext from '../util/CommandContext'
import * as rl from '../util/ratelimit.js'

async function execute (c: CommandContext) {
  const commandQueue: string[] = []
  // Refill bedrock floor in specific area.
  if (!rl.check('bedrock') && c.type !== 'console') {
    c.reply({
      text: 'command.ratelimit',
      parseLang: true,
      with: ['30']
    })
    return
  } else {
    rl.start('bedrock', 30000)
  }
    
  const pos1 = [+c.args[0], +c.args[1]]
  const pos2 = [+c.args[2], +c.args[3]]
  const block = c.args[4] ?? 'minecraft:deepslate'

  const rPos1: number[] = []
  const rPos2: number[] = []

  if(pos1[0] > pos2[0]){
    rPos1.push(pos2[0])
    rPos2.push(pos1[0])
  } else {
    rPos1.push(pos1[0])
    rPos2.push(pos2[0])
  }

  if(pos1[1] > pos2[1]){
    rPos1.push(pos2[1])
    rPos2.push(pos1[1])
  } else {
    rPos1.push(pos1[1])
    rPos2.push(pos2[1])
  }
  
  if(rPos2[0] - rPos1[0] > 96 || rPos2[1] - rPos1[1] > 96){
    c.reply({
      text: 'command.brRefill.oversized',
      parseLang: true
    })
    return
  }

  c.reply({
    text: 'command.brRefill.success',
    parseLang: true,
    with: [
      rPos1[0] + '',
      rPos1[1] + '',
      rPos2[0] + '',
      rPos2[1] + '',
      block
    ]
  })

  for(let x = rPos1[0]; x <= rPos2[0]; x++){
    for(let z = rPos1[1]; z <= rPos2[1]; z++){
      commandQueue.push(`execute in minecraft:overworld run fill ${x} -63 ${z} ${x} -60 ${z} ${block}`)
      commandQueue.push(`execute in minecraft:overworld run setblock ${x} -64 ${z} minecraft:bedrock`)
      if(Math.random() > 0.2) commandQueue.push(`execute in minecraft:overworld run setblock ${x} -63 ${z} minecraft:bedrock`)
      if(Math.random() > 0.4) commandQueue.push(`execute in minecraft:overworld run setblock ${x} -62 ${z} minecraft:bedrock`)
      if(Math.random() > 0.6) commandQueue.push(`execute in minecraft:overworld run setblock ${x} -61 ${z} minecraft:bedrock`)
      if(Math.random() > 0.8) commandQueue.push(`execute in minecraft:overworld run setblock ${x} -60 ${z} minecraft:bedrock`)
    }
  }
  c.bot.commandCore.ccqv2.bedrock.commands = commandQueue
}
const consoleIndex = true
export { execute, consoleIndex }
