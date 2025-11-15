import lang from './mc_lang.js'
import consoleColors from './consoleColors.js'

// List from https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html
const escapeHtml = (text: any) => {
  return (text + "")
  .replaceAll("&","&amp;")
  .replaceAll(">","&gt;")
  .replaceAll("<","&lt;")
  .replaceAll('"',"&quot;")
  .replaceAll("'","&#39;")
  .replaceAll("\n","<br>")
}

const process8bitColorChannel = (value: number) => {
  if (value < 65) return 0
  if (value < 115) return 1
  if (value < 155) return 2
  if (value < 195) return 3
  if (value < 235) return 4
  return 5
}
const hexColorParser = (color: string, mode: any) => {
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
  } else if (mode.useHtml) {
    let out = `</span><span style="color: ${color}"`
    const redChannel = Number(`0x${color.slice(1, 3)}`)
    const greenChannel = Number(`0x${color.slice(3, 5)}`)
    const blueChannel = Number(`0x${color.slice(5, 7)}`)
    if (redChannel < 65 && greenChannel < 65 && blueChannel < 65) {
      out += ' class="dmh"'
    } else if (mode.twentyFourBit.lightMode && ((redChannel > 194 && greenChannel > 194 && blueChannel > 194) || greenChannel > 154)) {
      out += ' class="lmh"'
    }
    out += '>'
    return out
  }
}

const processColor = (col: string, rcol: any, mode: any) => {
  let out
  if (col === 'reset') {
    out = rcol
  } else if (col.startsWith('#')) {
    out = hexColorParser(col, mode)
  } else if (mode.useHtml) {
    out = `</span><span class="${mode.fourBit[col]}">`
  } else {
    out = mode.fourBit[col]
  }
  return out
}

const parse = function (_data: any, l = 0, resetColor = consoleColors.none.fourBit.reset, mode: any = consoleColors.none) {
  if (l >= 8) {
    return ''
  }
  let data
  if (typeof _data === 'string') data = { text: _data, color: 'reset' }
  else if (typeof _data === 'number') data = { text: _data + '', color: 'reset' }
  else if (_data.constructor === Array) data = { extra: _data, color: 'reset' }
  else if (_data['']) data = { text: _data[''], color: _data.color ?? 'reset' }
  else data = _data

  let out = ''
  if(mode.useHtml && l === 0) out += '<span class="lw lmh resetColor startColor">'
  if (data.color) {
    out += processColor(data.color, resetColor, mode)
  } else {
    out += processColor('reset', resetColor, mode)
  }
  if (data.text) {
    let _text = data.text
    if (typeof _text === 'number') {
      _text = _text.toString()
    }
    if(mode.useHtml) _text = escapeHtml(_text)
    out += _text.replaceAll('\x1b', '').replaceAll('\x0e', '')
  }
  if (data.translate) {
    let trans = data.translate.replaceAll('%%', '\ud900\ud801').replaceAll('\x1b', '').replaceAll('\x0e', '')
    if(mode.useHtml) trans = escapeHtml(trans)
    if (lang[trans] !== undefined) {
      trans = lang[trans].replace(/%%/g, '\ue123')
      if(mode.useHtml) trans = escapeHtml(trans)
    } else if(data.fallback){
      trans = parse(data.fallback, l + 1, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
    }
    if (data.with) {
      data.with.forEach((item: any, i: number) => {
        const j2 = parse(item, l + 1, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
        trans = trans.replace(/%s/, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
        trans = trans.replaceAll(`%${+i + 1}$s`, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
      })
    }
    out += trans.replaceAll('\ud900\ud801', '%').replaceAll('\ud900\ud804', '%s').replaceAll('\ud900\ud805', '$s')
  }
  if (data.extra) {
    for (const item of data.extra) {
      const parsed = parse(item, l + 1, data.color ? processColor(data.color, resetColor, mode) : resetColor, mode)
      out += parsed
    }
  }
  out += resetColor
  if(mode.useHtml && l === 0) out += '</span>'
  
  
  return out
}
export default function parse2 (_data: any, modeString: string) {
  try {
    const mode: any = consoleColors[modeString]
    let resetColor = mode.fourBit.reset
    if(mode.useHtml) resetColor = `</span><span class="${resetColor}">`
    return parse(_data, 0, resetColor, mode)
  } catch (e) {
    console.error(e)
    return `\x1B[0m\x1B[38;2;255;85;85mAn error occured while parsing a message. See console for more information.\nJSON that caused the error: ${JSON.stringify(_data)}`
  }
}

