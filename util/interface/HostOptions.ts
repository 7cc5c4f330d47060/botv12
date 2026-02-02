import { SessionOption } from "minecraft-protocol"

export default interface HostOptions {
  host: string
  fakeHost?: string
  port?: number
  version?: string
  options: {
    name: string
    musicNoteLimit?: number
    isVanilla?: boolean
    useChat?: boolean
    useAmpersandColorCodes?: boolean
    hidden?: boolean
    netmsgIncomingDisabled?: boolean
    hideLocally?: boolean
    username?: string
    password?: string
    authServer?: string
    sessionServer?: string,
    session?: SessionOption
  }
}