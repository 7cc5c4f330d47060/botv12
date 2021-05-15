var ws = require('ws');
global.readline = require("readline");
const wsc = new ws('ws://localhost:38552');
  global.rl = readline.createInterface(
    {
          input: process.stdin,
          output: process.stdout,
          prompt: "\x1b[0m\x1b[1m\x1b[37m> "
        }
  );
  rl.on('line', (line) => {
    wsc.send("\u0001"+line);
    rl.prompt(false)
  });
  rl.prompt(false)


