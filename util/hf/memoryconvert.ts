import { getMessage } from "../text/lang.js";

const units1024 = [
  'byte',
  'kibibyte',
  'mebibyte',
  'gibibyte',
  'tebibyte',
  'pebibyte',
  'exbibyte',
  'zebibyte'
]
const units1000 = [
  'byte',
  'kilobyte',
  'megabyte',
  'gigabyte',
  'terabyte',
  'petabyte',
  'exabyte',
  'zettabyte'
]
const length = 8;

export default function memoryconvert (bytes: number) {
  const bsu = settings.useBinaryStorageUnits
  const threshold = bsu ? 1024 : 1000 // Not caps, because caps sucks
  for (let i = 0; i < length; i++) {
    const last = i === 7
    const max = threshold ** (i + 1)
    if (!last && bytes >= max) continue

    const divisor = threshold ** i
    const unit = getMessage('common', `unit.storage.${(bsu ? units1024 : units1000)[i]}`)

    const div = bytes / divisor
    return `${+div.toFixed(2)} ${unit}`
  }
  return ''
}
