import { lang } from './mc_lang.js'
const parse = function (_data, l = 0) {
  if (l >= 4) {
    return ''
  }
  let data
  if (typeof _data === 'string') {
    data = { text: _data }
  } else if (typeof _data === 'number') {
    data = { text: _data + '' }
  } else if (_data.constructor === Array) {
    data = { extra: _data }
  } else {
    data = _data
  }
  let out = ''
  if (data['']) {
    data.text = data['']
  }
  if (data.text) {
    let _text = data.text
    if (typeof _text === 'number') {
      _text = _text.toString()
    }
    out += _text
  }
  if (data.translate) {
    let trans = data.translate.replace(/%%/g, '\ue123')
    if (lang[trans] !== undefined) {
      trans = lang[trans].replace(/%%/g, '\ue123')
    }
    if (data.with) {
      data.with.forEach((item, i) => {
        const j2 = parse(item, l + 1)
        trans = trans.replace(/%s/, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
        trans = trans.replaceAll(`%${+i + 1}$s`, j2.replaceAll('%s', '\ud900\ud804').replaceAll('$s', '\ud900\ud805'))
      })
    }
    out += trans.replaceAll('\ud900\ud801', '%').replaceAll('\ud900\ud804', '%s').replaceAll('\ud900\ud805', '$s')
  }
  if (data.extra) {
    for (const item of data.extra) {
      const parsed = parse(item, l)
      out += parsed
    }
  }
  return out
}
export default function parse2 (_data, l) {
  try {
    return parse(_data)
  } catch (e) {
    console.error(e)
    return `An error occured while parsing a message. See console for more information. JSON that caused the error: ${JSON.stringify(_data)}`
  }
}
