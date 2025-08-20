// Read NBS file and convert it for use in plugins/musicPlayer.js.
import { readFileSync } from 'node:fs'
import { fromArrayBuffer } from "@nbsjs/core";
export default function nbsReader (buffer) {
  const nbs = fromArrayBuffer(new Uint8Array(buffer).buffer)
  console.log(nbs)
}
