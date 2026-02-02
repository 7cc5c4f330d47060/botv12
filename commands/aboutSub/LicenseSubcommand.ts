import { readFileSync } from 'node:fs'
import CommandContext from '../../util/CommandContext'
import { resolve } from 'node:path'
import Command from '../../util/Command.js'

const licenseFile = readFileSync(resolve(baseDir, './LICENSE')).toString('utf8').replaceAll('\r', '').split('\n')

export default class LicenseSubcommand extends Command {
  constructor () {
    super()
    this.name = "license"
    this.aliases = [ "licence" ]
    this.execute = async (c: CommandContext) => {
      if(c.args[1] === '--info') {
        c.reply({
          text: 'command.about.copyright.agpl.isFree',
          parseLang: true
        })
        c.reply({
          text: 'command.about.copyright.agpl.warranty',
          parseLang: true
        })
        c.reply({
          text: 'command.about.copyright.agpl.getLicense',
          parseLang: true,
          with: [
            {
              text: 'https://www.gnu.org/licenses/',
              linked: true
            }
          ]
        })
        c.reply({
          text: 'command.about.copyright.readLicense',
          parseLang: true,
          command: `${c.prefix}about license`
        })
        return
      }
      let startIndex = 0
      if(c.args[1]) startIndex = +c.args[1]
      const changeSize = debugMode ? 18 : 19
      for(let i = startIndex; i < startIndex+changeSize; i++){
        c.reply({
          text: licenseFile[i],
          font: 'uniform'
        })
      }
      c.reply({
        text: '%s | %s',
        color: '#aaaaaa',
        with: [
          {
            text: 'textReader.lastPage',
            parseLang: true,
            command: `${c.prefix}about license ${startIndex - changeSize}`,
            color: startIndex < changeSize ? 'dark_gray' : 'white'
          },
          {
            text: 'textReader.nextPage',
            parseLang: true,
            command: `${c.prefix}about license ${startIndex + changeSize}`,
            color:  startIndex + changeSize > licenseFile.length ? 'dark_gray' : 'white'
          }
        ]
      })
    }
  }
}
