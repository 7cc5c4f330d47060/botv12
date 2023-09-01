module.exports = {
  command_b: function (b) {
    // b.ccq.push(`/tellraw @a [{"text":"${b.username.replace(/=/,"\\u003d")}","color":"gray"},{"text":" left the game","color":"yellow"}]`)
    b.tellraw('@a', JSON.stringify({
      translate: 'multiplayer.player.left',
      with: [
        { selector: b.uuid }
      ],
      color: 'yellow'
    }))
  },
  command_c: function () {
    process.exit(2)
  },
  desc: 'Closes the bot',
  usage: ''
}
