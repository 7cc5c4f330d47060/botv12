// Forked from botv8 version, and improved
const endings = [
  ' uwu',
  ' owo',
  ' :3',
  ' :3',
  ' :3'
]
export default function uwuText (text: string) {
  let finalmsg = text // .toLowerCase()
    // .replace(/cute(?!r|st)/g, 'kawaii')
    .replace(/meow(?=$|[\s-.?!])/g, 'nya')
    .replace(/[RL]/g, 'W')
    .replace(/[rl]/g, 'w')
    .replace(/na/g, 'nya')
    .replace(/Na/g, 'Nya')
    .replace(/NA/g, 'NYA')
  if (Math.random() > 0.8) {
    finalmsg = `${finalmsg}${endings[Math.floor(Math.random() * endings.length)]}`
  }
  return finalmsg
}
