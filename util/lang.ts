import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

const languages: Record<string, Record<string, string>> = {}
const fallbackLocale = settings.fallbackLocale ? settings.fallbackLocale : 'en-US'

const loadplug = () => {
  const bpl = readdirSync(resolve(baseDir, 'lang'))
  for (const plugin of bpl) {
    if (!plugin.endsWith('.js')) {
      continue
    }
    try {
      import(resolve(baseDir, 'lang', plugin)).then(languageFile => {
        languages[plugin.split('.')[0]] = languageFile.default
      })
    } catch (e) { console.log(e) }
  }
}
loadplug()

const getMessage = function (l: string, msg: string, with2?: string[]) {
  let message = msg.replace(/%%/g, '\ue123')
  if (languages[l] && languages[l][message] !== undefined) {
    message = languages[l][message].replace(/%%/g, '\ue123')
  } else if (languages[fallbackLocale] && languages['en-US'][message] !== undefined) {
    message = languages[fallbackLocale][message].replace(/%%/g, '\ue123')
  }
  if (with2) {
    with2.forEach((withItem, i) => {
      message = message.replace(/%s/, withItem.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
      message = message.replaceAll(`%${+i + 1}$s`, withItem.replace(/%s/g, '\ue124').replace(/\$s/g, '\ue125'))
    })
  }
  return message.replace(/\ue123/g, '%').replace(/\ue124/g, '%s').replace(/\ue125/g, '$s')
}

const languagesKeys = Object.keys(languages)

const formatTime = function (time: number) {
  let finalString = ''
  const seconds = Math.floor(time / 1000) % 60
  const minutes = Math.floor(time / 60000) % 60
  const hours = Math.floor(time / 3600000) % 24
  const days = Math.floor(time / 86400000)
  if (days !== 0) {
    finalString += days + ':'
  }
  finalString += hours.toString().padStart(2, '0') + ':'
  finalString += minutes.toString().padStart(2, '0') + ':'
  finalString += seconds.toString().padStart(2, '0')
  return finalString
}

export {
  languagesKeys as languages,
  formatTime,
  getMessage
}
