import { resolve } from 'node:path'
import { createReadStream, createWriteStream } from 'node:fs'
import { readdir, rm, stat } from 'node:fs/promises'
import { workerData } from 'node:worker_threads'
import { createGzip } from 'node:zlib'
import { pipeline } from 'node:stream/promises'
import { pack } from 'tar-stream'

const pack2 = pack()
const files = await readdir(workerData)
const writeStream = createWriteStream(resolve(workerData, '..', `${workerData}.tar.gz`))
const gz = createGzip()
pack2.pipe(gz)
gz.pipe(writeStream)
for (const file of files) {
  const stat2 = await stat(resolve(workerData, file))
  const size = stat2.size
  const i = createReadStream(resolve(workerData, file))
  //const z = createGzip()
  const o = pack2.entry({name: `${file}`, size})
  await pipeline(i, o)
}
pack2.finalize()
rm(workerData, {recursive: true})

// execSync('pkill -9 MainThread')
