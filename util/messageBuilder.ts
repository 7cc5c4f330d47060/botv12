//import { getMessage } from './lang.js'
//import uuidToInt from './uuidtoint.js'
//import version from '../version.js'
export default function build (text, colors, lang, botuuid) {
  const json: any = {}
  let textContent = ''

  if (typeof text.text === 'string') {
    textContent = text.text
    if (text.color) json.color = text.color
  } else {
    textContent = text + ''
  }

  /*if (text.parseLang) {
    textContent = getMessage(lang, textContent)
  }*/

  if (text.copyable) {
    json.click_event = {
      action: 'copy_to_clipboard',
      value: textContent
    }
    /*json.hover_event = {
      action: 'show_text',
      value: {
        text: getMessage(lang, 'copyText')
      }
    }*/
  }

  /*if (text.botInfo) {
    textContent = version[text.botInfo]
  }*/

  if (text.linked) {
    json.click_event = {
      action: 'open_url',
      url: textContent
    }
    /*json.hover_event = {
      action: 'show_text',
      value: {
        text: getMessage(lang, 'openInBrowser')
      }
    }*/
  }

  /*if (text.command) {
    const fakeCmmFormat = {
      translate: '%s %s › %s',
      with: [
        1,
        {
          selector: '@s'
        },
        text.command
      ]
    }
    json.click_event = {
      action: 'run_command',
      command: `/tellraw @a[nbt={UUID:[I;${uuidToInt(botuuid)}]}] ${JSON.stringify(fakeCmmFormat)}`
    }
    json.hover_event = {
      action: 'show_text',
      value: {
        text: getMessage(lang, 'runCommand', [text.command])
      }
    }
  }*/

  if (text.mcCommand) {
    json.click_event = {
      action: 'run_command',
      command: text.mcCommand
    }
    /*json.hover_event = {
      action: 'show_text',
      value: {
        text: getMessage(lang, 'runCommand', [text.mcCommand])
      }
    }*/
  }

  if (text.hover) {
    json.hover_event = {
      action: 'show_text',
      value: build(text.hover, colors, lang, botuuid)
    }
  }

  if (text.color) {
    if (text.color.startsWith('$')) json.color = colors[text.color.slice(1)]
    else text.color = json.color
  }

  if (text.with) {
    json.with = []
    for (const item of text.with) {
      json.with.push(build(item, colors, lang, botuuid))
    }
    json.translate = textContent
  } else {
    json.text = textContent
  }
  return json
}
