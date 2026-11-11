import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

// Find the last 20,000 characters of Admin-BPLJ7cRc.js where the React components and UI are rendered!
console.log('Total length:', content.length);
const endSlice = content.slice(content.length - 25000);
console.log('End slice snippet:');
console.log(endSlice.slice(0, 3000));

fs.writeFileSync('D:/agnix/admin_end_snippet.txt', endSlice);
