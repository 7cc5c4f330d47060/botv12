export default {
  terminalMode: 'blackTerminal_24bit', // Terminal mode. Most modern terminals support 24-bit color
  version_mc: '1.21.1', // Minecraft version to connect with
  defaultLang: 'en-US', // Default language
  // Insert the trusted key (keyTrusted) and owner key (keyOwner) here. Both of these values should be strings, and they should not be identical. Do not tell anyone the keys unless you trust them, as they can be used to get admin access to the bot, and (in the case of the owner key) access to your computer.
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
