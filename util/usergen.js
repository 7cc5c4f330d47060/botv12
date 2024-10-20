import { randomBytes } from "crypto";
const generateUser = function (legal) {
  return `colon3_${parseInt(randomBytes(3).toString("hex"),16)}`
}
export { generateUser }