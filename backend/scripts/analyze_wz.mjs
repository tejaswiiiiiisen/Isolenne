import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');
const idx = content.lastIndexOf('wz=');
const fullWz = content.slice(idx);

// Let's search for tab navigation and state
const tabsMatch = fullWz.match(/Cz=\{([^}]+)\}/);
if (tabsMatch) console.log('Cz map:', tabsMatch[1]);

// Let's search for table queries in wz
const queries = fullWz.matchAll(/et\.from\(['"]([^'"]+)['"]\)/g);
const tablesQueried = new Set();
for (const q of queries) tablesQueried.add(q[1]);
console.log('Tables queried in wz:', Array.from(tablesQueried));

// Let's search for localStorage keys in wz
const ls = fullWz.matchAll(/localStorage\.(?:getItem|setItem|removeItem)\(['"]([^'"]+)['"]\)/g);
const lsKeys = new Set();
for (const l of ls) lsKeys.add(l[1]);
console.log('LocalStorage keys in wz:', Array.from(lsKeys));
