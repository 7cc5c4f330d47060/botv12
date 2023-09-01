const index = require('../index.js')
const readln = require('readline')
module.exports = {
  command_b: function (b) {
    // nothing
  },
  command_c: function (msg) {
    console.log(eval(msg.slice(5)))
  },
  desc: 'Run JavaScript code',
  usage: ' <code>',
  hidden: true
}
