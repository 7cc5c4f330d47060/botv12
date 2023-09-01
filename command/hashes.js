// const index=require("../../index.js");
const genCode = require('../util/genhash')
module.exports = {
  command_b: function (b) {
    // nothing
  },
  command_c: function (msg) {
    console.log(genCode(msg.split(' ')[1]))
    console.log('Use this code fast! It isn\'t valid for long.')
  },
  desc: 'Get hash for username',
  usage: ' <username>',
  hidden: true
}
