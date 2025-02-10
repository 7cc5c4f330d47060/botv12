import { getMessage } from '../util/lang.js'

const execute = (c) => {
  c.reply({
    text: getMessage(c.lang, 'command.filter.warning')
  })
}
const level = 0
const aliases = ["blacklist"]
export { execute, level }
