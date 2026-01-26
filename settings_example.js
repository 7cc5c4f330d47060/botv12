export default {
  terminalMode: 'blackTerminal_24bit', // Terminal mode. Most modern terminals support 24-bit color
  version_mc: '1.21.8', // Minecraft version to connect with
  defaultLang: 'en-US', // Default language
  /*
    If you plan to use a database with the bot, set dbEnabled to true and fill in the below fields.
    In the TypeScript version, databases are not supported yet. When support is re-added, MySQL and
    MariaDB, and likely SQLite will be supported, with more to come.
    For SQLite, dbHost will point to the database file.
  */
  dbEnabled: false,
  dbType: 'sqlite',
  dbHost: '',
  dbUser: '',
  dbPassword: '',
  dbName: '',
  debugMode: false, // Enable for more debug info, and eval commands.
  colors: { // All colors the bot uses
    warning: '#FFAA33', // Used for warnings that are sent to Minecraft chat
    error: '#FF5544', // Used for errors that are sent to Minecraft chat
    fatalError: '#BB0000', // Formerly used in errorh for crashes
    perms0: '#ff99dd', // Public level commands in help list
    perms1: '#cc99ff', // Trusted level
    perms2: '#8899ff', // Admin level
    perms3: '#00ccee', // Owner level
    list1: '#ffccee', // Used for odd-numbered list items - set 1
    list2: '#ff99dd', // Used for even-numbered list items - set 1
    list3: '#eeccff', // Used for odd-numbered list items - set 2
    list4: '#dd99ff' // Used for even-numbered list items - set 2
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
      port: 17891,
      options: {
        name: 'chipmunk'
      }
    }
  ]
}
