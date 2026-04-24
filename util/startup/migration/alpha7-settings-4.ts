export default async function migrate_alpha7_settings4 () {
  if (!settings.format || settings.format >= 3) settings.format = 4
}
