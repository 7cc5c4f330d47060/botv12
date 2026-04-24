import lang from './mc_lang.js'
import consoleColors from './consoleColors.js'
import type ConsoleColorSetting from '../../interface/ConsoleColorSetting.js'
import type JsonFormat from '../../interface/JsonFormat.js'

// List from https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html
const escapeHtml = (text: string) => {
  return (text + '')
    .replaceAll('&', '&amp;')
    .replaceAll('>', '&gt;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('\n', '<br>')
}

const process8bitColorChannel = (value: number) => {
  if (value < 65) return 0
  if (value < 115) return 1
  if (value < 155) return 2
  if (value < 195) return 3
  if (value < 235) return 4
  return 5
}
const hexColorParser = (color: string, mode: ConsoleColorSetting) => {
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
    } else if (mode.twentyFourBit.lightMode && ((redChannel > 160 && greenChannel > 160 && blueChannel > 160) || greenChannel > 140)) {
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
    } else if (mode.twentyFourBit.lightMode && ((redChannel > 160 && greenChannel > 160 && blueChannel > 160) || greenChannel > 140)) {
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
    out += ' class="'
    if (redChannel < 65 && greenChannel < 65 && blueChannel < 65) {
      out += 'dmh '
    } else if ((redChannel > 160 && greenChannel > 160 && blueChannel > 160) || greenChannel > 140) {
      out += 'lmh '
    }
    return out
  }
  return ''
}

const processColor = (col: string, rcol: string, format: Record<string, boolean>, mode: ConsoleColorSetting) => {
  let out = ''
  if (mode.useHtml) {
    if (col === 'reset') {
      out = rcol
    } else if (col.startsWith('#')) {
      out = hexColorParser(col, mode)
    } else {
      out = `</span><span class="${mode.fourBit[col]} `
    }
    if (format.bold) out += 'chat_bold '
    if (format.italic) out += 'chat_italic '
    if (format.underlined) out += 'chat_ul '
    if (format.strikethrough) out += 'chat_st '
    if (out.slice(-1) === ' ') out = out?.slice(0, out.length - 1)
    out += '">'
  } else if (col === 'reset') {
    out = rcol
  } else if (col.startsWith('#')) {
    out = hexColorParser(col, mode)
  } else {
    out = mode.fourBit[col]
  }
  return out
}

const defaultFormat = {
  bold: false,
  italic: false,
  underlined: false,
  strikethrough: false
}

const parse = function (_data: JsonFormat | string | number, l = 0, resetColor = consoleColors.none.fourBit.reset, resetFormat = defaultFormat, mode: ConsoleColorSetting = consoleColors.none) {
  if (l >= 8) {
    return ''
  }
  let data
  if (typeof _data === 'string') data = { text: _data, color: 'reset' }
  else if (typeof _data === 'number') data = { text: _data + '', color: 'reset' }
  // else if (_data.constructor === Array) data = { extra: _data, color: 'reset' }
  else if (_data['']) data = { text: _data[''], color: _data.color ?? 'reset' }
  else data = _data

  let out = ''
  if (mode.useHtml && l === 0) out += '<span class="lw lmh resetColor startColor">'
  const formatSettings = {
    bold: data.bold ?? resetFormat.bold,
    italic: data.italic ?? resetFormat.italic,
    underlined: data.underlined ?? resetFormat.underlined,
    strikethrough: data.strikethrough ?? resetFormat.strikethrough
  }
  if (data.color) {
    out += processColor(data.color, resetColor, formatSettings, mode)
  } else {
    out += processColor('reset', resetColor, formatSettings, mode)
  }
  if (data.text) {
    let _text = data.text
    if (typeof _text === 'number') {
      _text = _text.toString()
    }
    if (mode.useHtml) _text = escapeHtml(_text)
    out += _text.replaceAll('\x1b', '').replaceAll('\x0e', '')
  }
  if (data.translate) {
    let color = ''
    if (data.color) {
      color = processColor(data.color, resetColor, formatSettings, mode)
      if (mode.useHtml) {
        color = color.slice(0, -2)
        if (!(color.slice(-7) === 'class="')) color += ' '
      }
    } else color = resetColor

    let trans = data.translate.replaceAll('%%', '\ud900\ud801').replaceAll('\x1b', '').replaceAll('\x0e', '')
    if (mode.useHtml) trans = escapeHtml(trans)
    if (lang[trans] !== undefined) {
      trans = lang[trans].replace(/%%/g, '\ue123')
      if (mode.useHtml) trans = escapeHtml(trans)
    } else if (data.fallback) {
      trans = parse(data.fallback, l + 1, color, formatSettings, mode)
    }

    if (data.with) {
      data.with.forEach((item: string | JsonFormat, i: number) => {
        const j2 = parse(item, l + 1, color, formatSettings, mode)
        trans = trans.replace(/%s/, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
        trans = trans.replaceAll(`%${+i + 1}$s`, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
      })
    }
    out += trans.replaceAll('\ud900\ud801', '%').replaceAll('\ud900\ud804', '%s').replaceAll('\ud900\ud805', '$s')
  }
  if (data.extra) {
    for (const item of data.extra) {
      let color = ''
      if (data.color) {
        color = processColor(data.color, resetColor, formatSettings, mode)
        if (mode.useHtml) {
          color = color.slice(0, -2)
          if (!(color.slice(-7) === 'class="')) color += ' '
        }
      } else color = resetColor

      const parsed = parse(item, l + 1, color, formatSettings, mode)
      out += parsed
    }
  }
  out += resetColor
  if (mode.useHtml) out += '">'
  if (mode.useHtml && l === 0) out += '</span>'

  return out
}
export default function parse2 (_data: JsonFormat | string, modeString: string) {
  try {
    const mode: ConsoleColorSetting = consoleColors[modeString]
    let resetColor = mode.fourBit.reset
    if (mode.useHtml) resetColor = `</span><span class="${resetColor} `
    return parse(_data, 0, resetColor, defaultFormat, mode)
  } catch (e) {
    console.error(e)
    return `\x1B[0m\x1B[38;2;255;85;85mAn error occurred while parsing a message. See console for more information.\nJSON that caused the error: ${JSON.stringify(_data)}`
  }
}
