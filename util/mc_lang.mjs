import { default as mcdata } from "minecraft-data"
const _lang = mcdata('1.20.2').language
const lang = Object.create(null) // Without constructor function
for (const i in _lang) {
  lang[i] = _lang[i]
}
export default lang
