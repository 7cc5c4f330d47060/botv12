export default async function migrateAlpha7SettingsV4 () {
  if (!settings.format || settings.format <= 3) settings.format = 4
}
