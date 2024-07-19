const rsg=function(count){
  let output="";
  for(let i=0; i<count; i++){
    let rng=Math.floor(Math.random()*16)+1;
    if(rng==7) rng=17; //No bells
    if(rng==10) rng=18; //No line feeds
    if(rng==13) rng=19; //No carriage returns
    output+=String.fromCharCode(rng)
  }
  return output;
}
module.exports = function () {
  return "  \xa7"+rsg(6)+"   "+rsg(4)
}
