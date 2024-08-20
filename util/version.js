import { default as version } from "../version.json" with { type: "json" }
import { execSync } from "child_process"
let botVersion = version.botVersion
let gitCommit
let gitBranch

try {
  gitCommit = execSync('git rev-parse --short HEAD').toString('UTF-8').split('\n')[0]
  gitBranch = execSync('git rev-parse --abbrev-ref HEAD').toString('UTF-8').split('\n')[0]
} catch (e) {
  gitCommit = false
  gitBranch = false
}

if (gitCommit) {
  botVersion += ` (${gitCommit} - ${gitBranch})`
}

export default botVersion
