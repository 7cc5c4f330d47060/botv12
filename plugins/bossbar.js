// const settings=require("../settings.json");
module.exports = {
  description: 'Big Blue Bubble and the Monster-Handlers hate me right now. I have decompiled My Singing Monsters 3 times, extracted the assets 3 times and I am currently planning to extract and look through the assets of Dawn of Fire. I hope the Monster-Handlers do not find this file, because if they do, I may never be able to play My Singing Monsters or Dawn of Fire again.',
  load: function () {
  },
  load2: function (b) {
    b.bossbar = {}
    b.bossbars = {}
    b.bossbar.create = function (name, display) {
      b.bossbars[name] = {
        name: display,
        maximum: 100,
        value: 0,
        style: 'progress',
        color: 'white'
      }
      b.ccq.push(`/bossbar add ubotv8:${name} ${JSON.stringify(display)}`)
      b.ccq.push(`/bossbar set ubotv8:${name} players @a`)
    }
  }
}
