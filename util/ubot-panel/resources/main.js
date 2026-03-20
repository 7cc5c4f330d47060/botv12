const autoScroll = true
const maxMessages = 250
let playerCount = 0
function sendCommand () {
  ws.send(JSON.stringify({ event: 'command', data: { command: document.getElementById('chatInput').value } }))
  document.getElementById('chatInput').value = ''
}
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
const startWs = function () {
  addMessage('Attempting to reconnect', 'message-cmdoutput')
  ws = new WebSocket('ws://localhost:12365')
  ws.addEventListener('close', () => {
    addMessage('Connection lost. Reconnecting in 2.5s', 'message-cmdoutput')
    setTimeout(startWs, 2500)
  })
  ws.addEventListener('open', () => {
    addMessage('Connected', 'message-cmdoutput')
  })
  ws.addEventListener('message', payload => {
    const json = JSON.parse(payload.data)
    if (json.event == 'serverChat') {
      addMessage(`<span class="msginfo lw lmh">[${json.data.server}] [${json.data.type}] </span>${json.data.data}`, 'message-chat')
    } else if (json.event == 'rawChat') {
      addMessage(json.data.data, `message-${json.data.msgType}`)
    } if (json.event == 'playerInfo') {
      for (const player in json.data.data) {
        playerCount++
        document.getElementById('playerCount').innerHTML = playerCount
        const element = document.createElement('div')
        element.classList.add('playerItem')
        element.onclick = () => { alert(json.data.data[player].realName) }
        element.innerHTML = `S${json.data.server} ${json.data.data[player].realName}`
        document.getElementById('playerContent').appendChild(element)
      }
    }
  })
}
