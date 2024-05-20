const Fastify = require('fastify');
const RpcWorkerPool = require('./rpc-worker');
const worker = new RpcWorkerPool('./worker.js', 4, 'leastbusy');
const template = require('./template.js')