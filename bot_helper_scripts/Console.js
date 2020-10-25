module.exports=function(){
  global.rl = readline.createInterface(
    {
	  input: process.stdin,
	  output: process.stdout,
	  prompt: "\x1b[0m\x1b[1m\x1b[37m> "
	}
  );
  rl.on('line', (line) => {
    global.command("bb41a64a33fe01fb",line,true,true);
    rl.prompt(false)
  });
  rl.prompt(false)
}