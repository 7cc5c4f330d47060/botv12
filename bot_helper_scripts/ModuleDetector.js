module.exports = function(mod,exit2){
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
    if(exit2){process.exit(1)}
  }