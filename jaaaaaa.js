var õ = require('ws');
global.readline = require("readline");
const ó = new õ('ws://localhost:41062');
  global.rl = readline.createInterface(
    {
	  input: process.stdin,
	  output: process.stdout,
	  prompt: "\x1b[0m\x1b[2m\x1b[37m> "
	}
  );
  rl.on('line', (line) => {
    ó.send("\u0004"+line);
    rl.prompt(false)
  });
  rl.prompt(false)