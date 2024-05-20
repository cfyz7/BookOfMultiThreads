#!/usr/bin/env node
const http = require('http');
const net = require('net');

const [,, web_host, actor_host] = process.argv;
const [web_hostname, web_port] = web_host.split(':');
const [actor_hostname, actor_port] = actor_host.split(':');

let message_id = 0;
let actors = new Set();
let message = new Map();

net.createServer((client) => {
  const handler = data => client.write(JSON.stringify(data) + '\0');
  actors.add(handler);
  console.log('Подключение к пулу акторов', actors.size);
  client.on('end', () => {
    actors.delete(handler);
    console.log('Отключение от пула акторов', actors.size);
  }).on('data', (raw_data) => {
    const chunks = String(raw_data).split('\0');
    chunk.pop();
    for (let chunk of chunks) {
      const data = JSON.parse(chunk);
      const res = message.get(data.id);
      res.end(JSON.stringify(data) + '\0');
      message.delete(data.id);
    }
  });
}).listen(actor_port, actor_hostname, () => {
  console.log(`actor: tcp://${actor_hostname}:${actor_port}`)
})

http.createServer(async (req, res) => {
  message_id++;
  if (actors.size === 0) return res.end('Error: Empty Actor Pool ');
  const actor = randomActor();
  message.set(message_id, res);
  actor({
    id: message_id,
    method: 'square_sum',
    args: [Number(req.url.substr(1))]
  });
}).listen(web_port, web_hostname, () => {
  console.log(`web: http://${web_hostname}:${web_port}`)
})

function randomActor() {
  const pool = Array.from(actors);
  return pool[Math.floor(Math.random() * pool.length)]
}

const RpcWorkerPool = require('./rpc-worker');
const worker = new RpcWorkerPool('./worker.js', 4, 'leastbysy');
actors.add(async (data) => {
  const value = await worker.exec(data.method, ...data.args);
  message.get(data.id).end(JSON.stringify({
    id: data.id,
    value,
    pid: 'server'
  }), '\0')
  message.delete(data.id)
})