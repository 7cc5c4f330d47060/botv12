import { unlink, writeFile } from 'node:fs/promises'
import exists from '../../hf/existsAsync.js'
import { resolve } from 'node:path'

export default async function migrateAlpha7JsonSettings () {
  if (!(await exists(resolve(dataDir, 'settings.js')))) return

  const settingsOld = (await import(resolve(dataDir, 'settings.js'))).default
  const settingsNew = JSON.stringify(settingsOld, null, '  ')
  await writeFile(resolve(dataDir, 'settings.json'), settingsNew)
  unlink(resolve(dataDir, 'settings.js'))
}
