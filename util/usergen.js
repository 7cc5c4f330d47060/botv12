import { randomBytes } from 'crypto'
const rsg = function (count) {
  let output = ''
  for (let i = 0; i < count; i++) {
    const type = Math.floor(Math.random() * 5)
    switch (type) {
      case 0:
        output += '§§'
        break
      case 1:
        output += '§ '
        break
      case 2:
      case 3:
      case 4:{ // Make this case more likely
        let rng = Math.floor(Math.random() * 16) + 1
        if (rng === 7) rng = 17 // No bells
        if (rng === 10) rng = 18 // No line feeds
        if (rng === 11) rng = 19 // No vertical tabulations
        if (rng === 12) rng = 20 // No form feed
        if (rng === 13) rng = 21 // No carriage returns
        if (rng === 14) rng = 22 // No shift out
        if (rng === 15) rng = 23 // No shift in
        output += `§${String.fromCharCode(rng)}`
      }
    }
  }
  return output
}
const rsgLegal = function (count) {
  let output = ''
  if (Math.random() > 0.5) {
    output += 'uwu_'
  } else {
    output += 'owo_'
  }
  output += randomBytes(count).toString('hex')
  return output
}

export default function generateUser (legal) {
  if (legal) {
    return rsgLegal(6)
  } else {
    return rsg(6 + Math.floor(Math.random() * 3))
  }
}
