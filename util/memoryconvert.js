export default function memoryconvert (bytes) {
    if (bytes >= 1125899906842624) { // Petabytes
      return `${Math.round(bytes / 1125899906842624 * 100) / 100} PB`
    } else if (bytes >= 1099511627776) { // Terabytes
      return `${Math.round(bytes / 1099511627776 * 100) / 100} TB`
    } else if (bytes >= 1073741824) { // Gigabytes
      return `${Math.round(bytes / 1073741824 * 100) / 100} GB`
    } else if (bytes >= 1048576) { // Megabytes
      return `${Math.round(bytes / 1048576 * 100) / 100} MB`
    } else if (bytes >= 1024) { // Kilobytes
      return `${Math.round(bytes / 1024 * 100) / 100} KB`
    } else { // Bytes
      return `${bytes} B`
    }
  }
  