import { randomBytes } from "crypto";
const generateUser = function (legal) {
  return `${parseInt(randomBytes(8).toString("hex"),36)}`
}
export { generateUser }