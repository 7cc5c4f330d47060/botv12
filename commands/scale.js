import { getMessage } from '../util/lang.js'
/*
  Please note: I had this idea before I found out it was in other bots.
  Please do not get mad at me because your bot also has this (or a similar) command.
*/
const execute = c => {
  if (c.args[0] == 'set') {
    const scale = Math.min(Math.max(+c.args[1], 0.0625), 16)
    c.reply({
      translate: getMessage(c.lang, 'command.scale.set'),
      color: c.colors.secondary,
      with: [
        {
          text: c.args[1],
          color: c.colors.primary
        }
      ]
    })
    c.bot.ccq.push(`attribute ${c.uuid} scale base set ${scale}`)
    c.bot.ccq.push(`attribute ${c.uuid} gravity base set ${0.08 * scale}`)
    c.bot.ccq.push(`attribute ${c.uuid} movement_speed base set ${0.1 * scale}`) // Very close to 0.1 normally, so we just round
    c.bot.ccq.push(`attribute ${c.uuid} step_height base set ${0.6 * scale}`)
    c.bot.ccq.push(`attribute ${c.uuid} jump_strength base set ${0.42 * scale}`) // Very close to 0.42 normally, so we just round
  } else if (c.args[0] == 'reset') {
    c.reply({
      translate: getMessage(c.lang, 'command.scale.reset'),
      color: c.colors.secondary
    })
    c.bot.ccq.push(`attribute ${c.uuid} scale base reset`)
    c.bot.ccq.push(`attribute ${c.uuid} gravity base reset`)
    c.bot.ccq.push(`attribute ${c.uuid} movement_speed base reset`)
    c.bot.ccq.push(`attribute ${c.uuid} step_height base reset`)
    c.bot.ccq.push(`attribute ${c.uuid} jump_strength base reset`)
  } else {
    c.reply({
      translate: getMessage(c.lang, 'command.cloop.error.subcommand'),
      color: c.colors.secondary,
      with: [
        {
          text: `${c.prefix}help scale`,
          color: c.colors.primary
        }
      ]
    })
  }
}
const aliases = ['size'] // Other command names that will work the same (optional)
export { execute, aliases }
