const uuidToInt = require('../util/uuidtoint.js')
module.exports = {
    cs: 4,
    cs_v: 6,
    load: function () {

    },
    loadBot: function (b) {
        b.interval.commandFill = setInterval(() => { b.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}'}`) }, 60000)
        b.ccq = []
        b.blocknoX = 0
        b.blocknoZ = 0
        b.ccStarted = 0
        b.blocknoY = 0
        b.pos = { x: 0, y: 0, z: 0, correct: 0 }

        b.advanceccq = function () {
            if (b.ccq[0] && b.ccq[0].length != 0) {
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
                if (b.blocknoX == module.exports.cs) {
                    b.blocknoY++
                    b.blocknoX = 0
                    if (b.blocknoY == module.exports.cs_v) {
                        b.blocknoZ++
                        b.blocknoY = 0
                        if (b.blocknoZ == module.exports.cs) {
                            b.blocknoZ = 0
                        }
                    }
                }
            }
            b.ccq.splice(0, 1)
        }
        b._client.on("login",()=>{
            b.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}'}`)
        })
        b.on('ccstart', () => {
            setTimeout(() => { b.interval.ccqi = setInterval(b.advanceccq, 3) }, 1000) // 1 Second and 3 Milliseconds
            b.ccStarted = true;
        })
        b.on('chat', (data) => { //
            if (!b.ccStarted && (data.json.translate == 'commands.fill.failed' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate == 'commands.fill.failed') ||
            data.json.translate == 'commands.fill.success' || (data.json.extra && data.json.extra[0] && data.json.extra[0].translate == 'commands.fill.success'))) {
                b.emit('ccstart')
            }
        })
        b._client.on('position', function (a) {
            if (!b.ccStarted) {
                b.original_pos = { x: a.x, y: a.y, z: a.z }
                b.pos = { x: a.x, y: a.y, z: a.z, correct: 1 }
            } else {
                b.pos = { x: a.x, y: a.y, z: a.z, correct: 1 }
                if (a.x != b.original_pos.x || a.z != b.original_pos.z) {
                    b.original_pos = { x: a.x, y: a.y, z: a.z }
                    b.pos.correct = 0
                    b.chat(`/fill ~ 20 ~ ~3 25 ~3 command_block{CustomName:'{"translate":"%s %s","with":[{"translate":"entity.minecraft.ender_dragon"},{"translate":"language.region"}],"color":"#FFAAEE"}'}`)
                }
            }

            // console.log(b.pos);
            b.commandPos = {
                x1: Math.floor(a.x),
                x2: Math.ceil(a.x) + 3,
                z1: Math.floor(a.z),
                z2: Math.ceil(a.z) + 3,
                y1: 20,
                y2: 10
            }
            // b.send("/fill ~5 0 ~5 ~-5 0 ~-5 command_block")
            b._client.write('teleport_confirm', { teleportId: a.teleportId })
        })
        b.tellraw = (uuid, message) => {
            let finalname = ''
            if (uuid == '@a') {
                finalname = '@a'
            } else if (uuid.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/)) {
                finalname = `@a[nbt={UUID:[I;${uuidToInt(uuid)}]}]`
            } else {
                finalname = uuid
            }
            b.ccq.push(`/minecraft:tellraw ${finalname} ${JSON.stringify(message)}`)
        }
    }
}
