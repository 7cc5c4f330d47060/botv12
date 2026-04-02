import { createServer, OutgoingHttpHeaders } from 'node:http'
import { resolve } from 'node:path'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { inspect } from 'node:util'

const fileFormats: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  _other: 'application/octet-stream'
}
const four04Path = resolve(baseDir, 'util', 'ubot-panel', '404.html')

export default function createServer2 () {
  return createServer((req, res) => {
    let output: Buffer | string = ''
    let statusCode = 500
    let fileType: string = 'application/octet-stream'
    const header: OutgoingHttpHeaders = {}
    try {
      if (typeof req.url === 'undefined') return
      const partialUrl = req.url.slice(1)
      if (partialUrl === '') {
        header.location = '/login.html'
        statusCode = 301
      } else if (partialUrl === 'config.json') {
        output = JSON.stringify({

        })
      } else if (partialUrl === 'resources/theme-default.css') {
        fileType = fileFormats.css
        const fullUrl = resolve(baseDir, 'util', 'ubot-panel', 'resources', `theme-${settings.webTheme ?? 'dark'}.css`)
        if (existsSync(fullUrl)) {
          output = readFileSync(fullUrl)
          if (statusCode === 500) statusCode = 200
        } else {
          fileType = fileFormats.html
          output = readFileSync(four04Path)
          statusCode = 404
        }
      } else {
        const fullUrl = resolve(baseDir, 'util', 'ubot-panel', partialUrl)
        if (existsSync(fullUrl)) {
          const isDir = statSync(fullUrl).isDirectory()
          if (isDir) {
            if (statusCode === 500) statusCode = 501
          } else {
            output = readFileSync(fullUrl)
            const extension = partialUrl.split('.').reverse()[0]
            fileType = fileFormats[extension] ?? fileFormats['_other']
          }
        } else {
          if (statusCode === 500) statusCode = 404
          if (existsSync(four04Path)) {
            output = readFileSync(four04Path)
            fileType = fileFormats['html']
          } else {
            output = 'The file was not found'
          }
        }
        if (statusCode === 500) statusCode = 200
      }
    } catch (e) {
      if (debugMode) output = inspect(e)
    }
    header['content-type'] = fileType
    res.writeHead(statusCode, header)
    res.end(output)
  })
}
