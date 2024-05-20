npx -p wabt wat2wasm add.wat -o add.wasm
docker run --rm -v $(pwd):src -u ${id -u}:${id -g} emscripten/emsdk emcc happycoin-threads.c -pthread -s PTHREAD_POOL_SIZE=4 -o happycoin-threads.js
npx -p assemblyscript asc newAdd.ts --binaryFile=newAdd.wasm
