module.exports = {
  command_b: function (b, msg, sender) {
    const players = Object.keys(b.players_o)
    const random = players[Math.floor(Math.random() * players.length)]
    // b.send("Command: "+msg+" from UUID "+sender+" ("+username+")")
    /* if(false && b.o.sudo_username){
			if(b.o.partial_op){
				b.send(`/essentials:tp ${sender} ${b.players_o[random].name}`)
				return;
			}
			b.ccq.push(`/essentials:tp ${sender} ${b.players_o[random].name}`)
		} else { */
    if (b.o.partial_op) {
      b.send(`/essentials:tp ${sender} ${random}`)
      return
    }
    b.ccq.push(`/essentials:tp ${sender} ${random}`)
    // }
  },
  command_c: () => {},
  desc: 'Teleport to a random player',
  usage: '',
  aliases: ['playertp']
}
