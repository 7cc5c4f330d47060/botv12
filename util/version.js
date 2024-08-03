const version = require('../version.json')
const cp = require('child_process')

let botVersion = version.botVersion
let gitCommit
let gitBranch

try {
  gitCommit = cp.execSync('git rev-parse --short HEAD').toString('UTF-8').split('\n')[0]
  gitBranch = cp.execSync('git rev-parse --abbrev-ref HEAD').toString('UTF-8').split('\n')[0]
} catch (e) {
  gitCommit = false
  gitBranch = false
}
if (gitCommit) {
  botVersion += ` (${gitCommit} - ${gitBranch})`
}

module.exports=botVersion;