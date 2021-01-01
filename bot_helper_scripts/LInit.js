module.exports=()=>{
  require("./MineflayerCompatability.js")()
  global.rh=require(bhs+'Hash.js');
  global.moduleDetector=global.perms = require(bhs+'ModuleDetector.js'); moduleDetector("mineflayer",true,()=>{});
  global.amount = (dirPath,filter)=>{
    var files2 = fs.readdirSync(dirPath)
    var files=[];
    files2.forEach((f)=>{
      if(f.startsWith(filter)){files.push(f)}
    })
    return files.length;
  }
  global.realRev = amount("nppBackup","index.js")+amount("commands/nppBackup","Command")+amount(bs+"nppBackup","")
  console.log("Revision "+realRev)
  global.type=["Debug","Normal"][+conf.isNormal]
  global.title = (title)=>{process.stdout.write(String.fromCharCode(27)+"]0;"+title+String.fromCharCode(7));}
  global.perms = require('../admins.json');
  global.rev2 = conf.rev;
  global.rev = rev2 + ` [${type}]`;
  if(conf.revision){console.log("Version "+global.rev);title("NCB Version "+global.rev)}
}