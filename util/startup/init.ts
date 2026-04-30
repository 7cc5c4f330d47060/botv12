import Botv12Client from '../game/Botv12Client.js'
import type SettingsType from '../interface/SettingsType.js'
import type HostOptions from '../interface/HostOptions.js'
import { dirname, resolve } from 'node:path'
import { mkdir, copyFile, readFile, writeFile } from 'node:fs/promises'
import exists from '../hf/existsAsync.js'

// Setup the global values
declare global {
  var settings: SettingsType
  var codeDir: string
  var baseDir: string
  var dataDir: string
  var dbEnabled: boolean
  var debugMode: boolean
  var clOptions: {
    disableWsServer?: boolean
    disableNetMsg?: boolean
  }
  var startTime: number
  var logFileName: string
  var bots: Botv12Client[]
  var createBot: (host: HostOptions, oldId?: number) => void
}

globalThis.startTime = Date.now()

// Global options
globalThis.dbEnabled = false
globalThis.debugMode = false
globalThis.codeDir = dirname(process.argv[1])
globalThis.baseDir = process.cwd()
globalThis.dataDir = resolve(baseDir, 'data')
globalThis.clOptions = { disableWsServer: false }

// Parse the command-line arguments.
import ha from './argv.js'
ha()

if (!exists(dataDir)) await mkdir(dataDir)

// Migration scripts to run before settings loading
import migrate_alpha6_data from './migration/alpha6-data.js'
import migrate_alpha7_jsonsettings from './migration/alpha7-json-settings.js'


await migrate_alpha6_data()
await migrate_alpha7_jsonsettings()

if (!exists(resolve(dataDir, 'settings.json'))) {
  console.log('[info] Settings file is missing, using defaults.')
  copyFile(resolve(baseDir, 'settings_example.json'), resolve(dataDir, 'settings.json'))
}

const settingsData = (await readFile(resolve(dataDir, 'settings.json'))).toString('utf-8')
const settings = JSON.parse(settingsData)

globalThis.settings = settings
globalThis.debugMode = settings.debugMode || globalThis.debugMode

// Migration scripts to run after settings loading
import migrateBotvXSettings from './migration/botvX-settings.js'
import migrateAlpha6SettingsV3 from './migration/alpha6-settings-3.js'
import migrate_alpha7_settings4 from './migration/alpha7-settings-4.js'
import migrateAlpha8SettingsV5 from './migration/alpha8-settings-5.js'

await migrateBotvXSettings()
await migrateAlpha6SettingsV3()
await migrate_alpha7_settings4()
await migrateAlpha8SettingsV5()

if (settings !== JSON.parse(settingsData)) writeFile(resolve(dataDir, 'settings.json'), JSON.stringify(settings, null, '  '))
