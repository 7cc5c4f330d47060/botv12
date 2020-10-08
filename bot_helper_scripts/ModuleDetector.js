module.exports = function(mod){
    try{
      require(mod)
    }
    catch (e)
    {
      console.log(mod+" not found!");
      return;
    };
    console.log(mod+" found.");
	console.log(`Remove it by opening a command line and running \"npm uninstall ${mod}\".`);
    process.exit(1)
  }