const rsg=function(count){
  let output="";
  for(let i=0; i<count; i++){
    let rng=Math.floor(Math.random()*16)+1;
    if(rng==7) rng=17; //No bells
    if(rng==10) rng=18; //No line feeds
    if(rng==11) rng=19; //No vertical tabulations
    if(rng==12) rng=20; //No form feed
    if(rng==13) rng=21; //No carriage returns
    if(rng==14) rng=22; //No shift out
    if(rng==15) rng=23; //No shift in
    output+=String.fromCharCode(rng)
  }
  return output;
}
module.exports = function (legal) {
  if(legal){
    return Math.floor(Math.random()*1000000).toString()
  } else {
    return "  \xa7"+rsg(6)+"   "+rsg(4)
  }
}
