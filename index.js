const fs = require('fs');

const readme = fs.readFileSync('./README.md', 'utf-8');
readme.replace("{{time}}", new Date().toString());
fs.writeSync("./README.md", readme);