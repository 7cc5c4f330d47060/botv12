import uuidToInt from '../util/uuidtoint.js'
import chatParser from '../util/chatparse.js'
import Vec3 from 'vec3'
import loader from 'prismarine-item'
import { default as loaderData } from 'minecraft-data'
import settings from '../settings.js'
import UBotClient from '../util/UBotClient.js'

export default function load (b: UBotClient) {
  const Item = loader(b.registry)
  const itemsByName = loaderData(b._client.version).itemsByName
  b.commandCore = {}
  b.commandCore.ccq = []
  b.commandCore.blocknoX = 0
  b.commandCore.blocknoZ = 0
  b.commandCore.ccStarted = false
  b.position.pos = { x: 0, y: 0, z: 0 }
  const refillPayload = 'command_block'

  b.commandCore.advanceccq = function () {
    if (b.host.options.useChat) return
    if (b.commandCore.ccq[0] && b.commandCore.ccq[0].length !== 0) {
      b.commandCore.sendCommandNow(b.commandCore.ccq[0])
    }
    b.commandCore.ccq.splice(0, 1)
  }

  b.commandCore.sendCommandNow = function (command) {
    if (settings.showCommandSet) console.log(command)
    const xstart = b.position.currentChunk.x << 4
    const zstart = b.position.currentChunk.z << 4
    b._client.write('update_command_block', {
      command: '/',
      location: {
        x: xstart + b.commandCore.blocknoX,
        y: 55,
        z: zstart + b.commandCore.blocknoZ
      },
      mode: 2,
      flags: 1
    })
    b._client.write('update_command_block', {
      command: command.substr(0, 32767), 
      location: {
        x: xstart + b.commandCore.blocknoX,
        y: 55,
        z: zstart + b.commandCore.blocknoZ
      },
      mode: 2,
      flags: 5
    })
    b.commandCore.blocknoX++
    if (b.commandCore.blocknoX === 16) {
      b.commandCore.blocknoZ++
      b.commandCore.blocknoX = 0
      if (b.commandCore.blocknoZ === 16) {
        b.commandCore.blocknoZ = 0
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
      mainHand: 0 // Left hand, apparently
    })
    if (!b.host.options.useChat) {
      b.selfCare.addTask('cc', () => {
        const xstart = b.position.currentChunk.x << 4
        const zstart = b.position.currentChunk.z << 4
        const item = new Item(itemsByName.command_block.id, 1)

        b._client.write('set_creative_slot', {
          slot: 36,
          item: Item.toNotch(item)
        })
        // Core filling
        //`fill ${xstart} 55 ${zstart} ${xstart + 15} 55 ${zstart + 15} ${refillPayload}`
        //'/gamerule commandModificationBlockLimit 32768'

        b._client.write('block_dig', {
          status: 0,
          location: { x: b.position.pos.x, y: b.position.pos.y - 1, z: b.position.pos.z }
        })
        b._client.write('block_dig', {
          status: 0,
          location: { x: b.position.pos.x, y: b.position.pos.y - 2, z: b.position.pos.z }
        })
        b._client.write('block_place', {
          hand: 0,
          direction: 0,
          location: { x: b.position.pos.x, y: b.position.pos.y - 1, z: b.position.pos.z },
          cursorX: 0,
          cursorY: 0,
          cursorZ: 0
        })
        b._client.write('block_place', {
          hand: 0,
          direction: 0,
          location: { x: b.position.pos.x, y: b.position.pos.y - 2, z: b.position.pos.z },
          cursorX: 0,
          cursorY: 0,
          cursorZ: 0
        })
        b._client.write('update_command_block', {
          command: `fill ${xstart} 55 ${zstart} ${xstart + 15} 55 ${zstart + 15} ${refillPayload}`, 
          location: { x: b.position.pos.x, y: b.position.pos.y - 1, z: b.position.pos.z },
          mode: 2,
          flags: 5
        })
        b._client.write('update_command_block', {
          command: '/gamerule commandModificationBlockLimit 32768', 
          location: { x: b.position.pos.x, y: b.position.pos.y - 2, z: b.position.pos.z },
          mode: 2,
          flags: 5
        })
      })
    }
  })
  b.on('ccstart', () => {
    setTimeout(() => {
      b.interval.ccqi = setInterval(() => {
        for (let i = 0; i < 7; i++) b.commandCore.advanceccq()
      }, 2)
    }, 1000)
    b.commandCore.ccStarted = true
  })

  b.commandCore.tellraw = (uuid, message) => {
    let finalname = ''
    if (b.host.options.useChat) {
      if (b.host.options.useAmpersandColorCodes) {
        b.clientChat.send(chatParser(message, 'mcAmpersand'))
      } else {
        b.clientChat.send(chatParser(message, 'none'))
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
      b.commandCore.ccq.push(`/${tellrawCommand} ${finalname} ${JSON.stringify(message)}`)
    }
  }

  b.interval.coreCheck = setInterval(() => {
    let cf = false
    if (!b.position.currentChunk || !b.chunks[b.position.currentChunk.x] || !b.chunks[b.position.currentChunk.x][b.position.currentChunk.z]) return
    const chunk = b.chunks[b.position.currentChunk.x][b.position.currentChunk.z]
    if (b.selfCare.tasks.cc) b.selfCare.tasks.cc.failed = false
    for (let x = 0; x <= 15; x++) {
      for (let z = 0; z <= 15; z++) {
        const blockName = chunk.getBlock(Vec3(x, 55, z)).name
        if (blockName !== 'command_block' && blockName !== 'repeating_command_block' && blockName !== 'chain_command_block') {
          cf = true
          if (b.selfCare.tasks.cc) b.selfCare.tasks.cc.failed = true
          break
        }
      }
      if (cf) break
    }
    if (!cf && !b.commandCore.ccStarted) {
      b.emit('ccstart')
    }
  }, 500)
}
