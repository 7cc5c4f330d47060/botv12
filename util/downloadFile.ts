import { get as getHttp, IncomingMessage } from 'http'
import { get as getHttps } from 'https'

// Windows 10 Technical Preview won't be suspicious at all...
const userAgent = 'Mozilla/5.0 (Windows NT 6.4; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2225.0 Safari/537.36'

// Download file from Internet to RAM. Will initially only support http & https.
export default function download (url: string, cb: (error: string, output: Buffer) => void) {
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
    getHttp(url, {headers: {"User-Agent": userAgent}}, httpCb).on('error', cb)
  } else if (url.startsWith('https://')) {
    getHttps(url, {headers: {"User-Agent": userAgent}}, httpCb).on('error', cb)
  }
}
