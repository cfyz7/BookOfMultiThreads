self.onmessage = ({data: {buffer, name}}) => {
  const view = new Int32Array(buffer);
  console.log(`Исполнитель ${name} запущен`);
  const result = Atomics.wait(view, 0, 0, 1000);
  console.log(`Исполнитель ${name} разбужен с кодом ${result}`)
}