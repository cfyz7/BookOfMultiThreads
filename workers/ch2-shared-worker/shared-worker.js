const ID = Math.floor(Math.random() * 999999);
console.log('shared-worker.js', ID);

const ports = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  ports.add(port);
  console.log('CONN', ID, port.size);
  port.onmessage = (event) => {
    console.log('MESSAGE', ID, event.data);
    for(let p of ports) {
      p.postMessage([ID, event.data,]);
    };
  };
}

// worker.port.postMessage('hello, world')


