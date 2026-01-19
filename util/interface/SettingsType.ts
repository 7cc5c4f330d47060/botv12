import HostOptions from "./HostOptions.js"

export default interface SettingsType {
  terminalMode: string
  version_mc: string
  defaultLang: string
  keyTrusted: string
  keyAdmin: string
  keyOwner: string
  dbEnabled: boolean
  dbType: string
  dbHost: string
  dbUser: string
  dbPassword: string
  dbName: string
  debugMode: boolean
  colors: Record<string, string>
  fallbackLocale?: string
  logJSONmessages?: boolean
  //displaySubtypesToConsole?: boolean
  showCommandSet?: boolean
  disableMusicBar?: boolean
  showErrors?: boolean
  prefixes: string[]
  servers: HostOptions[]
}