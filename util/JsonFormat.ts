export default interface JsonFormat {
  color?: string
  text?: string | number
  translate?: string
  with?: (JsonFormat | string)[]
  font?: string
  click_event?: {
    action: string
    value?: string
    url?: string
    command?: string
  }
  hover_event?: {
    action: string
    value: JsonFormat
  }
  fallback?: JsonFormat | string
  extra?: (JsonFormat | string)[]
  ''?: string // Because the prismarinejs nbt parser kinda sucks.
}