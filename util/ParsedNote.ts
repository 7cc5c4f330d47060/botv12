export default interface ParsedNote {
  microsecondsPerBeat?: number
  program: number
  noteNumber?: number
  mcNote?: string
  volume?: number
  nbsStereo?: number
  channel?: number
  time?: number
}