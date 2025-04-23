import { readFileSync } from 'node:fs'
const licenseFile = readFileSync("./LICENSE").toString("utf-8").replaceAll("\r","").split("\n");

export default function license (c) {
  for(const line of licenseFile){
    c.reply(line)
  }
}
