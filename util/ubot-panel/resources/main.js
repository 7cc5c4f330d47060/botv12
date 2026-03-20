let autoScroll = true
let maxMessages = 250
ws = new WebSocket("ws://localhost:12365")
ws.addEventListener("message",payload => {
    const json=JSON.parse(payload.data)
    const chatField = document.getElementById("chatContent")
    if(json.event == 'serverChat') {
        const element = document.createElement("p")
        element.innerHTML = `<span class="msginfo lw lmh">[${json.data.server}] [${json.data.type}] </span>${json.data.data}` 
        element.classList.add(`message-chat`)
        chatField.appendChild(element)
        if (chatField.children.length > maxMessages) chatField.children[0].remove()
        if (autoScroll) chatField.scrollTo(0, chatField.scrollHeight)
    } else if(json.event == 'rawChat') {
        const element = document.createElement("p")
        element.innerHTML = json.data.data
        element.classList.add(`message-${json.data.msgType}`)
        chatField.appendChild(element)
        if (chatField.children.length > maxMessages) chatField.children[0].remove()
        if (autoScroll) chatField.scrollTo(0, chatField.scrollHeight)
    }
})
