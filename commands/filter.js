/*
  The code contained within this file is only to serve as reference implementations for player
  management features, whether it be for forks of the botv12 / UBot codebase, or completely
  different bots. This will be disabled by default in the example settings file, with a toggle in
  settings which can be enabled if the owner of the bot so desires. On the main UBot production
  instance, these features will be entirely disabled, so it won't even run from console. If the
  bot's owner chooses to enable these, they are responsible for obtaining exploits to use with the
  feature, and any outcome from usage of these features, whether it be positive or negative in
  nature.
*/
import { getMessage } from '../util/lang.js'

const execute = (c) => {
  c.reply({
    text: getMessage(c.lang, 'command.filter.warning')
  })
}
const level = 0
const aliases = ["blacklist"]
export { execute, level }