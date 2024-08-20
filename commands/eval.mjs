import * as index from "../index.mjs" // Not used in the code, but may be used by users of the command
export default {
  execute: (c) => {
    try {
      console.log(eval(c.args.join(' ')))
    } catch (e) {
      console.error(e)
    }
  },
  level: 3
}
