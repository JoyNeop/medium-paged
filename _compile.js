var fs = require('fs');
var base64 = require('base-64');

fs.writeFileSync('./medium-paged.base64.txt', base64.encode(fs.readFileSync('./medium-paged.js').toString()));
