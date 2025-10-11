import { readFileSync } from 'node:fs'
const licenseFile = readFileSync('./LICENSE').toString('utf8').replaceAll('\r', '').split('\n')

export default async function license (c) {
  for (const line of licenseFile) {
    // TODO: Make a proper text file reader
    c.reply(line)
  }
}
