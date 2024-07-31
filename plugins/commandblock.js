const uuidToInt = require('../util/uuidtoint.js')
module.exports = {
  cs: 4,
  cs_v: 6,
  load: function (b) {
    b.interval.commandFill = setInterval(() => { if (b.sc_tasks.cc) b.sc_tasks.cc.failed = 1 }, 60000)
    b.ccq = []
    b.blocknoX = 0
    b.blocknoZ = 0
    b.ccStarted = 0
    b.blocknoY = 0
    b.pos = { x: 0, y: 0, z: 0, correct: 0 }

    b.advanceccq = function () {
      if (b.ccq[0] && b.ccq[0].length !== 0) {
        b._client.write('update_command_block', {
          command: b.ccq[0],
          location: {
            x: b.commandPos.x1 + b.blocknoX,
            y: b.commandPos.y1 + b.blocknoY,
            z: b.commandPos.z1 + b.blocknoZ
          },
          mode: 2,
          flags: 1
        })
        b._client.write('update_command_block', {
          command: b.ccq[0],
          location: {
            x: b.commandPos.x1 + b.blocknoX,
            y: b.commandPos.y1 + b.blocknoY,
            z: b.commandPos.z1 + b.blocknoZ
          },
          mode: 2,
          flags: 5
        })
        b.blocknoX++
        if (b.blocknoX === module.exports.cs) {
          b.blocknoY++
          b.blocknoX = 0
          if (b.blocknoY === module.exports.cs_v) {
            b.blocknoZ++
            b.blocknoY = 0
            if (b.blocknoZ === module.exports.cs) {
              b.blocknoZ = 0
            }
          }
        }
      }
      b.ccq.splice(0, 1)
    }
    b._client.on('login', () => {
      b.add_sc_task('cc', '/fill ~ 55 ~ ~3 60 ~3 command_block{CustomName:\'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}\'}', true, true)
      b.add_sc_task('cc_size', '/gamerule commandModificationBlockLimit 32767', true, false, true)
    })
    b.on('ccstart', () => {
      setTimeout(() => { b.interval.ccqi = setInterval(b.advanceccq, 3) }, 1000) // 1 Second and 3 Milliseconds
      b.ccStarted = true
    })
    b.on('chat', (data) => {
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
    b._client.on('position', function (a) {
      if (!b.ccStarted) {
        b.original_pos = { x: a.x, y: a.y, z: a.z }
        b.pos = { x: a.x, y: a.y, z: a.z, correct: 1 }
      } else {
        b.pos = { x: a.x, y: a.y, z: a.z, correct: 1 }
        if (a.x !== b.original_pos.x || a.z !== b.original_pos.z) {
          b.original_pos = { x: a.x, y: a.y, z: a.z }
          b.pos.correct = 0
          b.sc_tasks.cc.failed = 1
        }
      }

      b.commandPos = {
        x1: Math.floor(a.x),
        z1: Math.floor(a.z),
        y1: 55
      }
      b._client.write('teleport_confirm', { teleportId: a.teleportId })
    })
    b.tellraw = (uuid, message) => {
      let finalname = ''
      if (uuid === '@a') {
        finalname = '@a'
      } else if (uuid.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
        finalname = `@a[nbt={UUID:[I;${uuidToInt(uuid)}]}]`
      } else {
        finalname = uuid
      }
      let tellrawCommand;
      if(b.host.options.isVanilla){
        tellrawCommand = "tellraw";
      } else {
        tellrawCommand = "minecraft:tellraw";
      }
      b.ccq.push(`/${tellrawCommand} ${finalname} ${JSON.stringify(message)}`)
    }
  }
}
