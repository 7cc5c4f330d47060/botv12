const fs = require('fs')
const languages = {}
const loadplug = (botno) => {
  const bpl = fs.readdirSync('util/lang')
  for (const i in bpl) {
    if (!bpl[i].endsWith('.json')) {
      continue
    }
    try {
      languages[bpl[i].split('.')[0]] = require(`./lang/${bpl[i]}`)
    } catch (e) { console.log(e) }
  }
}
loadplug()
module.exports = function (l, msg, with2) {
  let message = msg.replace(/%%/g, '\ue123')
  if (languages[l][message] !== undefined) {
    message = languages[l][message].replace(/%%/g, '\ue123')
  } else if (languages['en-US'][message] !== undefined) {
    message = languages['en-US'][message].replace(/%%/g, '\ue123')
  }
  for (const i in with2) {
    message = message.replace(/%s/, with2[i].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
    message = message.replaceAll(`%${+i + 1}$s`, with2[i].replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
  }
  return message.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
}
