const mc = require("minecraft-protocol");
const chunk = require('prismarine-chunk')("1.14")
var nbt = require('prismarine-nbt');
const win=[
  "1.0",
  "1.02",
  "1.03",
  "1.04",
  "2.03",
  "2.10",
  "2.11",
  "3.0",
  "3.1",
  "NT 3.1",
  "NT 3.5",
  "NT 3.51",
  "95",
  "NT 4.0",
  "98",
  "2000",
  "Me",
  "XP",
  "Vista",
  "7",
  "8",
  "8.1",
  "10"
]
module.exports={
  start:(bi)=>{
    bots[bi].Mmaestro = mc.createClient({
      host:bots[bi]._server.split(":")[0],
      port:bots[bi]._server.split(":")[1]?+bots[bi]._server.split(":")[1]:25565,
      version:"1.14.4",
      username:"Windows "+win[Math.floor(Math.random()*win.length)]
    });
bots[bi].Mindex = 0;
bots[bi].MmaestroPos=[32,5,32]

    bots[bi].MisMaestro=1;
    bots[bi].Mmaestro.on("position",(p)=>{
      try{
        if(bots[bi].Mmaestro.posd){
          if(p.x!=bots[bi].MmaestroPos[0] && p.z!=bots[bi].MmaestroPos[2]){
            bots[bi].Mmaestro.write("chat",{message:"/tp "+bots[bi].MmaestroPos.join(" ")})
          }
        }
        else 
        {
          bots[bi].MmaestroPos=[Math.floor(p.x),p.y,Math.floor(p.z)]
          bots[bi].Mmaestro.posd=1
        }
      } catch (e){}
    })
    setTimeout(()=>{bots[bi].Mmaestro.write("chat",{message:"Fake fucking maestro. This is not &b&lhhhzzzsss&r' bot. "})},1000)
    setTimeout(()=>{bots[bi].Mmaestro.write("chat",{message:"/tp "+bots[bi].MmaestroPos.join(" ")})},2000)
    setTimeout(()=>{bots[bi].Mmaestro.write("chat",{message:"/fill "+(bots[bi].MmaestroPos[0]-1)+" 2 "+(bots[bi].MmaestroPos[2]-1)+" "+(bots[bi].MmaestroPos[0]-16)+" 2 "+(bots[bi].MmaestroPos[2]-16)+" command_block"})},3000)
    bots[bi].Mmaestro.on("map_chunk",(p)=>{
      try{
        if(p.x===1 && p.z===1){
          const chunkd=p.chunkData;
          const chunkl=(new chunk())
          chunkl.load(chunkd);
          var fix=0;
          for(var i=16;i<=31;i++){
            for(var j=16;j<=31;j++){
              clqa.push(cwc(""+chunkl.getBlockType({x:i,y:2,z:j})))
            }
          }
        }
      } catch (e){console.error(e)}
    })
  },
  run:(bi,cm)=>{
    var _cm = cm;
    if(cm.indexOf("%tlist") || cm.indexOf("%tlist")){
      var i=0;
      for(var i in P){
        _cm = cm.split("%tlist").join(P[i].name).split("%ulist").join(P[i].UUID)
        setTimeout(Function("bots["+bi+"].Mmaestro.write('update_command_block',{location:{x:("+bots[bi].Mindex+" % 16)+bots["+bi+"].MmaestroPos[0],y:+2,z:Math.floor("+bots[bi].Mindex+" / 16)+bots["+bi+"].MmaestroPos[2],},command:_cm,mode:1,flags:4})"),20*i);
        bots[bi].Mindex++;
        bots[bi].Mindex=bots[bi].Mindex%255;
      }
    }
  },
  runmany:(bi,cm,cnt)=>{
    var _cm=cm;
    for(var i=0;i<=cnt;i++){
      setTimeout(Function("bots["+bi+"].Mmaestro.write('update_command_block',{location:{x:("+bots[bi].Mindex+" % 16)+(bots["+bi+"].MmaestroPos[0]-16),y:+2,z:Math.floor("+bots["+bi+"].Mindex+" / 16)+(bots["+bi+"].MmaestroPos[2]-16)},command:_cm["+(i%_cm.length)+"],mode:1,flags:4})"),20*i);
      bots[bi].Mindex++;
      bots[bi].Mindex=bots[bi].Mindex%255;
    }
  },
  stop:(bi)=>{
    bots[bi].Mmaestro.end();
    bots[bi].MisMaestro=0;
  },
  build:(bi,file,coords)=>{
    cwc("&7Now building file &d"+file.split("&").join("&&d"))
    fs.readFile(file, function (err, data) {
      if(err){console.log(err)}else {try{
        nbt.parse(data, function(error, data) {
          if(error) return;
          try{
            var x = data.value.Width.value;
            var y = data.value.Height.value;
            var z = data.value.Length.value;
            var schem = data.value.BlockData.value;
            console.log(schem);
            var pal = data.value.Palette.value;
            console.log(pal);
            var inversePal = [];
            for(var i in pal){
              inversePal[pal[i].value]=i;
            }
            var j=0;
            for(var X=0;X<x;X++){for(var Z=0;Z<z;Z++){for(var Y=0;Y<y;Y++){
              var i=(Y*z+Z)*x+X
              if(inversePal[schem[i]]=="minecraft:air"){continue;}
              if(schem[i]>=128){
                schem[i]=schem[i]+(schem[i+1]-1)*128
                schem.splice(i+1,1)
              }
              setTimeout(Function("bots["+bi+"].Mmaestro.write('update_command_block',{location:{x:("+bots[bi].Mindex+" % 16)+(bots["+bi+"].MmaestroPos[0]-16),y:+2,z:Math.floor("+bots[bi].Mindex+" /16)+(bots["+bi+"].MmaestroPos[2]-16),},command:'"+("setblock "+(X+coords.x)+" "+(Y+coords.y)+" "+(Z+coords.z)+" "+inversePal[schem[i]].split("[distance=").join("[\"distance\"="))+"',mode:1,flags:4})"),20*j);
              console.log("setblock "+(X+coords.x)+" "+(Y+coords.y)+" "+(Z+coords.z)+" "+inversePal[schem[i]])
              bots[bi].Mindex++;
              j++
              bots[bi].Mindex=bots[bi].Mindex%255;
            }}}
          }catch(e){}
        });}catch(e){}
      }
    });
  },
  cmdspeed:(bi,speed)=>{
    bots[bi].M_maestro._cmdspeed=speed;
  },
  position:(bi,_new)=>{
    bots[bi].MmaestroPos=_new;
    setTimeout(()=>{bots[bi].Mmaestro.write("chat",{message:"/tp "+bots[bi].MmaestroPos.join(" ")})},500)
    setTimeout(()=>{bots[bi].Mmaestro.write("chat",{message:"/fill "+(bots[bi].MmaestroPos[0]-1)+" 2 "+(bots[bi].MmaestroPos[2]-1)+" "+(bots[bi].MmaestroPos[0]-16)+" 2 "+(bots[bi].MmaestroPos[2]-16)+" command_block"})},1000)
  },
  _cmdspeed: 20
}
