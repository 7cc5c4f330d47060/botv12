import { randomBytes } from "crypto";
export default function generateUser (legal) {
  return `${parseInt(randomBytes(4).toString("hex"),16).toString(36)}${parseInt(randomBytes(4).toString("hex"),16).toString(36)}`
}