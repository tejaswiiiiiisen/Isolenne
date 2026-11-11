import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/index-CJjfnUDP.js', 'utf-8');
const keywords = ['admin', 'careers', 'contact', 'certificate', 'lazy', 'router', 'path'];

for (const kw of keywords) {
  let idx = 0;
  let count = 0;
  while ((idx = content.toLowerCase().indexOf(kw, idx)) !== -1) {
    count++;
    const snippet = content.slice(Math.max(0, idx - 80), Math.min(content.length, idx + 120));
    console.log(`[${kw}] ${snippet}`);
    idx += kw.length;
    if (count >= 3) break;
  }
}
