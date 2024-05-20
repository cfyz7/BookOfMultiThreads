if (!crossOriginIsolated) {
  throw new Error('Невозможно использовать SharedArrayBuffer')
};

const worker = new Worker('worker.js');

const buffer = new SharedArrayBuffer(1024);
const view = new Uint8Array(buffer);

console.log('Сейчас', view[0])
worker.postMessage(buffer);

setTimeout(() => {
  console.log('Позже', view[0]);
  console.log('prop', buffer.foo)
}, 500)
