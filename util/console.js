const readln = require('readline')
module.exports = function (text) {
  readln.cursorTo(process.stdout, 0)
  readln.clearLine(process.stdout, 0)
  process.stdout.write(text + '\n> ') // fake prompt
}
