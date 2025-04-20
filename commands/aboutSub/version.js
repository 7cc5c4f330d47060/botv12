import { getMessage } from '../../util/lang.js'
import { exec } from 'child_process'
import version from '../../version.js'
import botVersion from '../../util/version.js'

const displayDepInfo = function (name, version, c) {
  c.reply({
    translate: getMessage(c.lang, 'command.about.versionCmd.generic', [name]),
    color: c.colors.secondary,
    with: [
      {
        text: version + "",
        color: c.colors.primary,
        clickEvent: {
          action: 'copy_to_clipboard',
          value: version + ""
        },
        hoverEvent: {
          action: 'show_text',
          contents: {
            text: getMessage(c.lang, 'copyText'),
            color: c.colors.secondary
          }
        }
      }
    ]
  })
}

export default function displayVersions (c) {
  displayDepInfo(version.botName, botVersion, c)
  displayDepInfo("Node.js\xae", process.version.slice(1), c)
  exec('npm list', (e, stdout) => {
    try {
      if(e) throw e
      const split = stdout.split('\n')
      for(const i in split){
        if(!split[i].includes('─')) continue
        const item = split[i].split("@")
        const version = item.pop();
        const dependency = item.join("@").split(" ")[1]
        displayDepInfo(dependency, version, c)
      }
    } catch(e) {
      console.log(e)
    }
  })
}
