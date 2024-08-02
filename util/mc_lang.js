const _lang = require('minecraft-data')('1.20.2').language;
const lang = Object.create(null) // Without constructor function
for (const i in _lang) {
  lang[i] = _lang[i]
}
module.exports=lang