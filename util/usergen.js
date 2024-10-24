import { randomBytes } from "crypto";
export function generateUser (legal) {
  return `${parseInt(randomBytes(4).toString("hex"),16).toString(36)}${parseInt(randomBytes(4).toString("hex"),16).toString(36)}`
}