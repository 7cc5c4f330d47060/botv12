import Note from './Note'
export default interface NbsOutputFormat {
  tracks: Note[][]
  header: {
    ticksPerBeat: number
    nbsLoopEnabled: boolean
    nbsLoopStart: number
  }
}