import loader from 'prismarine-chunk'
import Vec3 from 'vec3'
const rd = 8

export default function load (b) {
  const Chunk = loader(b._client.version)
  b.chunks = {}
  b._client.on('map_chunk', data => {
    if (!b.chunks[data.x]) {
      b.chunks[data.x] = []
    }
    const chunk = new Chunk()
    try {
      chunk.load(data.chunkData)
    } catch (e) {
      console.log(data.chunkData.toString('base64'))
      if (b.chunks[data.x]) console.log(b.chunks[data.x][data.z])
    }
    b.chunks[data.x][data.z] = chunk
  })
  b._client.on('block_change', data => {
    const chunkX = data.location.x >> 4
    const chunkZ = data.location.z >> 4
    const blockX = data.location.x & 15
    const blockZ = data.location.z & 15
    if (b.chunks[chunkX] && b.chunks[chunkX][chunkZ]) {
      b.chunks[chunkX][chunkZ].setBlockStateId(new Vec3(blockX, data.location.y, blockZ), data.type)
    }
  })
  b._client.on('multi_block_change', data => {
    for (const record of data.records) {
      const blockState = record >> 12
      const blockX = record >> 8 & 15
      const blockZ = record >> 4 & 15
      const blockY = record & 15
      if (b.chunks[data.chunkCoordinates.x] && b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z]) {
        b.chunks[data.chunkCoordinates.x][data.chunkCoordinates.z].setBlockStateId(new Vec3(blockX, blockY + 16 * data.chunkCoordinates.y, blockZ), blockState)
      }
    }
  })
  b._client.on('position', data => {
    let newX
    let newY
    let newZ
    newX = data.x
    newY = data.y
    newZ = data.z
    if (data.flags & 1) newX += b.pos.x
    if (data.flags & 2) newY += b.pos.y
    if (data.flags & 4) newZ += b.pos.z
    b.currentChunk = { x: newX >> 4, z: newZ >> 4 }
    b.pos = { x: newX, y: newY, z: newZ }
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
    if (newY > 99 || newY < 1) {
      b.sc_tasks.cc_pos.failed = 1
    } else {
      b.sc_tasks.cc_pos.failed = 0
    }
  })
  b.interval.unloadChunks = setInterval(() => {
    for (const i in b.chunks) {
      // X-values
      if (i > b.currentChunk.x + rd || i < b.currentChunk.x - rd) {
        delete b.chunks[i]
      }
      for (const z in b.chunks[i]) {
        // Z-values
        if (z > b.currentChunk.z + rd || z < b.currentChunk.z - rd) {
          delete b.chunks[i][z]
        }
      }
    }
  }, 1500)
}
