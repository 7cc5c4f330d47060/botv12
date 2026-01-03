/*
  TypeScript type definitions for settings.js

  Do not edit unless changing settings format - this is not the settings file
*/

declare const settings: {
  terminalMode: string
  version_mc: string
  defaultLang: string
  keyTrusted: string,
  keyAdmin: string
  keyOwner: string,
  dbEnabled: boolean,
  dbType: string,
  dbHost: string,
  dbUser: string,
  dbPassword: string,
  dbName: string,
  debugMode: boolean,
  colors: Record<string, string>
  prefixes: string[]
  servers: {
    host: string,
    port?: number,
    options: {
      name: string
    }
  }[]
}
export = settings