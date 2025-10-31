import CommandContext from "../util/CommandContext"
import * as fs from 'node:fs'
import { resolve } from 'node:path'
import { createHash } from "node:crypto"

async function execute (c: CommandContext) {

  
  // Source code downloader, to allow downloading of versions between commits,
  // and without visiting Codeberg/Chipmunk.land/GitHub.

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
  // anything on .gitignore

  let metadata: any = {
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
    'version.js',
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

  fs.writeFileSync(resolve(root, 'metadata.json'), JSON.stringify(metadata, null, 4))
}

export { execute }
