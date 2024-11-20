export default {
  terminalMode: 'blackTerminal_24bit', // Terminal mode. Most modern terminals support 24-bit color
  version_mc: '1.21.1', // Minecraft version to connect with
  defaultLang: 'en-US', // Default language
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
