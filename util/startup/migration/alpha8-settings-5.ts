export default async function migrateAlpha8SettingsV5 () {
  /*
    botv12 now has configuration for storage unit types, defaulting to units of 1000 instead of
    1024 like before. This will enable binary units (1024) again.
  */
  if (!settings.format || settings.format <= 4) { 
    if (settings.useBinaryStorageUnits === undefined) settings.useBinaryStorageUnits = true
    settings.format = 5
  }
  
}
