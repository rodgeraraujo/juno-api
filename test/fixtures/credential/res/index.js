const fs = require('fs');
const path = require('path');

exports.get = fs.readFileSync(path.join(__dirname, 'get.txt'), 'utf8');
