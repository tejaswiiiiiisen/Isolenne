import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');
const idx = content.lastIndexOf('wz=');
console.log('Index of wz=:', idx);
const snippet = content.slice(idx, idx + 4000);
console.log(snippet);
