import { appendFileSync, existsSync, unlinkSync } from 'fs'
import { get as getHttp, IncomingMessage } from 'http'
import { get as getHttps } from 'https'

// Download file from Internet to RAM. Will only initially support http & https.
export default function download (url: string, location: string, cb: (error: string, output: Buffer) => void) {
  let err: string
  let output = Buffer.alloc(0)
  const httpCb = (res: IncomingMessage) => {
    let cancel = false;
    res.setEncoding('latin1')
    res.on('data', (data: string) => {
      if(!cancel) output = Buffer.concat([output,Buffer.from(data,'latin1')])
      if (output.length > 67108864 && !cancel) {
        err='largeFile'
        cb(err, output)
        res.resume()
        cancel = true
      }
    })
    res.on('end', () => {
      if(!cancel) cb('', output)
    })
  }
  if (url.startsWith('http://')) {
    getHttp(url, httpCb).on('error', cb)
  } else if (url.startsWith('https://')) {
    getHttps(url, httpCb).on('error', cb)
  }
}
