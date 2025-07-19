import { getMessage } from './lang.js'
export default function build (text, colors, lang) {
  const json = {}
  let textContent = ''

  if (typeof text.text === 'string') {
    textContent = text.text
    if (text.color) json.color = text.color
  } else {
    textContent = text + ''
  }

  if (text.parseLang) {
    textContent = getMessage(lang, textContent)
  }

  if (text.copyable) {
    json.click_event = {
      action: 'copy_to_clipboard',
      value: textContent
    }
    json.hover_event = {
      action: 'show_text',
      value: {
        text: getMessage(lang, 'copyText')
      }
    }
  }

  if (text.linked) {
    json.click_event = {
      action: 'open_url',
      value: textContent
    }
    json.hover_event = {
      action: 'show_text',
      value: {
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
      json.with.push(build(item, colors, lang))
    }
    json.translate = textContent
  } else {
    json.text = textContent
  }
  return json
}
