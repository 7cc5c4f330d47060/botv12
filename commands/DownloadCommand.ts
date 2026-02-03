import CommandContext from "../util/CommandContext.js"
import * as fs from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from "node:crypto"
import Command from "../util/Command.js"
import { BlobWriter, Uint8ArrayReader, ZipWriter } from "@zip.js/zip.js"
import { request } from 'node:https'
interface Metadata12 {
  format: number,
  hashes: Record<string, string>
  dirList: string[],
  fileList: string[]
}
let sourceLink = ''
export default class DownloadCommand extends Command {
  constructor () {
    super()
    this.name = "download"
    this.execute = async (c: CommandContext) => {
      if(sourceLink){
        c.reply({
          text: 'command.download.already',
          parseLang: true
        })
        c.reply({
          text: sourceLink,
          linked: true
        })
        return
      }
      // Source code downloader, to allow downloading of versions between commits,
      // and without visiting Codeberg/Chipmunk.land/GitHub.
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
        format: 1,
        hashes: {},
        dirList: [],
        fileList: []
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
        'version.ts',
      ]
      const root = 'temp/dl'
      if(!fs.existsSync('temp')) fs.mkdirSync('temp')
      if(!fs.existsSync(root)) fs.mkdirSync(root)
      
      for(const item of dirs){
        metadata.dirList.push(item)
        if(!fs.existsSync(resolve(root, item))) fs.mkdirSync(resolve(root, item))
        const fileList = fs.readdirSync(item, {recursive: true});
        for(const file of fileList){
          const fileStats = fs.statSync(resolve(item, file.toString())) //Stupid Hack
          if(fileStats.isDirectory()){ // Directories
            if(fs.existsSync(resolve(root, item, file.toString()))) fs.rmSync(resolve(root, item, file.toString()), {recursive: true})
            fs.mkdirSync(resolve(root, item, file.toString()))
            metadata.dirList.push(`${item}/${file.toString()}`)
          } else { // Files
            if(fs.existsSync(resolve(root, item, file.toString()))) fs.rmSync(resolve(root, item, file.toString()))
            const data = fs.readFileSync(resolve(item, file.toString()))
            const hash = createHash('sha256').update(data).digest('hex')
            metadata.hashes[`${item}/${file.toString()}`] = hash;
            metadata.fileList.push(`${item}/${file.toString()}`)
            fs.copyFileSync(resolve(item, file.toString()), resolve(root, item, file.toString()))
          }
        }
      }

      for(const item of files){
        if(fs.existsSync(resolve(root, item))) fs.rmSync(resolve(root, item))
        const data = fs.readFileSync(item)
        const hash = createHash('sha256').update(data).digest('hex')
        metadata.hashes[item] = hash;
        metadata.fileList.push(item)
        fs.copyFileSync(item, resolve(root, item))
      }

      metadata.fileList.push('metadata.json')

      fs.writeFileSync(resolve(root, 'metadata.json'), JSON.stringify(metadata, null, 4))

      const zfw = new BlobWriter();
      const zipWriter = new ZipWriter(zfw);
      for(const item of metadata.fileList) {
        const itemPath = resolve(baseDir, root, item)
        const fileBuffer = fs.readFileSync(itemPath)
        await zipWriter.add(item, new Uint8ArrayReader(new Uint8Array(fileBuffer)))
      }
      await zipWriter.close()

      const zip = await zfw.getData()
      const bytes = await zip.bytes()
      fs.writeFileSync(resolve(baseDir, 'temp', 'botv12.zip'), Buffer.from(bytes))
          
      const r = request({
        hostname: 'files.chipmunk.land',
        port: 443,
        path: '/upload/botv12.zip',
        method: 'PUT',
        headers: {
          "content-length": bytes.length,
          'Linx-Randomize': 'yes'
        }
      }, res => {
        res.setEncoding('latin1')
        res.on('data', (content) => {
          if(content.startsWith('https://files.chipmunk.land')){
            sourceLink = content.slice(0, content.length-1)
            c.reply({
              text: 'command.download.success',
              parseLang: true
            })
            c.reply({
              text: sourceLink,
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