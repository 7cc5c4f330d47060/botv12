import { randomBytes } from "crypto";
const generateUser = function (legal) {
  return `${parseInt(randomBytes(4).toString("hex"),16).toString(36)}${parseInt(randomBytes(4).toString("hex"),16).toString(36)}`
}
export { generateUser }