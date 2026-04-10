const uuidToInt = require('../util/uuidtoint.js')
const plainParser = require('../util/chatparse_plain.js')
const mcParser = require('../util/chatparse_mc.js')
const loader = require('prismarine-item')
const loaderData = require('minecraft-data')
const settings = require('../settings.json')
const Vec3 = require('vec3')

const cs = {
  x: 4,
  y: 6,
  z: 4
}
module.exports = {
  load: function (b) {
    const Item = loader(b._client.version)
    const itemsByName = loaderData(b._client.version).itemsByName
    b.interval.commandFill = setInterval(() => { if (b.sc_tasks.cc) b.sc_tasks.cc.failed = 1 }, 150000)
    b.ccq = []
    b.blocknoX = 0
    b.blocknoY = 0
    b.blocknoZ = 0
    b.ccStarted = false
    b.pos = { x: 0, y: 0, z: 0 }

    b.refillCoreCmd = `/fill ~ 55 ~ ~${cs.x - 1} ${54 + cs.y} ~${cs.z - 1} command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}'}`

    b.advanceccq = function () {
      if (b.host.options.useChat) return
      for (let i = 0; i <= 7; i++) {
        if (b.ccq[0] && b.ccq[0].length !== 0) {
          b.sendCommandNow(b.ccq[0])
        }
        b.ccq.splice(0, 1)
      }
    }

    b.sendCommandNow = function (command) {
      if (settings.showCommandSet) console.log(command)
      const xstart = b.currentChunk.x << 4
      const zstart = b.currentChunk.z << 4
      b._client.write('update_command_block', {
        command: '/',
        location: {
          x: xstart + b.blocknoX,
          y: 15 + b.blocknoY,
          z: zstart + b.blocknoZ
        },
        mode: 2,
        flags: 1
      })
      b._client.write('update_command_block', {
        command: command.substr(0, 32767),
        location: {
          x: xstart + b.blocknoX,
          y: 15 + b.blocknoY,
          z: zstart + b.blocknoZ
        },
        mode: 2,
        flags: 5
      })
      b.blocknoX++
      if (b.blocknoX === 16) {
        b.blocknoY++
        b.blocknoX = 0
        if (b.blocknoY === 2) {
          b.blocknoZ++
          b.blocknoY = 0
          if (b.blocknoZ === 16) {
            b.blocknoZ = 0
          }
        }
      }
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
          if (b.sc_tasks.op.failed) return
          const xstart = b.currentChunk.x << 4
          const zstart = b.currentChunk.z << 4
          const item = new Item(itemsByName.command_block.id, 1)

          b._client.write('set_creative_slot', {
            slot: 36,
            item: Item.toNotch(item)
          })
          // Core filling
          // `fill ${xstart} 55 ${zstart} ${xstart + 15} 55 ${zstart + 15} ${refillPayload}`
          // '/gamerule commandModificationBlockLimit 32768'

          b._client.write('block_dig', {
            status: 0,
            location: { x: b.pos.x, y: b.pos.y - 1, z: b.pos.z }
          })
          b._client.write('block_dig', {
            status: 0,
            location: { x: b.pos.x, y: b.pos.y - 2, z: b.pos.z }
          })
          b._client.write('block_place', {
            hand: 0,
            direction: 0,
            location: { x: b.pos.x, y: b.pos.y - 1, z: b.pos.z },
            cursorX: 0,
            cursorY: 0,
            cursorZ: 0
          })
          b._client.write('block_place', {
            hand: 0,
            direction: 0,
            location: { x: b.pos.x, y: b.pos.y - 2, z: b.pos.z },
            cursorX: 0,
            cursorY: 0,
            cursorZ: 0
          })
          b._client.write('update_command_block', {
            command: `fill ${xstart} 15 ${zstart} ${xstart + 15} 16 ${zstart + 15} command_block`,
            location: { x: b.pos.x, y: b.pos.y - 1, z: b.pos.z },
            mode: 2,
            flags: 5
          })
          b._client.write('update_command_block', {
            command: '/gamerule commandModificationBlockLimit 32768',
            location: { x: b.pos.x, y: b.pos.y - 2, z: b.pos.z },
            mode: 2,
            flags: 5
          })
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
      if (b.sc_tasks.cc) b.sc_tasks.cc.failed = false
      for (let x = 0; x <= 15; x++) {
        for (let y = 15; y <= 16; y++) {
          for (let z = 0; z <= 15; z++) {
            const blockName = chunk.getBlock(Vec3(x, y, z)).name
            if (blockName !== 'command_block' && blockName !== 'repeating_command_block' && blockName !== 'chain_command_block') {
              cf = true
              if (b.sc_tasks.cc) b.sc_tasks.cc.failed = true
              break
            }
          }
          if (cf) break
        }
        if (cf) break
      }
      if (!cf && !b.ccStarted) {
        b.emit('ccstart')
      }
    }, 500)
  }
}
