import { lang } from './mc_lang.js'

const consoleColors = {
  dark_red: '§4',
  red: '§c',
  dark_green: '§2',
  green: '§a',
  gold: '§6',
  yellow: '§e',
  dark_blue: '§1',
  blue: '§9',
  dark_purple: '§5',
  light_purple: '§d',
  dark_aqua: '§3',
  aqua: '§b',
  black: '§0',
  gray: '§7',
  dark_gray: '§8',
  white: '§f',
  reset: '§r§f'
}

const processColor = (col, rcol) => {
  let out
  if (col === 'reset') {
    out = rcol
  } else if (col.startsWith('#')) {
    out = `§${col}`
  } else {
    out = consoleColors[col]
  }
  return out
}

const parse = function (_data, l = 0, resetColor = consoleColors.reset) {
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
    out += processColor(data.color, resetColor)
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
    }
    if (data.with) {
      data.with.forEach((item, i) => {
        const j2 = parse(item, l + 1, data.color ? processColor(data.color, resetColor) : resetColor)
        trans = trans.replace(/%s/, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
        trans = trans.replaceAll(`%${+i + 1}$s`, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
      })
    }
    out += trans.replaceAll('\ud900\ud801', '%').replaceAll('\ud900\ud804', '%s').replaceAll('\ud900\ud805', '$s')
  }
  if (data.extra) {
    for (const item of data.extra) {
      const parsed = parse(item, l, data.color ? processColor(data.color, resetColor) : resetColor)
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
    return `\x1B[0m\x1B[38;2;255;85;85mAn error occured while parsing a message. See console for more information.\nJSON that caused the error: ${JSON.stringify(_data)}`
  }
}
export { parse2 }
