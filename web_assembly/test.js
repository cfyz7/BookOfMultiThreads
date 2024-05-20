const myF = (num) => {
  let result = 0
  for (let i = 0; i < num; i++) {
    result += i
  }
  return result
}


//             BROWSER
// Измерение времени выполнения функции
// const t0 = performance.now();
// myF(10_000_000); // Вызов функции
// const t1 = performance.now();

// const executionTime = t1 - t0;
// console.log('Время выполнения: ' + executionTime + ' мс');


//             NODE
console.time('functionTime');

// Вызов функции
myF(10_000_000);

// Конец измерения времени и вывод затраченного времени
console.timeEnd('functionTime');