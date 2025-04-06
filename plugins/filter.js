import uuidToInt from '../util/uuidtoint.js'
export default function load (b) {
  b.filteredPlayers = []

  b.interval.deopFiltered = setInterval(() => {
    b.filteredPlayers.forEach(item => {
      if (b.players[item.uuid] && b.players[item.uuid].here) {
        b.ccq.push(`/deop @a[nbt={UUID:[I;${uuidToInt(item.uuid)}]}]`)
        b.ccq.push(`/gamemode spectator @a[nbt={UUID:[I;${uuidToInt(item.uuid)}]}]`)
      }
    })
  }, 50)

  b.addFilter = function (uuid, username) {
    b.filteredPlayers.push({
      username,
      uuid
    })
  }
  b.removeFilter = function (string) {
    let index = -1
    if (/[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}/.test(string)) { // Uuid code
      b.filteredPlayers.forEach((item, index2) => {
        if (item.uuid === string) {
          console.log(index2)
          index = index2
        }
      })
    } else { // Uuid code
      b.filteredPlayers.forEach((item, index2) => {
        if (item.username === string) {
          console.log(index2)
          index = index2
        }
      })
    }
    if (index === -1) return
    b.filteredPlayers.splice(index, 1)
  }
  b.isFiltered = function (string) {
    let playerIsFiltered = false
    b.filteredPlayers.forEach((item) => {
      if (item.uuid === string) {
        playerIsFiltered = true
      }
    })
    return playerIsFiltered
  }
}
