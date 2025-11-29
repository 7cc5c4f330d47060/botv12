import { appendFileSync, existsSync, unlinkSync } from 'fs'
import { get as getHttp } from 'http'
import { get as getHttps } from 'https'

// Download file from Internet. Will only initially support http & https.
export default function download (url: string, location: string, cb: any) {
  let err
  const httpCb = (res: any) => {
    if (res.headers['content-length'] > 16777216 || typeof res.headers['content-length'] === 'undefined') {
      err = 'largeFile'
      cb(err)
      res.resume()
      return
    }
    res.setEncoding('latin1')
    res.on('data', (data: string) => appendFileSync(location, data, 'latin1'))
    res.on('end', () => {
      cb()
    })
  }
  if (existsSync(location)) unlinkSync(location)
  if (url.startsWith('http://')) {
    getHttp(url, httpCb).on('error', cb)
  } else if (url.startsWith('https://')) {
    getHttps(url, httpCb).on('error', cb)
  }
}
