// Backport from a pre-release version of botv12 alpha 7.

const loader = require('prismarine-chunk')
const Vec3 = require('vec3')

module.exports = {
  load: (b) => {
    function updatePosition (x, y, z) {
      b.currentChunk = { x: x >> 4, z: z >> 4 }
      b.pos = { x, y, z }
      if (y > 99 || y < 1) {
        console.log(8)
        b.sc_tasks.cc_pos.failed = true
      } else {
        b.sc_tasks.cc_pos.failed = false
      }
    }
    const Chunk = loader(b._client.version)
    b.chunks = []
    b._client.on('map_chunk', (data) => {
      if (!b.chunks[data.x]) {
        b.chunks[data.x] = []
      }
      const chunk = new Chunk({ x: 0, z: 0 })
      if (!('load' in chunk)) { return }
      try {
        chunk.load(data.chunkData)
      } catch (e) { }
      b.chunks[data.x][data.z] = chunk
    })
    b._client.on('block_change', (data) => {
      const chunkX = data.location.x >> 4
      const chunkZ = data.location.z >> 4
      const blockX = data.location.x & 15
      const blockZ = data.location.z & 15
      if (b.chunks[chunkX] && b.chunks[chunkX][chunkZ]) {
        b.chunks[chunkX][chunkZ].setBlockStateId(Vec3(blockX, data.location.y, blockZ), data.type)
      }
    })
    b._client.on('multi_block_change', (data) => {
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
    b._client.on('position', data => {
      let newX = data.x
      let newY = data.y
      let newZ = data.z
      if (data.flags.x) { newX += b.pos.x }
      if (data.flags.y) { newY += b.pos.y }
      if (data.flags.z) { newZ += b.pos.z }
      b._client.write('teleport_confirm', { teleportId: data.teleportId })
      updatePosition(newX, newY, newZ)
    })
    b.interval.unloadChunks = setInterval(() => {
      b.chunks.forEach((chunkList, x) => {
        if (x > b.currentChunk.x + rd || +x < b.currentChunk.x - rd) {
          if (b.chunks[x]) { delete b.chunks[x] }
        }
        chunkList.forEach((chunk, z) => {
          if (z > b.currentChunk.z + rd || +z < b.currentChunk.z - rd) {
            if (b.chunks[x] && b.chunks[x][z]) { delete b.chunks[x][z] }
          }
        })
      })
    }, 1500)
  }
}

const rd = 8
