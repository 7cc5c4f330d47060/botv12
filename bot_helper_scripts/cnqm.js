module.exports=(c,p)=>{
  global.confirmQueue.push({cmd:c,perm:p})
  global.cwc(global.csl[0]+"Are you sure you want to run \""+global.csl[1]+"|"+c.slice(0,75)+global.csl[0]+"\"? Type \""+global.csl[1]+"|confirm <CONSOLE-CODE>"+global.csl[0]+"\" to confirm.")
}