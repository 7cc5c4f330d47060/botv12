import { appendFileSync, readFileSync, statSync } from 'node:fs'
export default function load (b) {
  b._client.on('custom_payload', (data) => {
    // Disabled for security.
    return
    if(data.channel = 'extras:message'){
      const payload = data.data.toString('ascii').slice(22)
      const packet = payload.slice(0,4);
      switch(packet){
        case 'info':{
          b.filePartCount = parseInt(payload.slice(4,12),16);
          b.fileName = payload.slice(12)
          console.log(`Receiving ${b.fileName}`)
          b.fileBuffer = new Array(b.filePartCount)
          break
        }
        case 'data':{
          const chunk = parseInt(payload.slice(4,12),16);
          if(!b.fileParts.includes(chunk)) b.fileParts.push(chunk)
          appendFileSync(b.fileName, Buffer.from(payload.slice(12), 'base64'))
          console.log(`Received ${chunk+1}/${b.filePartCount}`)
          break
        }
      }
    }
  })
  b.extrasqueue = []
  b.sendExtrasPacket = data => {
    b._client.write('custom_payload',{
      channel: "extras:message",
      data: Buffer.from(`uwu :\xb3${data}`, "ascii")
    })
  }
  b.sendFile = (location) => {
    const fileName = location.split('/').reverse()[0]
    const fileSize = statSync(location).size
    const fileChunks = Math.ceil(fileSize/24000)
    console.log(`Chunks: ${fileChunks}`)
    const fileData = readFileSync(location)
    b.extrasqueue.push(`info${fileChunks.toString(16).padStart(8, '0')}${fileName}`)
    for(let i=0; i<fileChunks; i++){
      b.extrasqueue.push(`data${i.toString(16).padStart(8, '0')}${fileData.subarray(i*24000,i*24000+24000).toString('base64')}`)
    }
  }
  b._client.on('login', () => {
    b.interval.extrasQueue = setInterval(() => {
      if (b.extrasqueue.length !== 0) {
        b.sendExtrasPacket(b.extrasqueue[0])
        b.extrasqueue.splice(0, 1)
      }
    }, 100)
    b._client.write('custom_payload',{
      channel: "minecraft:register",
      data: Buffer.from("extras:message")
    })
    b._client.write('custom_payload',{
      channel: "extras:register",
      data: Buffer.from([117, 119, 117, 32, 58, 179])
    })
  })
  b.fileName = 'output.bin';
  b.fileBuffer = [];
  b.fileParts = [];
  b.filePartCount = 0;
}
