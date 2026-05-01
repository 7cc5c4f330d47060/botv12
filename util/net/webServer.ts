import { createServer, type OutgoingHttpHeaders } from 'node:http'
import { resolve } from 'node:path'
import { readFile, stat } from 'node:fs/promises'
import exists from '../hf/existsAsync.js'
import { inspect } from 'node:util'
import version from '../../version.js'

const fileFormats: Record<string, string> = {
  html: 'text/html; charset=utf-8',
  htm: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  json: 'application/json; charset=utf-8',
  js: 'text/javascript; charset=utf-8',
  _other: 'application/octet-stream'
}
const four04Path = resolve(baseDir, 'util', 'net', 'ubot-panel', '404.html')

export default function createServer2 () {
  return createServer(async (req, res) => {
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
          webSocketUrl: settings.webSocketUrl ?? 'ws://localhost:12365'
        })
        fileType = fileFormats.json
        statusCode = 200
      } else if (partialUrl === 'privacypolicy.html') {
        const html = (await readFile(resolve(baseDir, 'util', 'net', 'ubot-panel', 'resources', 'pp', 'pp_base.html'))).toString('utf8')
        let text = (await readFile(resolve(baseDir,'util', 'net', 'ubot-panel', 'resources', 'pp', 'pp_text.html'))).toString('utf8')
        let owShown = false
        if (!settings.disableChatLogging && !settings.disableLogging) {
          if(!owShown) owShown = true
          text = 'For compliance with the below content, <code>disableChatLogging</code> or '+
          '<code>disableLogging</code> must be enabled in settings.<br>\n' + text
        }
        if (!settings.disableCommandLogging && !settings.disableLogging) {
          if(!owShown) owShown = true
          text = 'For compliance with the below content, <code>disableCommandLogging</code> or '+
          '<code>disableLogging</code> must be enabled in settings.<br>\n' + text
        }
        if (!settings.contactEmail) {
          if(!owShown) owShown = true
          text = 'For compliance with the below content, <code>contactEmail</code> must be set in '+
          'settings.<br>\n' + text
        }
        if (owShown) {
          text = '<h3>Settings issues</h3>' + text
          text = text.replace('<!-- Pre-PP OW Newline -->', '<br>\n')
        }
        text = text.replaceAll('<!-- botName -->', version.botName)
        text = text.replaceAll('<!-- PP General Email -->', settings.contactEmail ?? '(<code>contactEmail</code> not set)')
        output = html.replace('<!-- PP Content -->', text)
        fileType = fileFormats.html
        statusCode = 200
      } else if (partialUrl === 'resources/theme-default.css') {
        fileType = fileFormats.css
        const fullUrl = resolve(baseDir, 'util', 'net', 'ubot-panel', 'resources', `theme-${settings.webTheme ?? 'dark'}.css`)
        if (await exists(fullUrl)) {
          output = await readFile(fullUrl)
          if (statusCode === 500) statusCode = 200
        } else {
          fileType = fileFormats.html
          output = await readFile(four04Path)
          statusCode = 404
        }
      } else {
        const fullUrl = resolve(baseDir, 'util', 'net', 'ubot-panel', partialUrl)
        if (await exists(fullUrl)) {
          const isDir = (await stat(fullUrl)).isDirectory()
          if (isDir) {
            if (statusCode === 500) statusCode = 501
          } else {
            output = await readFile(fullUrl)
            const extension = partialUrl.split('.').reverse()[0]
            fileType = fileFormats[extension] ?? fileFormats['_other']
          }
        } else {
          if (statusCode === 500) statusCode = 404
          if (await exists(four04Path)) {
            output = await readFile(four04Path)
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
