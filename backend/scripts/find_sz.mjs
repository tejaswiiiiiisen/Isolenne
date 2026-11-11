import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

// Find all function declarations or large blocks
console.log('Total length:', content.length);

// Let's find where the UI components start
const marker = content.indexOf('Sz=');
console.log('Sz= index:', marker);
if (marker !== -1) {
  console.log('Snippet around Sz=:');
  console.log(content.slice(marker - 100, marker + 500));
}
