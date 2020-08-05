const fs = require('fs');

let readme = fs.readFileSync('./README.md', 'utf-8');
readme = readme.replace("{{time}}", new Date().toString());
fs.writeFileSync("./README.md", readme);