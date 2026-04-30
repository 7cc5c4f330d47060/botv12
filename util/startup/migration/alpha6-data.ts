import { rename } from 'node:fs/promises'
import exists from '../../hf/existsAsync.js'
import { resolve } from 'node:path'

export default async function migrate_alpha6_data () {
  if (await exists(resolve(baseDir, 'settings.json'))) {
    await rename(resolve(baseDir, 'settings.json'), resolve(dataDir, 'settings.json'))
  }
  if (await exists(resolve(baseDir, 'settings.js'))) {
    await rename(resolve(baseDir, 'settings.js'), resolve(dataDir, 'settings.js'))
  }
  if (await exists(resolve(baseDir, 'logs'))) {
    await rename(resolve(baseDir, 'logs'), resolve(dataDir, 'logs'))
  }
  if (await exists(resolve(baseDir, 'songs'))) {
    await rename(resolve(baseDir, 'songs'), resolve(dataDir, 'songs'))
  }
  if (await exists(resolve(baseDir, 'userkeys.json'))) {
    await rename(resolve(baseDir, 'userkeys.json'), resolve(dataDir, 'userkeys.json'))
  } // .license_accepted
  if (await exists(resolve(baseDir, '.license_accepted'))) {
    await rename(resolve(baseDir, '.license_accepted'), resolve(dataDir, '.license_accepted'))
  } //
}
