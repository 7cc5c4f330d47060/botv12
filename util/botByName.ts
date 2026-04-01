export default function botByName (name: string) {
  for (const b of bots){
    if (b.host.options.name == name) return b.id
  }
  return
}