const version = require("../../version.json")
const settings = require('../../settings.json')
const getMessage = require('../../util/lang.js')
const cp = require('child_process')
module.exports = {
  execute: function (c) {
    c.reply({text:getMessage(c.lang,"command.about.author",[settings.name])});
    c.reply({text:""});
    let botVersion=version.bot;
    let gitCommit;
    try {
      gitCommit = cp.execSync('git rev-parse --short HEAD').toString('UTF-8').split('\n')[0];
    } catch(e){
      gitCommit = false
    }
    if(gitCommit){
      botVersion+=` (${gitCommit})`
    }
    c.reply({text:getMessage(c.lang,"command.about.version",[botVersion])});
    c.reply({text:""});
    c.reply({text:getMessage(c.lang,"command.about.serverinfo")})
  },
  aliases: ["info"]
}
