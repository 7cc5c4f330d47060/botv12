import uuidToInt from '../util/uuidtoint.js'
import plainParser from '../util/chatparse_plain.js'
import mcParser from '../util/chatparse_mc.js'
const cs = {
  x: 16,
  y: 1,
  z: 16
}

const r16 = number => {
  return Math.floor(number/16)*16
}

export default function load (b) {
  b.interval.commandFill = setInterval(() => { if (b.sc_tasks.cc) b.sc_tasks.cc.failed = 1 }, 150000)
  b.ccq = []
  b.blocknoX = 0
  b.blocknoZ = 0
  b.ccStarted = false
  b.blocknoY = 0
  b.pos = { x: 0, y: 0, z: 0 }
  const refillPayload = `command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.name"}],"color":"#FFAAEE"}'}`
  
  b.advanceccq = function () {
    if (b.host.options.useChat) return
    if (b.ccq[0] && b.ccq[0].length !== 0) {
      b._client.write('update_command_block', {
        command: '/',
        location: {
          x: b.commandPos.x + b.blocknoX,
          y: b.commandPos.y + b.blocknoY,
          z: b.commandPos.z + b.blocknoZ
        },
        mode: 2,
        flags: 1
      })
      b._client.write('update_command_block', {
        command: b.ccq[0].substr(0, 32767),
        location: {
          x: b.commandPos.x + b.blocknoX,
          y: b.commandPos.y + b.blocknoY,
          z: b.commandPos.z + b.blocknoZ
        },
        mode: 2,
        flags: 5
      })
      b.blocknoX++
      if (b.blocknoX === cs.x) {
        b.blocknoY++
        b.blocknoX = 0
        if (b.blocknoY === cs.y) {
          b.blocknoZ++
          b.blocknoY = 0
          if (b.blocknoZ === cs.z) {
            b.blocknoZ = 0
          }
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
        const xstart = r16(b.pos.x);
        const zstart = r16(b.pos.z);
        b.chat(`/fill ${xstart} 55 ${zstart} ${xstart + cs.x - 1} 55 ${zstart + cs.z - 1} ${refillPayload}`)
      }, true)
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
  b._client.on('position', function (data) {
    if (!b.ccStarted) {
      b.original_pos = { x: r16(data.x), y: data.y, z: r16(data.z) }
      b.pos = { x: data.x, y: data.y, z: data.z }
    } else {
      b.pos = { x: data.x, y: data.y, z: data.z }
      if (r16(data.x) !== b.original_pos.x || r16(data.z) !== b.original_pos.z) {
        b.original_pos = { x: r16(data.x), y: data.y, z: r16(data.z) }
        b.sc_tasks.cc.failed = 1
      }
    }
    b.commandPos = {
      x: r16(data.x),
      z: r16(data.z),
      y: 55
    }
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
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
}
