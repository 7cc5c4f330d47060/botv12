export default async function migrateAlpha6SettingsV3 () {
  if (!settings.format || settings.format <= 2) {
    let version = '1.21.11'
    if (settings.version_mc !== undefined) version = settings.version_mc
    settings.minecraftVersion = version
    delete settings.version_mc
    settings.format = 3
  }
}
