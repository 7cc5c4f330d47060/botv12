import version from '../version.js'
import { execSync } from 'child_process'
import { readdirSync } from 'node:fs'

let botVersion = version.botVersion
let versionString = `${botVersion.major}.${botVersion.minor}.${botVersion.patch}`
if (botVersion.prType) {
  versionString += `-${botVersion.prType}.${botVersion.prMinor}`
  if(botVersion.prPatch) versionString += `.${botVersion.prPatch}`
}
if(readdirSync(baseDir).includes('.git')) {
  const gitCommit = execSync(`git -C ${baseDir} rev-parse --short HEAD`).toString('utf8').split('\n')[0]
  const gitBranch = execSync(`git -C ${baseDir} rev-parse --abbrev-ref HEAD`).toString('utf8').split('\n')[0]
  versionString += ` (${gitCommit} - ${gitBranch})`
}

export default versionString
