const UNITS = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB']
const THRESHOLD = 1024

export default function memoryconvert (bytes: number) {
  for (let i = 0; i < UNITS.length; i++) {
    const last = i === (UNITS.length - 1)
    const max = THRESHOLD ** (i + 1)
    if (!last && bytes >= max) continue

    const divisor = THRESHOLD ** i
    const unit = UNITS[i]

    const div = bytes / divisor
    return `${+div.toFixed(2)} ${unit}`
  }
  return ''
}
