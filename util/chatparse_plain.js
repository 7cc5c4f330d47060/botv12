const lang = require('./mc_lang.js')
const parse = function (_data, l = 0) {
  if (l >= 12) {
    return ['', '', '']
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
    for (const i in data.with) {
      const j2 = parse(data.with[i], l + 1)
      trans = trans.replace(/%s/, j2.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
      trans = trans.replaceAll(`%${+i + 1}$s`, j2.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
    }
    out += trans.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
  }
  if (data.extra) {
    for (const i in data.extra) {
      const parsed = parse(data.extra[i], l)
      out += parsed
    }
  }
  return out
}
const parse2 = function (_data, l) {
  try {
    return parse(_data)
  } catch (e) {
    console.error(e)
    return 'An error occured while parsing a message. See console for more information. JSON that caused the error: ' + JSON.stringify(_data)
  }
}
module.exports = parse2
