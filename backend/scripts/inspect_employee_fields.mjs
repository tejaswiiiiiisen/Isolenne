import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

// Find employee form state and fields
const idx = content.indexOf('registration_no');
console.log(content.slice(Math.max(0, idx - 200), Math.min(content.length, idx + 800)));
