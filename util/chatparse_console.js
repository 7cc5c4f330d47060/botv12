const settings = require('../settings.json')
const lang = require('./mc_lang.js')
const _consoleColors = require('./consolecolors.json')

let consoleColors
let consoleColors24
if (_consoleColors[settings.terminalMode]) {
  consoleColors = _consoleColors[settings.terminalMode].fourBit
  consoleColors24 = _consoleColors[settings.terminalMode].twentyFourBit
} else {
  consoleColors = _consoleColors.none.fourBit
  consoleColors24 = _consoleColors.none.twentyFourBit
}

const hexColorParser = (color) => {
  if (!consoleColors24.enabled || consoleColors24.bit !== 24) { // Hex color parsing to the 8 bit and 4 bit modes has not been implemented yet
    return ''
  }
  let out = '\x1B[0;'
  const redChannel = Number('0x' + color.slice(1, 3))
  const greenChannel = Number('0x' + color.slice(3, 5))
  const blueChannel = Number('0x' + color.slice(5, 7))
  if (!consoleColors24.lightMode && redChannel < 64 && greenChannel < 64 && blueChannel < 64) {
    out += '48;2;220;220;220;'
  } else if (consoleColors24.lightMode && ((redChannel > 192 && greenChannel > 192 && blueChannel > 192) || greenChannel > 160)) {
    out += '48;2;0;0;0;'
  }
  return out + `38;2;${redChannel};${greenChannel};${blueChannel}m`
}

const processColor = (col, rcol) => {
  let out
  if (col === 'reset') {
    out = rcol
  } else if (col.startsWith('#')) {
    out = hexColorParser(col)
  } else {
    out = consoleColors[col]
  }
  return out
}

const parse = function (_data, l = 0, resetColor = consoleColors.reset) {
  if (l >= 12) {
    return ['', '', '']
  }
  let data
  if (typeof _data === 'string') {
    data = { text: _data, color: 'reset' }
  } else if (typeof _data === 'number') {
    data = { text: _data + '', color: 'reset' }
  } else if (_data.constructor === Array) {
    data = { extra: _data, color: 'reset' }
  } else {
    data = _data
  }
  if (data['']) {
    data.text = data['']
    if (!data.color) data.color = 'reset'
  }

  let out = ''
  if (data.color) {
    out += processColor(data.color, resetColor)
  } else {
    out += resetColor
  }
  if (data.text) {
    let _text = data.text
    if (typeof _text === 'number') {
      _text = _text.toString()
    }
    out += _text.replaceAll('\x1b', '').replaceAll('\x0e', '') // Remove escape codes and [SO] from console format
  }
  if (data.translate) {
    let trans = data.translate.replace(/%%/g, '\ue123').replaceAll('\x1b', '').replaceAll('\x0e', '') // Remove escape codes from console format
    if (lang[trans] !== undefined) {
      trans = lang[trans].replace(/%%/g, '\ue123')
    }
    for (const i in data.with) {
      const j2 = parse(data.with[i], l + 1, data.color ? processColor(data.color, resetColor) : resetColor)
      trans = trans.replace(/%s/, j2.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
      trans = trans.replaceAll(`%${+i + 1}$s`, j2.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
    }
    out += trans.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
  }
  if (data.extra) {
    for (const i in data.extra) {
      const parsed = parse(data.extra[i], l, data.color ? processColor(data.color, resetColor) : resetColor)
      out += parsed
    }
  }
  out += resetColor
  return out
}
const parse2 = function (_data, l, resetColor) {
  try {
    return parse(_data)
  } catch (e) {
    console.error(e)
    return '\x1B[0m\x1B[38;2;255;85;85mAn error occured while parsing a message. See console for more information.\nJSON that caused the error: ' + JSON.stringify(_data)
  }
}
module.exports = parse2
