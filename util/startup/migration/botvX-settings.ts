export default async function migrateBotvXSettings () {
  if (settings.prefix) {
    settings.prefixes = settings.prefix
    delete settings.prefix
  }
}
