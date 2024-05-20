THREADS=3 STRATEGY=random node main.js
THREADS=3 STRATEGY=leastbusy node main.js
THREADS=3 STRATEGY=roundrobin node main.js
npx autocannon -c 5 -a 20 http://localhost:1337
