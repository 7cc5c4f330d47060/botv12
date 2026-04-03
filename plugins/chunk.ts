import loader, { PCChunk } from 'prismarine-chunk'
import Vec3 from 'vec3'
import Botv12Client from '../util/Botv12Client.js'
const rd = 8

export default function load (b: Botv12Client) {
  function updatePosition (x: number, y: number, z: number) {
    b.position.currentChunk = { x: x >> 4, z: z >> 4 }
    b.position.pos = { x: x, y: y, z: z }
    if (y > 99 || y < 1) {
      b.selfCare.tasks.cc_pos.failed = true
    } else {
      b.selfCare.tasks.cc_pos.failed = false
    }
  }
  const Chunk = loader(b.registry)
  b.chunks = []
  b._client.on('map_chunk', (data) => {
    if (!b.chunks[data.x]) {
      b.chunks[data.x] = []
    }
    const chunk = new Chunk({ x: 0, z: 0 })
    if (!('load' in chunk)) return
    try {
      chunk.load(data.chunkData)
    } catch (e) {
      if (debugMode) console.error(e)
    }
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
    if (data.flags.x) newX += b.position.pos.x
    if (data.flags.y) newY += b.position.pos.y
    if (data.flags.z) newZ += b.position.pos.z
    b._client.write('teleport_confirm', { teleportId: data.teleportId })
    updatePosition(newX, newY, newZ)
  })
  b.interval.unloadChunks = setInterval(() => {
    b.chunks.forEach((chunkList: PCChunk[], i: number) => {
      // X-values
      if (i > b.position.currentChunk.x + rd || +i < b.position.currentChunk.x - rd) {
        if (b.chunks[i]) delete b.chunks[i]
      }
      chunkList.forEach((chunk: PCChunk, z: number) => {
        // Z-values
        if (z > b.position.currentChunk.z + rd || +z < b.position.currentChunk.z - rd) {
          if (b.chunks[i] && b.chunks[i][z]) delete b.chunks[i][z]
        }
      })
    })
  }, 1500)
}
