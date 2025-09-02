import MinecraftData from 'minecraft-data'
const _lang = MinecraftData('1.21.1').language
const lang = Object.create(null) // Without constructor function
for (const i in _lang) {
  lang[i] = _lang[i]
}
export default lang
