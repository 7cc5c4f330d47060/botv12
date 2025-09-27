import { exec } from 'child_process'
import version from '../../version.js'
import botVersion from '../../util/version.js'
import CommandContext from '../../util/CommandContext.js'

const dependencies: { name: string, version: string }[] = []

const addDepInfo = async function (name: string, version: string) {
  dependencies.push({ name, version })
}

// Obtain version information for the software the bot uses
addDepInfo(version.botName, botVersion)
addDepInfo('Node.js®', process.version.slice(1))
exec('npm list', (e, stdout) => {
  try {
    if (e) throw e
    const split = stdout.split('\n')
    for (const i in split) {
      if (!split[i].includes('─')) continue
      const item = split[i].split('@')
      const version = item.pop()
      const dependency = item.join('@').split(' ')[1]
      if(version === undefined) continue;
      addDepInfo(dependency, version)
    }
  } catch (e) {
    console.log(e)
  }
})

export default async function displayVersions (c: CommandContext) {
  if (dependencies.length === 0) return
  for (const item of dependencies) {
    c.reply({
      text: 'command.about.versionCmd.generic',
      parseLang: true,
      with: [
        item.name,
        item.version + ''
      ]
    })
  }
}
