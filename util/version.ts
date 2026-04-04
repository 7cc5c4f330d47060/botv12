import version from '../version.js'
import { execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const botVersion = version.botVersion
let versionString = `${botVersion.major}.${botVersion.minor}.${botVersion.patch}`
if (botVersion.prType) {
  versionString += `-${botVersion.prType}.${botVersion.prMinor}`
  if (botVersion.prPatch) versionString += `.${botVersion.prPatch}`
}
if (existsSync('.git')) {
  const gitCommit = execSync(`git -C ${baseDir} rev-parse --short HEAD`).toString('utf8').split('\n')[0]
  const gitBranch = execSync(`git -C ${baseDir} rev-parse --abbrev-ref HEAD`).toString('utf8').split('\n')[0]
  versionString += ` (${gitCommit} - ${gitBranch})`
}

export default versionString
