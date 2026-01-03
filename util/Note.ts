export default interface Note {
  type: string
  deltaTime: number
  microsecondsPerBeat?: number
  programNumber?: number | string
  noteNumber?: number
  mcNote?: string
  velocity?: number
  nbsStereo?: number
  channel?: number
  time?: number
}