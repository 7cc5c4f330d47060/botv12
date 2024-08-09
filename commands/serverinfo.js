const os = require('os')
const cp = require('child_process')
const { getMessage, formatTime } = require('../util/lang.js')
const fs = require('fs')
const botVersion = require('../util/version.js')

module.exports = {
  execute: function (c) {
    c.reply({
      text: getMessage(c.lang, 'command.serverinfo.deprecated')
    })
  }
}
