import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

// Match localStorage with quotes OR backticks
const lsMatches = content.matchAll(/localStorage\.(getItem|setItem|removeItem)\([`'"]([^`'"]+)[`'"]/g);
const keys = new Set();
for (const m of lsMatches) {
  keys.add(m[2]);
}
console.log('All localStorage keys:');
console.log(Array.from(keys));

// Match Supabase queries with quotes OR backticks
const sbMatches = content.matchAll(/([a-zA-Z0-9_$]+)\.from\([`'"]([^`'"]+)[`'"]/g);
const tables = new Set();
for (const m of sbMatches) {
  tables.add(`${m[1]}.from('${m[2]}')`);
}
console.log('All .from() queries:');
console.log(Array.from(tables));
