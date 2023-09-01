const crypto = require('crypto')
module.exports = function (username) {
  return crypto.createHash('sha256').update((Math.floor(Date.now() / 10000) + '') + username + 'hcghwajdnhkcfafmc89dj2lsoco8fyuifjkaeha23hfx3o9ao').digest('hex')
}
