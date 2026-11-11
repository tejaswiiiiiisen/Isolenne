import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');
const appPart = content.slice(553218);

// Search for jsx tags
const tags = appPart.matchAll(/\(0,q\.jsx\)\(([a-zA-Z0-9_$]+),/g);
const usedTags = new Set();
for (const t of tags) usedTags.add(t[1]);
console.log('JSX tags used in App Part:');
console.log(Array.from(usedTags));
