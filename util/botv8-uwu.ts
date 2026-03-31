export default function uwuText (text: string) {
  let finalmsg = text // .toLowerCase()
    //.replace(/cute(?!r|st)/g, 'kawaii')
    .replace(/meow($|[\s-.?!])/g, 'nya')
    .replace(/[rl]/g, 'w')
    .replace(/r/g, 'w')
  // finalmsg = stu(finalmsg) // Stutter function, not used
}
