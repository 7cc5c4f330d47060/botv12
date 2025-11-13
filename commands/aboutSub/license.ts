import { readFileSync } from 'node:fs'
import CommandContext from '../../util/CommandContext'
import settings from '../../settings'
const licenseFile = readFileSync('./LICENSE').toString('utf8').replaceAll('\r', '').split('\n')

export default async function license (c: CommandContext) {
  let startIndex = 0
  if(c.args[1]) startIndex = +c.args[1]
  const changeSize = settings.debugMode ? 18 : 19
  const maxSize = licenseFile.length;
  for(let i = startIndex; i < startIndex+changeSize; i++){
    c.reply({
      text: licenseFile[i],
      font: 'uniform'
    })
  }
  if(startIndex < changeSize){
    c.reply({
      text: 'textReader.nextPage', 
      parseLang: true, 
      command: `${c.prefix}about license ${startIndex + changeSize}`
    })
  } else if(startIndex + changeSize > licenseFile.length) {
    c.reply({
      text: 'textReader.lastPage', 
      parseLang: true, 
      command: `${c.prefix}about license ${startIndex - changeSize}`
    })
  } else {
    c.reply({
      text: '%s | %s',
      color: '#aaaaaa',
      with: [
        {
          text: 'textReader.lastPage',
          parseLang: true,
          command: `${c.prefix}about license ${startIndex - changeSize}`,
          color: 'white'
        },
        {
          text: 'textReader.nextPage',
          parseLang: true,
          command: `${c.prefix}about license ${startIndex + changeSize}`,
          color: 'white'
        }
      ]
    })
  }
}
