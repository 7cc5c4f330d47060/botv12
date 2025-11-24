import version from '../version.js'
import { execSync } from 'child_process'
let botVersion = version.botVersion
let gitCommit
let gitBranch

try {
  gitCommit = execSync(`git -C ${baseDir} rev-parse --short HEAD`).toString('utf8').split('\n')[0]
  gitBranch = execSync(`git -C ${baseDir} rev-parse --abbrev-ref HEAD`).toString('utf8').split('\n')[0]
} catch (e) {
  gitCommit = false
  gitBranch = false
}

if (gitCommit) {
  botVersion += ` (${gitCommit} - ${gitBranch})`
}

export default botVersion
