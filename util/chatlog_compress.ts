import { resolve } from 'node:path'
import { createReadStream, createWriteStream, readdirSync, unlinkSync } from 'node:fs'
import { workerData } from 'node:worker_threads'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'
const files = readdirSync(workerData)
for (const file of files) {
  const i = createReadStream(resolve(workerData, file))
  const z = createGzip()
  const o = createWriteStream(resolve(workerData, `${file}.gz`))
  await pipeline(i, z, o)
  unlinkSync(resolve(workerData, file))
}
// execSync('pkill -9 MainThread')
