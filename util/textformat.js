const settings = require('../settings.json')
module.exports = function (text) {
  return JSON.stringify({
    translate: '[%s] %s',
    color: '#FFAAFF',
    with: [
      {
        text: settings.name,
        color: 'light_purple'
      },
      {
        text,
        color: 'white'
      }
    ]
  })
}
