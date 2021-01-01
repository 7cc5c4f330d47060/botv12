// 2026 file.

// Written to convert botv2 nppBackup data to Git®.

import { execSync } from 'node:child_process'
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dirs = [
	'nppBackup',
	'nppBackup/bot_helper_scripts',
	'nppBackup/bot_helper_scripts/bl',
	'nppBackup/bot_helper_scripts/cmd'
]
const dateRegex = /\d{4}-\d{2}-\d{2}_\d{6}(?=\.bak)/
const fnRegex = /.+(?=\.\d{4}-\d{2}-\d{2}_\d{6}\.bak)/
const rootDir = process.cwd()
const workDir = 'work_h'
const nppToIso8601 = (fn) => {
	const dateSection = fn.match(dateRegex)[0]
	const date = dateSection.slice(0,10)
	const hour = dateSection.slice(11,13)
	const minute = dateSection.slice(13,15)
	const second = dateSection.slice(15,17)
	return `${date}T${hour}:${minute}:${second}Z`
}
const bakFiles = [];
for (const dir of dirs) {
	const dirFiles = readdirSync(dir)
	for(const file of dirFiles) {
		if(file.endsWith('.bak')) {
			const iso8601Date = nppToIso8601(file)
			bakFiles.push({
				file: resolve(dir, file),
				iso8601Date,
				timeSinceEpoch: new Date(iso8601Date)
			})
		}
	}
}

bakFiles.sort((a,b)=>{return a.timeSinceEpoch-b.timeSinceEpoch})

process.chdir(workDir)
for (const file of bakFiles) {
	const filePath = file.file.match(fnRegex)[0]
	const filePathRel = filePath.slice(rootDir.length + 11)
	const fileBuffer = readFileSync(file.file)
	writeFileSync(filePathRel, fileBuffer)
	console.log(file.iso8601Date)
	execSync(`git add '${filePathRel}'`)
	execSync(`git commit --allow-empty --date ${file.iso8601Date} -m '${filePathRel} updated on ${file.iso8601Date}'`)
}
//console.log(bakFiles)