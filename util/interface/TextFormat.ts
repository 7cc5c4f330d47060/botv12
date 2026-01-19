export default interface TextFormat {
  text?: string
  color?: string
  parseLang?: boolean
  copyable?: boolean
  linked?: boolean
  command?: string
  mcCommand?: string
  hover?: TextFormat
  with?: (TextFormat | string)[]
  font?: string
}