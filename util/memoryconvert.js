const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
const THRESHOLD = 1000; // KiB = 1024; KB = 1000

export default function memoryconvert (bytes) {
  for (let i = 0; i < UNITS.length; i++) {
    const last = i === (UNITS.length - 1);
    const max = THRESHOLD ** (i + 1);
    if (!last && bytes >= max) continue;

    const divisor = THRESHOLD ** i;
    const unit = UNITS[i];

    const div = bytes / divisor;
    return `${+div.toFixed(2)} ${unit}`
  }
}
