import lang from './mc_lang.ts'
import consoleColors from './consoleColors.js'

const process8bitColorChannel = (value) => {
  if (value < 65) return 0
  if (value < 115) return 1
  if (value < 155) return 2
  if (value < 195) return 3
  if (value < 235) return 4
  return 5
}
const hexColorParser = (color, mode) => {
  if (!mode.twentyFourBit.enabled || mode.twentyFourBit.bit === 4) { // Hex color parsing to the 4 bit mode has not been implemented yet
    return ''
  }
  if (mode.twentyFourBit.bit === 24) {
    let out = '\x1B[0;'
    const redChannel = Number(`0x${color.slice(1, 3)}`)
    const greenChannel = Number(`0x${color.slice(3, 5)}`)
    const blueChannel = Number(`0x${color.slice(5, 7)}`)
    if (!mode.twentyFourBit.lightMode && redChannel < 64 && greenChannel < 64 && blueChannel < 64) {
      out += '48;2;220;220;220;'
    } else if (mode.twentyFourBit.lightMode && ((redChannel > 192 && greenChannel > 192 && blueChannel > 192) || greenChannel > 160)) {
      out += '48;2;0;0;0;'
    }
    return out + `38;2;${redChannel};${greenChannel};${blueChannel}m`
  } else if (mode.twentyFourBit.bit === 8) {
    let out = '\x1B[0;'
    const redChannel = Number(`0x${color.slice(1, 3)}`)
    const greenChannel = Number(`0x${color.slice(3, 5)}`)
    const blueChannel = Number(`0x${color.slice(5, 7)}`)
    if (!mode.twentyFourBit.lightMode && redChannel < 65 && greenChannel < 65 && blueChannel < 65) {
      out += '48;5;253;'
    } else if (mode.twentyFourBit.lightMode && ((redChannel > 194 && greenChannel > 194 && blueChannel > 194) || greenChannel > 154)) {
      out += '48;5;16;'
    }
    const redOut = process8bitColorChannel(redChannel)
    const greenOut = process8bitColorChannel(greenChannel)
    const blueOut = process8bitColorChannel(blueChannel)
    const colorValue = 16 + 36 * redOut + 6 * greenOut + blueOut
    return out + `38;5;${colorValue}m`
  }
}

const processColor = (col, rcol, mode) => {
  let out
  if (col === 'reset') {
    out = rcol
  } else if (col.startsWith('#')) {
    out = hexColorParser(col, mode)
  } else {
    out = mode.fourBit[col]
  }
  return out
}

const parse = function (_data, l = 0, resetColor = consoleColors.none.fourBit.reset, mode = consoleColors.none) {
  if (l >= 4) {
    return ''
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
    out += processColor(data.color, resetColor, mode)
  } else {
    out += resetColor
  }
  if (data.text) {
    let _text = data.text
    if (typeof _text === 'number') {
      _text = _text.toString()
    }
    out += _text.replaceAll('\x1b', '').replaceAll('\x0e', '')
  }
  if (data.translate) {
    let trans = data.translate.replaceAll('%%', '\ud900\ud801').replaceAll('\x1b', '').replaceAll('\x0e', '')
    if (lang[trans] !== undefined) {
      
      trans = lang[trans].replace(/%%/g, '\ue123')
    } else if(data.fallback){
      trans = parse(data.fallback, l + 1, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
    }
    if (data.with) {
      data.with.forEach((item, i) => {
        const j2 = parse(item, l + 1, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
        trans = trans.replace(/%s/, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
        trans = trans.replaceAll(`%${+i + 1}$s`, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
      })
    }
    out += trans.replaceAll('\ud900\ud801', '%').replaceAll('\ud900\ud804', '%s').replaceAll('\ud900\ud805', '$s')
  }
  if (data.extra) {
    for (const item of data.extra) {
      const parsed = parse(item, l, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
      out += parsed
    }
  }
  out += resetColor
  return out
}
export default function parse2 (_data, modeString) {
  try {
    const mode = consoleColors[modeString]
    return parse(_data, 0, mode.fourBit.reset, mode)
  } catch (e) {
    console.error(e)
    return `\x1B[0m\x1B[38;2;255;85;85mAn error occured while parsing a message. See console for more information.\nJSON that caused the error: ${JSON.stringify(_data)}`
  }
}
