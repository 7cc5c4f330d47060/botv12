import CommandContext from '../util/CommandContext.js'
import fs from 'node:fs/promises'
import { resolve } from 'node:path'
import { createHash } from 'node:crypto'
import Command from '../util/Command.js'
import { BlobWriter, Uint8ArrayReader, ZipWriter } from '@zip.js/zip.js'
import { request } from 'node:https'
import exists from '../util/hf/existsAsync.js'
interface Metadata12 {
  format: number,
  fileInfo: Record<string, {
    type: 'file',
    size: number,
    sha256: string,
    sha512: string,
    md5: string
  } | { type: 'directory' }>
}
let sourceLink = ''
export default class DownloadCommand extends Command {
  constructor () {
    super()
    this.name = 'download'
    this.execute = async (c: CommandContext) => {
      if (sourceLink && !c.args.includes('--force-reupload')) {
        c.reply({
          text: 'command.download.already',
          color: '$secondary',
          parseLang: true
        })
        c.reply({
          text: sourceLink,
          color: '$primary',
          linked: true
        })
        return
      }

      // Source code downloader, to allow downloading of versions between commits,
      // and without visiting Codeberg/Chipmunk.land code/GitHub.
      // Useful if someone steals the code, but does not use Git® or another version control system to
      // publish it.

      // To include:
      // /chatParsers/
      // /commands/ (recursive)
      // /lang/
      // /plugins/
      // /util/ (recursive)
      // /.gitignore
      // /index.ts
      // /launch.cmd
      // /launch.sh
      // /LICENSE
      // /package-lock.json
      // /package.json
      // /README.md
      // /settings_example.js
      // /version.js

      // To exclude:
      // /.git/
      // /logs/
      // /node_modules/
      // /songs/
      // /temp/ except for generated archive
      // /settings.js
      // JavaScript code output
      // anything on .gitignore

      const metadata: Metadata12 = {
        format: 3,
        fileInfo: {}
      }

      const dirs = [
        'chatParsers',
        'commands',
        'lang',
        'plugins',
        'util'
      ]
      const files = [
        '.gitignore',
        'index.ts',
        'launch.cmd',
        'launch.sh',
        'LICENSE',
        'package-lock.json',
        'package.json',
        'README.md',
        'settings_example.js',
        'settings_example.json',
        'version.ts',
      ]

      const zfw = new BlobWriter()
      const zipWriter = new ZipWriter(zfw)

      for (const item of dirs) {
        metadata.fileInfo[item] = {
          type: 'directory'
        }
        const fileList = await fs.readdir(resolve(baseDir, item), { recursive: true })
        for (const file of fileList) {
          const fileStats = await fs.stat(resolve(baseDir, item, file.toString())) // Stupid Hack
          if (fileStats.isDirectory()) { // Directories
            metadata.fileInfo[`${item}/${file.toString()}`] = {
              type: 'directory'
            }
          } else { // Files
            const data = await fs.readFile(resolve(baseDir, item, file.toString()))
            const hashSha256 = createHash('sha256').update(data).digest('hex')
            const hashSha512 = createHash('sha512').update(data).digest('hex')
            const hashMd5 = createHash('md5').update(data).digest('hex')
            metadata.fileInfo[`${item}/${file.toString()}`] = {
              type: 'file',
              size: data.length,
              sha256: hashSha256,
              sha512: hashSha512,
              md5: hashMd5
            }
            await zipWriter.add(`${item}/${file.toString()}`, new Uint8ArrayReader(new Uint8Array(data)))
          }
        }
      }

      for (const item of files) {
        if (!(await exists(resolve(baseDir, item)))) continue
        const data = await fs.readFile(resolve(baseDir, item))
        const hashSha256 = createHash('sha256').update(data).digest('hex')
        const hashSha512 = createHash('sha512').update(data).digest('hex')
        const hashMd5 = createHash('md5').update(data).digest('hex')
        metadata.fileInfo[item] = {
          type: 'file',
          size: data.length,
          sha256: hashSha256,
          sha512: hashSha512,
          md5: hashMd5
        }
        await zipWriter.add(item, new Uint8ArrayReader(new Uint8Array(data)))
      }

      await zipWriter.add('metadata.json', new Uint8ArrayReader(new Uint8Array(Buffer.from(JSON.stringify(metadata, null, 4)))))

      await zipWriter.close()

      const zip = await zfw.getData()
      const bytes = await zip.bytes()
      // await fs.writeFile(resolve(dataDir, 'temp', 'botv12.zip'), Buffer.from(bytes))

      let ep = 'files.chipmunk.land'
      if (settings.downloadEndPoint && !c.args.includes('--force-fcl')) {
        ep = settings.downloadEndPoint
      }

      const r = request({
        hostname: ep,
        port: 443,
        path: '/upload/botv12.zip',
        method: 'PUT',
        headers: {
          'content-length': bytes.length,
          'Linx-Randomize': 'yes'
        }
      }, res => {
        res.setEncoding('latin1')
        res.on('data', (content) => {
          if (content.startsWith(`https://${ep}`)) {
            sourceLink = content.slice(0, content.length - 1)
            if (sourceLink.includes('files.chipmunk.land')) { // Use selif on FCL
              sourceLink = sourceLink.replaceAll('files.chipmunk.land', 'files.chipmunk.land/selif')
            }
            c.reply({
              text: 'command.download.success',
              color: '$secondary',
              parseLang: true
            })
            c.reply({
              text: sourceLink,
              color: '$primary',
              linked: true
            })
          }
        })
      })
      r.write(Buffer.from(bytes))
      r.end()
    }
  }
}
