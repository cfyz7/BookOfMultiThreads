console.log('hello from main.js(!)');
const worker = new Worker('worker.js');
worker.onmessage = (msg) => {
  console.log('get message to worker(!)', msg.data)
}
worker.postMessage('send message from worker(!)');
console.log('finish main.js(!)')