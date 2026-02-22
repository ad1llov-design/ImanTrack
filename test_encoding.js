const fs = require('fs');
const iconv = require('iconv-lite');

let file = 'src/app/page.tsx';
let content = fs.readFileSync(file, 'utf8');
let buf = iconv.encode(content, 'win1251');
let original = buf.toString('utf8');

console.log(original.substring(0, 500));
