export default {
  terminalMode: 'blackTerminal_24bit', // Terminal mode. Most modern terminals support 24-bit color
  version_mc: '1.21.1', // Minecraft version to connect with
  defaultLang: 'en-US', // Default language
  keyTrusted: '3e9f13473eec8d64c3eabf6385e3f8585f0af39ed30a8db9a4c8d8bcfa35659d7d06a58b342bfd2db5e3cbb4003a81da8f9d25f7cce1ad26face8e2871c3b217', // Trusted key. It is strongly recommended to change this key before starting the bot for the first time.
  keyOwner: '17d2c6c53b8919dc1ec22c42845018ac389824c4d73a68572b7fc57ff1442c6bbf9924d5ee5fa90cb23e384278d469c4e260208265b8ba2e2bc873045d5ed42e', // Owner key.  It is strongly recommended to change this key before starting the bot for the first time, as people can get access to your computer through the eval command.
  colors: { // All colors the bot uses
    primary: '#EECCFF', // Used for primary subjects (e.g. items in lists)
    secondary: '#DD99FF', // Used for secondary subjects (e.g. list labels)
    tertiary: 'white', // Used mostly for messages
    warning: '#FFAA33', // Used for warnings that are sent to Minecraft chat
    error: '#FF6688', // Used for errors that are sent to Minecraft chat
    fatalError: '#BB3344' // Used in errorh for crashes
  },
  prefixes: [ // A list of prefixes the bot will respond to in-game
    'ubotesm:',
    'ubotdev:',
    'es"',
    'd"'
  ],
  servers: [ // Server list
    {
      host: 'kaboom.pw', // Server address
      port: 25565, // Server port. The default is 25565.
      options: {
        name: 'kaboom' // Server name in netmsg
      }
    },
    {

      host: 'chipmunk.land',
      port: 25565,
      options: {
        name: 'chipmunk'
      }
    }
  ]
}
