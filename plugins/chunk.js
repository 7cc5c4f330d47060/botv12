import { default as c_loader } from 'prismarine-chunk';
import Vec3 from 'vec3'
const rd = 8;

export default function load (b) {
  const c = c_loader(b._client.version)
  b.chunks = {};
  b._client.on("map_chunk", data => {
    if(!b.chunks[data.x]){
      b.chunks[data.x]=[]
    }
    let chunk = new c();
    chunk.load(data.chunkData)
    b.chunks[data.x][data.z]=chunk 
  })
  b._client.on("block_change", data => {
    const chunkX = data.location.x >> 4
    const chunkZ = data.location.z >> 4
    const blockX = data.location.x & 15
    const blockZ = data.location.z & 15
    if(b.chunks[chunkX] && b.chunks[chunkX][chunkZ]){
      b.chunks[chunkX][chunkZ].setBlockStateId(new Vec3(blockX,data.location.y,blockZ),data.type)
    }
  })
  b._client.on("multi_block_change", data => {
    for(const record of data.records){
      const blockState = record >> 12
      const blockX = record >> 8 & 15
      const blockZ = record >> 4 & 15
      const blockY = record & 15
      if(b.chunks[data.chunkCoordinates.x] && b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z]){
        b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z].setBlockStateId(new Vec3(blockX,blockY+16*data.chunkCoordinates.y,blockZ),blockState)
      }
    }
  })
  b._client.on('position', data => {
    if (!b.ccStarted) {
      b.original_pos = { x: data.x >> 4, y: data.y, z: data.z >> 4 }
      b.pos = { x: data.x, y: data.y, z: data.z }
    } else {
      b.pos = { x: data.x, y: data.y, z: data.z }
      if (data.x >> 4 !== b.original_pos.x || data.z >> 4 !== b.original_pos.z) {
        b.original_pos = { x: data.x >> 4, y: data.y, z: data.z >> 4 }
        b.sc_tasks.cc.failed = 1
      }
    }
    b.commandPos = {
      x: data.x >> 4,
      z: data.z >> 4,
      y: 55
    }
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
  })
  b.interval.unloadChunks=setInterval(()=>{
    for(const i in b.chunks){
      //X-values
      if(i > b.original_pos.x + rd || i < b.original_pos.x - rd){
        delete b.chunks[i]
      }
      for(const z in b.chunks[i]){
        //Z-values
        if(z > b.original_pos.z + rd || z < b.original_pos.z - rd){
          delete b.chunks[i][z]
        }
      }
    }
  },1500)
  b.interval.coreCheck=setInterval(()=>{
    let cf = false
    if(!b.original_pos) return
    const chunk = b.chunks[b.original_pos.x][b.original_pos.z];
    for(let x=0; x<=15; x++){
      for(let z=0; z<=15; z++){
        const blockName = chunk.getBlock(new Vec3(x,55,z)).name
        if(blockName !== "command_block" && blockName !== "repeating_command_block" && blockName !== "chain_command_block"){
          cf = true
          if(b.sc_tasks.cc) b.sc_tasks.cc.failed = true
          break
        }
      }
      if(cf) break
    }
  },500)
}
