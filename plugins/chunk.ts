import loader from 'prismarine-chunk'
import Vec3 from 'vec3'
import Botv12Client from '../util/Botv12Client.js'
const rd = 8

export default function load (b: Botv12Client) {
  const Chunk = loader(b.registry)
  b.chunks = {}
  if(!b.position) b.position = {}
  b._client.on('map_chunk', (data: any) => {
    if (!b.chunks[data.x]) {
      b.chunks[data.x] = []
    }
    const chunk: any = new Chunk({x: 0, z: 0})
    try {
      chunk.load(data.chunkData)
    } catch (e) {
      if(debugMode) console.log(e)
    }
    b.chunks[data.x][data.z] = chunk
  })
  b._client.on('block_change', (data: any) => {
    const chunkX = data.location.x >> 4
    const chunkZ = data.location.z >> 4
    const blockX = data.location.x & 15
    const blockZ = data.location.z & 15
    if (b.chunks[chunkX] && b.chunks[chunkX][chunkZ]) {
      b.chunks[chunkX][chunkZ].setBlockStateId(Vec3(blockX, data.location.y, blockZ), data.type)
    }
  })
  b._client.on('multi_block_change', (data: any) => {
    for (const record of data.records) {
      const blockState = record >> 12
      const blockX = record >> 8 & 15
      const blockZ = record >> 4 & 15
      const blockY = record & 15
      if (b.chunks[data.chunkCoordinates.x] && b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z]) {
        b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z].setBlockStateId(Vec3(blockX, blockY + 16 * data.chunkCoordinates.y, blockZ), blockState)
      }
    }
  })
  b._client.on('position', (data: any) => {
    let newX
    let newY
    let newZ
    newX = data.x
    newY = data.y
    newZ = data.z
    if (data.flags.x) newX += b.position.pos.x
    if (data.flags.y) newY += b.position.pos.y
    if (data.flags.z) newZ += b.position.pos.z
    b.position.currentChunk = { x: newX >> 4, z: newZ >> 4 }
    b.position.pos = { x: newX, y: newY, z: newZ }
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
    if (newY > 99 || newY < 1) {
      b.selfCare.tasks.cc_pos.failed = 1
    } else {
      b.selfCare.tasks.cc_pos.failed = 0
    }
  })
  b.interval.unloadChunks = setInterval(() => {
    for (const i in b.chunks) {
      // X-values
      if (i > b.position.currentChunk.x + rd || +i < b.position.currentChunk.x - rd) {
        delete b.chunks[i]
      }
      for (const z in b.chunks[i]) {
        // Z-values
        if (z > b.position.currentChunk.z + rd || +z < b.position.currentChunk.z - rd) {
          delete b.chunks[i][z]
        }
      }
    }
  }, 1500)
}
