import HostOptions from "./HostOptions.js"

export default interface SettingsType {
  format: number
  terminalMode: string
  version_mc: string
  defaultLang: string
  dbEnabled: boolean
  dbType: string
  dbHost?: string
  dbUser?: string
  dbPassword?: string
  dbName?: string
  debugMode: boolean
  colors: Record<string, string>
  logJSONmessages?: boolean
  //displaySubtypesToConsole?: boolean
  showCommandSet?: boolean
  disableMusicBar?: boolean
  prefixes: string[]
  servers: HostOptions[]
  serverInfoShowSensitive?: boolean
  disableLogging?: boolean
  disableChatLogging?: boolean
  disableCommandLogging?: boolean
}