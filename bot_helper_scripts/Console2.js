
global.rl = readline.createInterface(
    {
      input: process.stdin,
      output: process.stdout,
      prompt: "\x1b[0m\x1b[1m\x1b[37m> "
    }
  );
  rl.on('line', (line) => {
    bot.chat(line);
    rl.prompt(false)
  });
  rl.prompt(false)
global.bot=mineflayer.createBot({
