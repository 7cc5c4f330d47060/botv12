import { rename } from 'node:fs/promises'
import exists from '../../hf/existsAsync.js'
import { resolve } from 'node:path'

export default async function migrate_alpha6_data () {
  if (await exists(resolve(baseDir, 'settings.js'))) { rename(resolve(baseDir, 'settings.js'), resolve(dataDir, 'settings.js')) }
  if (await exists(resolve(baseDir, 'logs'))) { rename(resolve(baseDir, 'logs'), resolve(dataDir, 'logs')) }
  if (await exists(resolve(baseDir, 'songs'))) { rename(resolve(baseDir, 'songs'), resolve(dataDir, 'songs')) }
  if (await exists(resolve(baseDir, 'userkeys.json'))) { rename(resolve(baseDir, 'userkeys.json'), resolve(dataDir, 'userkeys.json')) } // .license_accepted
  if (await exists(resolve(baseDir, 'userkeys.json'))) { rename(resolve(baseDir, '.license_accepted'), resolve(dataDir, '.license_accepted')) } //
}
