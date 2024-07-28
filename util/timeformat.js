module.exports = function (time) {
  let finalString = ''
  const seconds = Math.floor(time / 1000) % 60
  const minutes = Math.floor(time / 60000) % 60
  const hours = Math.floor(time / 3600000) % 24
  const days = Math.floor(time / 86400000) % 7
  const weeks = Math.floor(time / 604800000)
  if (weeks !== 0) {
    finalString += `${weeks} week${weeks === 1 ? '' : 's'} `
  }
  if (days !== 0) {
    finalString += `${days} day${days === 1 ? '' : 's'} `
  }
  if (hours !== 0) {
    finalString += `${hours} hour${hours === 1 ? '' : 's'} `
  }
  if (minutes !== 0) {
    finalString += `${minutes} minute${minutes === 1 ? '' : 's'} `
  }
  if (seconds !== 0) {
    finalString += `${seconds} second${seconds === 1 ? '' : 's'} `
  }
  return finalString
}
