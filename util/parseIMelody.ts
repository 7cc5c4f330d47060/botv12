// Read IMY file and convert it for use in plugins/musicPlayer.js.
import NbsOutputFormat from './interface/NbsOutputFormat.js'

export default function imyReader (buffer: Buffer) {
  const output: NbsOutputFormat = {
    tracks: [],
    header: {
      ticksPerBeat: 0,
      nbsLoopEnabled: false,
      nbsLoopStart: 0
    }
  }
  return output
}
