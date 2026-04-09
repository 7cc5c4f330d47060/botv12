import { access, constants } from 'node:fs/promises'
export default async function exists (fileName: string) {
  try {
    await access(fileName, constants.F_OK)
    return true
  } catch {
    return false
  }
}