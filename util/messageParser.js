import { getMessage } from './lang.js'
export default function build (text, colors, defaultColor, lang) {
  const json = {}
  let textContent = ''

  if (typeof text.text === 'string') {
    textContent = text.text
    json.color = text.color ?? defaultColor
  } else {
    textContent = text + ''
    json.color = colors.primary
  }

  if (text.parseLang) {
    textContent = getMessage(lang, textContent)
  }

  if (text.copyable) {
    json.clickEvent = {
      action: 'copy_to_clipboard',
      value: textContent
    }
    json.hoverEvent = {
      action: 'show_text',
      contents: {
        text: getMessage(lang, 'copyText')
      }
    }
  }

  if (text.linked) {
    json.clickEvent = {
      action: 'open_url',
      value: textContent
    }
    json.hoverEvent = {
      action: 'show_text',
      contents: {
        text: getMessage(lang, 'openInBrowser')
      }
    }
  }

  if (text.color) {
    if (text.color.startsWith('$')) json.color = colors[text.color.slice(1)]
    else text.color = json.color
  }

  if (text.with) {
    json.with = []
    for (const item of text.with) {
      json.with.push(build(item, colors, colors.primary, lang))
    }
    json.translate = textContent
  } else {
    json.text = textContent
  }
  return json
}
