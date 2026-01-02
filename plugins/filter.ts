import Botv12Client from '../util/Botv12Client.js'
import uuidToInt from '../util/uuidtoint.js'
export default function load (b: Botv12Client) {
  b.filter = {}
  b.filter.filteredPlayers = []

  b.interval.deopFiltered = setInterval(() => {
    b.filter.filteredPlayers.forEach((item: any) => {
      if (b.playerInfo.players[item.uuid] && b.playerInfo.players[item.uuid].here) {
        if(item.method == 'legacy'){
          b.commandCore.ccq.push(`/deop @a[nbt={UUID:[I;${uuidToInt(item.uuid)}]}]`)
          b.commandCore.ccq.push(`/gamemode spectator @a[nbt={UUID:[I;${uuidToInt(item.uuid)}]}]`)
        }
      }
    })
  }, 50)

  b.filter.addFilter = function (uuid: string, username: string, method = 'legacy') {
    b.filter.filteredPlayers.push({
      username,
      uuid,
      method
    })
  }
  b.filter.removeFilter = function (string: string) {
    let index = -1
    b.filter.filteredPlayers.forEach((item: any, index2: number) => {
      if (item.uuid === string || item.username === string) {
        console.log(index2)
        index = index2
      }
    })

    if (index === -1) return
    b.filter.filteredPlayers.splice(index, 1)
  }
  b.filter.isFiltered = function (string: string) {
    let playerIsFiltered = false
    b.filter.filteredPlayers.forEach((item: any) => {
      if (item.uuid === string || item.username === string) {
        playerIsFiltered = true
      }
    })
    return playerIsFiltered
  }
}
