export default {
  terminalMode: 'blackTerminal_24bit', // Terminal mode. Most modern terminals support 24-bit color
  version_mc: '1.21.1', // Minecraft version to connect with
  defaultLang: 'en-US', // Default language
  keyTrusted: "3e9f13473eec8d64c3eabf6385e3f8585f0af39ed30a8db9a4c8d8bcfa35659d7d06a58b342bfd2db5e3cbb4003a81da8f9d25f7cce1ad26face8e2871c3b217", // Trusted key
  keyOwner: "17d2c6c53b8919dc1ec22c42845018ac389824c4d73a68572b7fc57ff1442c6bbf9924d5ee5fa90cb23e384278d469c4e260208265b8ba2e2bc873045d5ed42e", // Owner key
  colors: { // All colors the bot uses
    secondary: '#DD99FF',
    primary: '#EECCFF',
    tertiary: 'white',
    warning: '#FFAA33',
    error: '#FF6688',
    fatalError: '#BB3344'
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
