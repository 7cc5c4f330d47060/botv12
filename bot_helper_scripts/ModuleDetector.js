module.exports = function(mod,exit2,ca){
    try{
      require(mod)
    }
    catch (e)
    {
      console.log(mod+" not found!");
	  ca(mod+" not found")
      return;
    };
    console.log(mod+" found.");
	console.log(`Remove it by opening a command line and running \"npm uninstall ${mod}\".`);
	ca(mod+" found.")
    if(exit2){process.exit(1)}
  }