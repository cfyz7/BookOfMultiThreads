self.onmessage = ({data: {buffer, name}}) => {
  postMessage('ready')
  const view = new Int32Array(buffer);
  console.log(`Исполнитель ${name} запущен`);
  const result = Atomics.wait(view, 0, 0);
  console.log(`Исполнитель ${name} разбужен с кодом ${result}`)
}