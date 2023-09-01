const msg = require('./!message.js')
const { wordDetect } = require('./kick.js')
module.exports = {
  load: function () {
  },
  load2: function (b) {
    b.players = {}
    b.players_o = {}
    b.on('player_info', function (packet) {
      // console.log(packet)
      if (packet.action == 0) {
        for (const i in packet.data) {
          /* if(blacklist.includes(packet.data[i].name) || wordDetect(packet.data[i].name) || (b.whitelist==true && !iswl(packet.data[i].name,b.username))){
						//console.log("bad name dewtectyi")
						b.crashplayer(packet.data[i].name,packet.data[i].UUID);
						b.kick(packet.data[i].name,packet.data[i].UUID,"username");
					} */
          if (packet.data[i].displayName) {
            b.players[packet.data[i].UUID] = [msg.parse(JSON.parse(packet.data[i].displayName))[2], msg.parse(packet.data[i].name)[0]]
          } else {
            b.players[packet.data[i].UUID] = ['@a', msg.parse(packet.data[i].name)[0]]
          }
          b.players_o[packet.data[i].UUID] = packet.data[i]
          b.emit('playerJoined', packet.data[i].name, packet.data[i].UUID)
        }
      } else if (packet.action == 3) {
        for (const i in packet.data) {
          if (b.players[packet.data[i].UUID] && packet.data[i].displayName) {
            const newname = msg.parse(JSON.parse(packet.data[i].displayName))[2]
            b.players[packet.data[i].UUID][0] = newname
            b.emit('displayNameChange', packet.data[i].UUID, newname)
          }
          if (b.players_o[packet.data[i].UUID] && packet.data[i].displayName) {
            b.players_o[packet.data[i].UUID].displayName = packet.data[i].displayName
          }
        }
      } else if (packet.action == 63) {
        for (const i in packet.data) {
          packet.data[i].name = packet.data[i].player.name
          /* if(blacklist.includes(packet.data[i].name) || wordDetect(packet.data[i].name) || (b.whitelist==true && iswl(packet.data[i].name,b.username))){
						//console.log("bad name dewtectyi")
						b.crashplayer(packet.data[i].name,packet.data[i].uuid);
						b.kick(packet.data[i].name,packet.data[i].uuid,"username");
					} */
          if (packet.data[i].displayName) {
            b.players[packet.data[i].uuid] = [msg.parse(JSON.parse(packet.data[i].displayName))[0], msg.parse(packet.data[i].name)[0]]
          } else {
            b.players[packet.data[i].uuid] = ['@a', msg.parse(packet.data[i].name)[0]]
          }
          b.players_o[packet.data[i].uuid] = packet.data[i]
          b.emit('playerJoined', packet.data[i].name, packet.data[i].uuid)
        }
      } else if ((packet.action >> 5) & 1) {
        for (const i in packet.data) {
          if (b.players[packet.data[i].uuid] && packet.data[i].displayName) {
            const newname = msg.parse(JSON.parse(packet.data[i].displayName))[2]
            b.players[packet.data[i].uuid][0] = newname
            b.emit('displayNameChange', packet.data[i].uuid, newname)
          }
          if (b.players_o[packet.data[i].uuid] && packet.data[i].displayName) {
            b.players_o[packet.data[i].uuid].displayName = packet.data[i].displayName
          }
        }
      } else if (packet.action == 4) {
        for (const i in packet.data) {
          b.emit('_player_remove', { players: [packet.data[i].UUID] })
        }
      }
    })
    const remove = function (packet) {
      // console.log(packet);
      for (const i in packet.players) {
        // console.log(b.players_o[packet.players[i]])
        delete b.players_o[packet.players[i]]
        // console.log(b.players_o[packet.players[i]])
      }
    }
    b.on('player_remove', remove)
    b.on('_player_remove', remove)
  }
}
