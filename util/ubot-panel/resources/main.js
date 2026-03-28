let autoScroll = true
let maxMessages = 250
let playerCount = 0
function sendCommand () {
  ws.send(JSON.stringify({ event: 'command', data: { command: document.getElementById('chatInput').value } }))
  document.getElementById('chatInput').value = ''
}
const serverElements = []
// List from https://stackoverflow.com/questions/7381974/which-characters-need-to-be-escaped-in-html
const escapeHtml = (text) => {
  return (text + '')
    .replaceAll('&', '&amp;')
    .replaceAll('>', '&gt;')
    .replaceAll('<', '&lt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
    .replaceAll('\n', '<br>')
}
const addMessage = function (content, type) {
  const chatField = document.getElementById('chatContent')
  const element = document.createElement('p')
  element.innerHTML = content
  element.classList.add(type)
  chatField.appendChild(element)
  if (chatField.children.length > maxMessages) chatField.children[0].remove()
  if (autoScroll) chatField.scrollTo(0, chatField.scrollHeight)
}
const openContextMenu = (data, e) => {
  const cm = document.getElementById("contextMenu2")
  cm.style.display = "block"
  cm.innerHTML = ""
  for (const item of data) {
    const button = document.createElement('button')
    button.classList.add('contextMenu2Item')
    button.innerHTML = item.text
    button.onclick = item.click
    cm.appendChild(button)
  }
  let posX = e.clientX
  if (posX + cm.offsetWidth > innerWidth) posX -= cm.offsetWidth
  let posY = e.clientY
  if (posY + cm.offsetHeight > innerHeight) posY -= cm.offsetHeight
  cm.style.left = `${posX}px`
  cm.style.top = `${posY}px`
}
const closeContextMenu = (data, e) => {
  document.getElementById('contextMenu2').style.display="none"
}
onload = () => {
  startWs()
  initWindow(false)
  document.body.onmousedown = (e) => {
    if(!document.getElementById('contextMenu2').contains(e.target)) {
      closeContextMenu()
    }
  }
}

function addPlayer (server, uuid, data) {
  if(!serverElements[server]) {
    const element2 = document.createElement('div')
    element2.id=`playerList_s${server}`
    element2.classList.add('playerList_server')
    // list
    const elementsc = document.createElement('div')
    elementsc.classList.add('playerListContent')
    // header
    const elementh = document.createElement('p')
    elementsc.classList.add('playerListHeader')
    elementh.innerHTML="(server name)"
    element2.appendChild(elementh)
    element2.appendChild(elementsc)
    document.getElementById('playerContent').appendChild(element2)
    serverElements[server]=element2
  }
  playerCount++
  document.getElementById('playerCount').innerHTML = playerCount
  const element = document.createElement('div')
  element.id=`playerListItem_s${server}_u${uuid}`
  element.classList.add('playerItem')
  element.oncontextmenu = (e) => {
    console.log(e)
    openContextMenu([
      {
        text: 'Info',
        click: () => {
          alert("Not supported yet.")
          closeContextMenu()
        }
      },
      {
        text: 'Copy Username',
        click: () => {
          navigator.clipboard.writeText(data.realName)
          closeContextMenu()
        }
      },
      {
        text: 'Copy UUID',
        click: () => {
          navigator.clipboard.writeText(uuid)
          closeContextMenu()
        }
      }
    ],e)
    e.preventDefault()
  }
  element.innerHTML = `S${server} ${data.realName}`
  serverElements[server].getElementsByClassName('playerListContent')[0].appendChild(element)
}
const startWs = function () {
  addMessage('Attempting to reconnect', 'message-cmdoutput')
  ws = new WebSocket('ws://localhost:12365')
  ws.addEventListener('close', () => {
    addMessage('Connection lost. Reconnecting in 2.5s', 'message-cmdwarn')
    setTimeout(startWs, 2500)
  })
  ws.addEventListener('open', () => {
    addMessage('Connected', 'message-cmdsuccess')
  })
  ws.addEventListener('message', payload => {
    const json = JSON.parse(payload.data)
    if (json.event === 'serverChat') {
      addMessage(`<span class="msginfo lw lmh">[${json.data.server}] [${json.data.type}] </span>${json.data.data}`, 'message-chat')
    } else if (json.event === 'rawChat') {
      addMessage(json.data.data, `message-${json.data.msgType}`)
    } else if (json.event === 'playerInfo') {
      for (const player in json.data.data) {
        addPlayer(json.data.server, player, json.data.data[player])
      }
    } else if (json.event === 'serverList') {
      for (const server of json.data.data) {
        console.log(`${server.host}:${server.port ?? 25565}`)
      }
    } else if (json.event === 'playerQuit') {
      const element = document.getElementById(`playerListItem_s${json.data.server}_u${json.data.uuid}`)
      if(!element) return;
      element.remove()
    } else if (json.event === 'playerAdd') {
      addPlayer(json.data.server, json.data.uuid, json.data)
    } else if (json.event === 'playerClear') {
      serverElements[json.data.server].getElementsByClassName('playerListContent')[0].innerHTML=''
    }
  })
}
