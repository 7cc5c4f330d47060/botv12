import version from '../version.js'
import { execSync } from 'child_process'
import { readdirSync } from 'node:fs'

let botVersion = version.botVersion

if(readdirSync(baseDir).includes('.git')) {
  const gitCommit = execSync(`git -C ${baseDir} rev-parse --short HEAD`).toString('utf8').split('\n')[0]
  const gitBranch = execSync(`git -C ${baseDir} rev-parse --abbrev-ref HEAD`).toString('utf8').split('\n')[0]
  botVersion += ` (${gitCommit} - ${gitBranch})`
}

export default botVersion
