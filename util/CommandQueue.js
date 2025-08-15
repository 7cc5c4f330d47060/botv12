import EventEmitter from 'node:events'
export default class CommandQueue extends EventEmitter { // botv5-style command queue (from memory)
  constructor (b) {
    super()

    this.queue = [];
    this.rate = 0;
    
    this.createTimeout = (rate) => {
      this.rate = rate
      this.timeout = setTimeout(() => {
        const r = this.advance()
        if (r === -1){
          this.emit('end')
        } else {
          this.createTimeout(r)
        }
      }, rate)
    }

    this.advance = function () {
      if (b.host.options.useChat) return
      while(this.queue[0] && this.queue[0][0] === 'c') { 
        b.sendCommandNow(this.queue[0].slice(1))
        this.queue.splice(0, 1)
      }
      if (this.queue[0] && this.queue[0].length !== 0) {
        const command = this.queue[0][0];
        let rate;
        switch (command) {
          case 'b':
            rate = this.rate
            break
          case 's':
            rate = +this.queue[0].slice(1)
            break
          case 'e':
            rate = -1
            break
        }
        this.queue.splice(0, 1)
        return rate
      } else {
        return this.rate
      }
    }
  }
}