export default interface ConsoleColorSetting {
  fourBit: Record<string, string>
  twentyFourBit: {
    enabled: boolean
    bit?: number
    lightMode?: boolean
  }
  useHtml?: boolean
}