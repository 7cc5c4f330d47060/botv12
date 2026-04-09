import { resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { readdir, unlink } from 'node:fs/promises'
import { workerData } from 'node:worker_threads'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'
const files = await readdir(workerData)
for (const file of files) {
  const i = createReadStream(resolve(workerData, file))
  const z = createGzip()
  const o = createWriteStream(resolve(workerData, `${file}.gz`))
  await pipeline(i, z, o)
  await unlink(resolve(workerData, file))
}
// execSync('pkill -9 MainThread')
