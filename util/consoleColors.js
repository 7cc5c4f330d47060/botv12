const consoleColors = {
  blackTerminal_24bit: {
    fourBit: {
      dark_red: '\u001B[0;38;2;170;0;0m',
      red: '\u001B[0;38;2;255;85;85m',
      dark_green: '\u001B[0;38;2;0;170;0m',
      green: '\u001B[0;38;2;85;255;85m',
      gold: '\u001B[0;38;2;255;170;0m',
      yellow: '\u001B[0;38;2;255;255;85m',
      dark_blue: '\u001B[0;38;2;0;0;170m',
      blue: '\u001B[0;38;2;85;85;255m',
      dark_purple: '\u001B[0;38;2;170;0;170m',
      light_purple: '\u001B[0;38;2;255;85;255m',
      dark_aqua: '\u001B[0;38;2;0;170;170m',
      aqua: '\u001B[0;38;2;85;255;255m',
      black: '\u001B[0;48;2;220;220;220;38;2;0;0;0m',
      gray: '\u001B[0;38;2;170;170;170m',
      dark_gray: '\u001B[0;38;2;85;85;85m',
      white: '\u001B[0;38;2;255;255;255m',
      reset: '\u001B[0;38;2;255;255;255m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 24,
      lightMode: false
    }
  },
  whiteTerminal_24bit: {
    fourBit: {
      dark_red: '\u001B[0;38;2;170;0;0m',
      red: '\u001B[0;38;2;255;85;85m',
      dark_green: '\u001B[0;38;2;0;170;0m',
      green: '\u001B[0;48;2;20;20;20;38;2;85;255;85m',
      gold: '\u001B[0;38;2;255;170;0m',
      yellow: '\u001B[0;48;2;20;20;20;38;2;255;255;85m',
      dark_blue: '\u001B[0;38;2;0;0;170m',
      blue: '\u001B[0;38;2;85;85;255m',
      dark_purple: '\u001B[0;38;2;170;0;170m',
      light_purple: '\u001B[0;38;2;255;85;255m',
      dark_aqua: '\u001B[0;38;2;0;170;170m',
      aqua: '\u001B[0;48;2;20;20;20;38;2;85;255;255m',
      black: '\u001B[0;38;2;0;0;0m',
      gray: '\u001B[0;38;2;170;170;170m',
      dark_gray: '\u001B[0;38;2;85;85;85m',
      white: '\u001B[0;48;2;20;20;20;38;2;255;255;255m',
      reset: '\u001B[0;48;2;20;20;20;38;2;255;255;255m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 24,
      lightMode: true
    }
  },
  blackTerminal_8bit: {
    fourBit: {
      dark_red: '\u001B[0;38;5;124m',
      red: '\u001B[0;38;5;203m',
      dark_green: '\u001B[0;38;5;34m',
      green: '\u001B[0;38;5;83m',
      gold: '\u001B[0;38;5;214m',
      yellow: '\u001B[0;38;5;227m',
      dark_blue: '\u001B[0;38;5;19m',
      blue: '\u001B[0;38;5;63m',
      dark_purple: '\u001B[0;38;5;127m',
      light_purple: '\u001B[0;38;5;207m',
      dark_aqua: '\u001B[0;38;5;37m',
      aqua: '\u001B[0;38;5;87m',
      black: '\u001B[0;48;5;253;38;5;16m',
      gray: '\u001B[0;38;5;145m',
      dark_gray: '\u001B[0;38;5;59m',
      white: '\u001B[0;38;5;231m',
      reset: '\u001B[0;38;5;231m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 8,
      lightMode: false
    }
  },
  whiteTerminal_8bit: {
    fourBit: {
      dark_red: '\u001B[0;38;5;124m',
      red: '\u001B[0;38;5;203m',
      dark_green: '\u001B[0;38;5;34m',
      green: '\u001B[0;48;5;16;38;5;83m',
      gold: '\u001B[0;38;5;214m',
      yellow: '\u001B[0;48;5;16;38;5;227m',
      dark_blue: '\u001B[0;38;5;19m',
      blue: '\u001B[0;38;5;63m',
      dark_purple: '\u001B[0;38;5;127m',
      light_purple: '\u001B[0;38;5;207m',
      dark_aqua: '\u001B[0;38;5;37m',
      aqua: '\u001B[0;48;5;16;38;5;87m',
      black: '\u001B[0;38;5;16m',
      gray: '\u001B[0;38;5;145m',
      dark_gray: '\u001B[0;38;5;59m',
      white: '\u001B[0;48;5;16;38;5;231m',
      reset: '\u001B[0;48;5;16;38;5;231m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 8,
      lightMode: true
    }
  },
  blackTerminal_4bit: {
    fourBit: {
      dark_red: '\u001B[0;31m',
      red: '\u001B[0;1;31m',
      dark_green: '\u001B[0;32m',
      green: '\u001B[0;1;32m',
      gold: '\u001B[0;33m',
      yellow: '\u001B[0;1;33m',
      dark_blue: '\u001B[0;34m',
      blue: '\u001B[0;1;34m',
      dark_purple: '\u001B[0;35m',
      light_purple: '\u001B[0;1;35m',
      dark_aqua: '\u001B[0;36m',
      aqua: '\u001B[0;1;36m',
      black: '\u001B[0;1;47;30m',
      gray: '\u001B[0;37m',
      dark_gray: '\u001B[0;1;30m',
      white: '\u001B[0;1;37m',
      reset: '\u001B[0;1;37m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 4,
      lightMode: false
    }
  },
  whiteTerminal_4bit: {
    fourBit: {
      dark_red: '\u001B[0;31m',
      red: '\u001B[0;1;31m',
      dark_green: '\u001B[0;32m',
      green: '\u001B[0;40;1;32m',
      gold: '\u001B[0;33m',
      yellow: '\u001B[0;40;1;33m',
      dark_blue: '\u001B[0;34m',
      blue: '\u001B[0;1;34m',
      dark_purple: '\u001B[0;35m',
      light_purple: '\u001B[0;1;35m',
      dark_aqua: '\u001B[0;36m',
      aqua: '\u001B[0;40;1;36m',
      black: '\u001B[0;30m',
      gray: '\u001B[0;37m',
      dark_gray: '\u001B[0;1;30m',
      white: '\u001B[0;40;1;37m',
      reset: '\u001B[0;40;1;37m'
    },
    twentyFourBit: {
      enabled: true,
      bit: 4,
      lightMode: true
    }
  },
  mc: {
    fourBit: {
      dark_red: '\xa74',
      red: '\xa7c',
      dark_green: '\xa72',
      green: '\xa7a',
      gold: '\xa76',
      yellow: '\xa7e',
      dark_blue: '\xa71',
      blue: '\xa79',
      dark_purple: '\xa75',
      light_purple: '\xa7d',
      dark_aqua: '\xa73',
      aqua: '\xa7b',
      black: '\xa70',
      gray: '\xa77',
      dark_gray: '\xa78',
      white: '\xa7f',
      reset: '\xa7r'
    },
    twentyFourBit: {
      enabled: false
    }
  },
  mcAmpersand: {
    fourBit: {
      dark_red: '&4',
      red: '&c',
      dark_green: '&2',
      green: '&a',
      gold: '&6',
      yellow: '&e',
      dark_blue: '&1',
      blue: '&9',
      dark_purple: '&5',
      light_purple: '&d',
      dark_aqua: '&3',
      aqua: '&b',
      black: '&0',
      gray: '&7',
      dark_gray: '&8',
      white: '&f',
      reset: '&r'
    },
    twentyFourBit: {
      enabled: false
    }
  },
  html: {
    fourBit: {
      dark_red: 'dr',
      red: 'lr',
      dark_green: 'dg',
      green: 'lg lmh',
      gold: 'dy',
      yellow: 'ly lmh',
      dark_blue: 'db',
      blue: 'lb',
      dark_purple: 'dp',
      light_purple: 'lp',
      dark_aqua: 'da',
      aqua: 'la lmh',
      black: 'dk dmh',
      gray: 'dw', // Dark White &7
      dark_gray: 'lk dmh', // Light Black &8
      white: 'lw lmh',
      reset: 'lw lmh resetColor'
    },
    twentyFourBit: {
      enabled: true
    },
    useHtml: true
  },
  none: {
    fourBit: {
      dark_red: '',
      red: '',
      dark_green: '',
      green: '',
      gold: '',
      yellow: '',
      dark_blue: '',
      blue: '',
      dark_purple: '',
      light_purple: '',
      dark_aqua: '',
      aqua: '',
      black: '',
      gray: '',
      dark_gray: '',
      white: '',
      reset: ''
    },
    twentyFourBit: {
      enabled: false
    }
  }
}
export default consoleColors
