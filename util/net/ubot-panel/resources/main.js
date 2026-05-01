let autoScroll = true
let maxMessages = 250
let playerCount = 0
function sendCommand () {
  const command = document.getElementById('chatInput').value
  const commandArgs = command.split(' ')
  if(commandArgs[0] === '.setip') {
    socketIp=commandArgs[1]
    addMessage(`Set socket IP to ${socketIp}`)
    ws.close()
    clearInterval(reloadTimer)
    ws.removeEventListener('close', closeFunction) 
    startWs()
  } else {
    ws.send(JSON.stringify({ event: 'command', data: { command } }))
  }
  document.getElementById('chatInput').value = ''
}
let serverElements = []
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
  //createWindow('base', 'main_normal', 1000, 500, 'Test Window for N3CL WM', '')
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
          const element2 = document.createElement("div")
          const elementButton = document.createElement("button")
          elementButton.innerHTML = "OK"
          elementButton.onclick = () => {document.getElementById('window_infoDialog_bg').remove()}
          elementButton.style.position = 'absolute';
          elementButton.style.right = "10px";
          elementButton.style.bottom = "10px";
          elementButton.style.width = "100px";
          elementButton.style.height = "30px";
          elementButton.style.border = "0";
          elementButton.innerHTML = "OK"
          element2.appendChild(elementButton)
          const elementSpan = document.createElement("span")
          elementSpan.style.position = 'absolute';
          elementSpan.style.top = "30px";
          elementSpan.style.left = "20px";
          elementSpan.innerHTML = "The info section is being worked on."
          elementSpan
          element2.appendChild(elementSpan)
          createWindow("infoDialog", "main_normal", 400, 150, "title", element2)
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

function closeFunction ()  {
  addMessage('Connection lost. Reconnecting in 2.5s', 'message-cmdwarn')
  
  reloadTimer = setTimeout(startWs, 2500)
}

function closeSidebar () {
  document.getElementById('sidebarc').classList.add('sbHidden')
}
function openSidebar () {
  document.getElementById('sidebarc').classList.remove('sbHidden')
}
function showSection (name, mobile){
  const elements = document.getElementsByClassName('section')
  for (const element of elements) {
    console.log(element)
    if(!element.classList.contains('mobileHide')) element.classList.add('mobileHide')
  }
  document.getElementById(`${name}Section`).classList.remove('mobileHide')
  closeSidebar()
}
let reloadTimer
let socketIp =`ws://${location.host.split(':')[0]}:12365`
const startWs = function () {
  if (location.protocol === 'https:') {
    addMessage('The botv12 panel does not currently support the HTTPS protocol.', 'message-cmdoutput')
    return
  }
  addMessage('Attempting to reconnect', 'message-cmdoutput')
  ws = new WebSocket(socketIp)
  ws.addEventListener('close', closeFunction)
  ws.addEventListener('open', () => {
    document.getElementById('playerContent').innerHTML=''
    playerCount = 0
    document.getElementById('playerCount').innerHTML = playerCount
    for (item of serverElements) item.remove
    serverElements = []
    addMessage('Connected', 'message-cmdsuccess')
  })
  ws.addEventListener('message', payload => {
    const json = JSON.parse(payload.data)
    if (json.event === 'serverChat') {
      addMessage(`<span class="msginfo">[${json.data.serverName} (ID ${json.data.server})] [${json.data.type}]<span class="chat_uuid"> [${json.data.uuid}]</span> </span>${json.data.data}`, 'message-chat')
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
      playerCount--
      document.getElementById('playerCount').innerHTML = playerCount
    } else if (json.event === 'playerAdd') {
      addPlayer(json.data.server, json.data.uuid, json.data)
    } else if (json.event === 'playerClear') {
      const count = serverElements[json.data.server].getElementsByClassName('playerListContent')[0].childElementCount
      playerCount -= count
      document.getElementById('playerCount').innerHTML = playerCount
      serverElements[json.data.server].remove()
      delete serverElements[json.data.server]
    }
  })
}
