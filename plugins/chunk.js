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
    chunk.load(data.chunkData)
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
    if (!b.ccStarted) {
      b.currentChunk = { x: data.x >> 4, z: data.z >> 4 }
      b.pos = { x: data.x, y: data.y, z: data.z }
    } else {
      b.currentChunk = { x: data.x >> 4, z: data.z >> 4 }
      b.pos = { x: data.x, y: data.y, z: data.z }
    }
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
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
