console.log('hello from worker.js!')
self.onmessage = (msg) => {
  console.log('message from main!', msg.data)
  postMessage('message, send worker!')
}
// self = globalThis, becase not object Window in Web Worker