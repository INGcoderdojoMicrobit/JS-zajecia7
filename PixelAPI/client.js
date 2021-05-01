const fetch = require('node-fetch');

console.log(JSON.parse(fetch('http://localhost:3000/figlet?text=test')))