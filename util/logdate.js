module.exports = (a) => {
  if (!a) a = Date.now()
  const fw = new Date(a)
  let msecond = fw.getUTCMilliseconds()
  if (msecond.toString().length == 1) {
    msecond = '00' + msecond
  } else if (msecond.toString().length == 2) {
    msecond = '0' + msecond
  }
  let second = fw.getUTCSeconds()
  if (second.toString().length == 1) {
    second = '0' + second
  }
  let minute = fw.getUTCMinutes()
  if (minute.toString().length == 1) {
    minute = '0' + minute
  }
  let hour = fw.getUTCHours()
  if (hour.toString().length == 1) {
    hour = '0' + hour
  }
  return '[' + fw.getUTCDate() + '.' + (fw.getUTCMonth() + 1) + '.' + fw.getUTCFullYear() + ' ' + hour + ':' + minute + ':' + second + ':' + msecond + ']'
}
