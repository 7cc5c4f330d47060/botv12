import uuidToInt from '../util/uuidtoint.js'
import plainParser from '../util/chatparse_plain.js'
import mcParser from '../util/chatparse_mc.js'
import Vec3 from 'vec3'

export default function load (b) {
  b.ccq = []
  b.blocknoX = 0
  b.blocknoZ = 0
  b.ccStarted = false
  b.pos = { x: 0, y: 0, z: 0 }
  const refillPayload = 'command_block{CustomName:\'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.name"}],"color":"#FFAAEE"}\'}'

  b.advanceccq = function () {
    if (b.host.options.useChat) return
    if (b.ccq[0] && b.ccq[0].length !== 0) {
      const xstart = b.currentChunk.x << 4
      const zstart = b.currentChunk.z << 4
      b._client.write('update_command_block', {
        command: '/',
        location: {
          x: xstart + b.blocknoX,
          y: 55,
          z: zstart + b.blocknoZ
        },
        mode: 2,
        flags: 1
      })
      b._client.write('update_command_block', {
        command: b.ccq[0].substr(0, 32767),
        location: {
          x: xstart + b.blocknoX,
          y: 55,
          z: zstart + b.blocknoZ
        },
        mode: 2,
        flags: 5
      })
      b.blocknoX++
      if (b.blocknoX === 16) {
        b.blocknoZ++
        b.blocknoX = 0
        if (b.blocknoZ === 16) {
          b.blocknoZ = 0
        }
      }
    }
    b.ccq.splice(0, 1)
  }

  b._client.on('login', () => {
    b._client.write('settings', {
      locale: 'ru_RU',
      viewDistance: 4,
      chatFlags: 0, // Enable full chat functionality
      chatColors: true,
      skinParts: 127, // Allow the second layer of the skin, when the bot is sudoed to do /skin
      mainHand: 1 // Right hand
    })
    if (!b.host.options.useChat) {
      b.add_sc_task('cc', () => {
        const xstart = b.currentChunk.x << 4
        const zstart = b.currentChunk.z << 4
        b.chat(`/fill ${xstart} 55 ${zstart} ${xstart + 15} 55 ${zstart + 15} ${refillPayload}`)
      })
      b.add_sc_task('cc_size', () => {
        b.chat('/gamerule commandModificationBlockLimit 32768')
      })
    }
  })
  b.on('ccstart', () => {
    setTimeout(() => { b.interval.ccqi = setInterval(b.advanceccq, 2) }, 1000)
    b.ccStarted = true
  })
  b.on('chat_unparsed', (data) => {
    if (data.json.translate === 'commands.fill.failed' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'commands.fill.failed') ||
          data.json.translate === 'commands.fill.success' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'commands.fill.success')) {
      if (!b.ccStarted) {
        b.emit('ccstart')
      }
      b.sc_tasks.cc.failed = 0
      b.sc_tasks.cc_size.failed = 0
    } else if (data.json.translate === 'commands.fill.toobig' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate === 'commands.fill.toobig')) {
      b.sc_tasks.cc_size.failed = 1
    }
  })

  b.tellraw = (uuid, message) => {
    let finalname = ''
    if (b.host.options.useChat) {
      if (b.host.options.useAmpersandColorCodes) {
        b.chat(mcParser(message).replaceAll('§', '&'))
      } else {
        b.chat(plainParser(message))
      }
    } else {
      if (uuid === '@a') {
        finalname = '@a'
      } else if (uuid.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
        finalname = `@a[nbt={UUID:[I;${uuidToInt(uuid)}]}]`
      } else {
        finalname = uuid
      }
      let tellrawCommand
      if (b.host.options.isVanilla) {
        tellrawCommand = 'tellraw'
      } else {
        tellrawCommand = 'minecraft:tellraw'
      }
      b.ccq.push(`/${tellrawCommand} ${finalname} ${JSON.stringify(message)}`)
    }
  }

  b.interval.coreCheck = setInterval(() => {
    let cf = false
    if (!b.currentChunk || !b.chunks[b.currentChunk.x] || !b.chunks[b.currentChunk.x][b.currentChunk.z]) return
    const chunk = b.chunks[b.currentChunk.x][b.currentChunk.z]
    for (let x = 0; x <= 15; x++) {
      for (let z = 0; z <= 15; z++) {
        const blockName = chunk.getBlock(new Vec3(x, 55, z)).name
        if (blockName !== 'command_block' && blockName !== 'repeating_command_block' && blockName !== 'chain_command_block') {
          cf = true
          if (b.sc_tasks.cc) b.sc_tasks.cc.failed = true
          break
        }
      }
      if (cf) break
    }
  }, 500)
}
