import { readdirSync } from "node:fs"
const languages = {}
import { default as settings } from '../settings.js'
const fallbackLocale = settings.fallbackLocale ? settings.fallbackLocale : 'en-US'

const loadplug = () => {
  const bpl = readdirSync('lang')
  for (const plugin of bpl) {
    if (!plugin.endsWith('.json')) {
      continue
    }
    try {
      import(`../lang/${plugin}`, {with: {type: "json"}}).then(languageFile => {
        languages[plugin.split('.')[0]] = languageFile.default
      })
    } catch (e) { console.log(e) }
  }
}
loadplug()

const getMessage = function (l, msg, with2) {
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

const languages_keys = Object.keys(languages)
const formatTime = function (time, language) {
  let finalString = ''
  const seconds = Math.floor(time / 1000) % 60
  const minutes = Math.floor(time / 60000) % 60
  const hours = Math.floor(time / 3600000) % 24
  const days = Math.floor(time / 86400000) % 7
  const weeks = Math.floor(time / 604800000)
  if (weeks !== 0) {
    finalString += weeks
    finalString += `${weeks === 1 ? getMessage(language, 'time.week') : getMessage(language, 'time.weekPlural')}`
  }
  if (days !== 0) {
    finalString += days
    finalString += `${days === 1 ? getMessage(language, 'time.day') : getMessage(language, 'time.dayPlural')}`
  }
  if (hours !== 0) {
    finalString += hours
    finalString += `${hours === 1 ? getMessage(language, 'time.hour') : getMessage(language, 'time.hourPlural')}`
  }
  if (minutes !== 0) {
    finalString += minutes
    finalString += `${minutes === 1 ? getMessage(language, 'time.minute') : getMessage(language, 'time.minutePlural')}`
  }
  if (seconds !== 0) {
    finalString += seconds
    finalString += `${seconds === 1 ? getMessage(language, 'time.second') : getMessage(language, 'time.secondPlural')}`
  }
  return finalString
}

export {
  languages_keys as languages,
  formatTime,
  getMessage
}