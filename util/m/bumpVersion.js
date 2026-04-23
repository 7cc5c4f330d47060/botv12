import { default as _version } from '../../version.ts'
const version = _version.botVersion
import { readFileSync, writeFileSync } from 'node:fs'
let packageJson = JSON.parse(readFileSync('./package.json').toString('utf-8'))

const versionRegex = /(?<=botVersion: {\n).+?(?=\n {2}},)/s
const splitRegex = /(\d+|alpha|beta)/g

let newMajor = version.major
let newMinor = version.minor
let newPatch = version.patch
let newPrMinor = version.prMinor
let newPrPatch = version.prPatch
let newPrType = version.prType
let newMl = version.isMainLine

const patchVersion = () => {
  const major = `    major: ${newMajor},`
  const minor = `    minor: ${newMinor},`
  const patch = `    patch: ${newPatch},`
  const prMinor = `    prMinor: ${newPrMinor},`
  const prPatch = `    prPatch: ${newPrPatch},`
  const prType = `    prType: '${newPrType}',`
  const isMainLine = `    isMainLine: ${newMl}`
  const replaceItem = `${major}\n${minor}\n${patch}\n${prMinor}\n${prPatch}\n${prType}\n${isMainLine}`
  const oldVersion = readFileSync('./version.ts').toString('utf-8')
  const newVersion = oldVersion.replace(versionRegex, replaceItem)
  writeFileSync('./version.ts', newVersion)

  let versionString = `${newMajor}.${newMinor}.${newPatch}`
  if (newPrType) {
    versionString += `-${newPrType}.${newPrMinor}`
    if (newPrPatch) versionString += `.${newPrPatch}`
  }
  packageJson.version = versionString
  writeFileSync('./package.json', JSON.stringify(packageJson, null, '  '))
}
const action = process.argv[2]
switch (action) {
  case 'ml': { // Toggle mainline section
    newMl = !newMl
    break
  }
  case 'spr': { // Switch prType
    newPrMinor = 1
    newPrPatch = 0
    newPrType = process.argv[3]
    break
  }
  case 'bump': { // Increase a version number and reset all after to 0
    const section = process.argv[3]
    const useAlpha1 = process.argv[4]
    switch (section) {
      case 'major':
        newMajor++
        newMinor = 0
        newPatch = 0
        newPrMinor = 1
        newPrPatch = 0
        if (useAlpha1) newPrType = 'alpha'
        else newPrType = ''
        break
      case 'minor':
        newMinor++
        newPatch = 0
        newPrMinor = 1
        newPrPatch = 0
        if (useAlpha1) newPrType = 'alpha'
        else newPrType = ''
        break
      case 'patch':
        newPatch++
        newPrType = ''
        break
      case 'prMinor':
        newPrMinor++
        newPrPatch = 0
        break
      case 'prPatch':
        newPrPatch++
        break
    }
    break
  }
  case 'set': { // Set version
    const split = process.argv[3].match(splitRegex)
    newMajor = split[0] ?? 1
    newMinor = split[1] ?? 0
    newPatch = split[2] ?? 0
    newPrType = split[3] ?? ''
    newPrMinor = split[4] ?? 1
    newPrPatch = split[5] ?? 0
    newMl = process.argv[4] ?? newMl
  }
}
patchVersion()
// const section = process.argv[3] // 12.0.0-alpha.1.2 = 12, 0, 0, alpha, 1, 2
// const mainline = process.argv[4]
