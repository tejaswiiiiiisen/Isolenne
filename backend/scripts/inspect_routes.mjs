import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/index-CJjfnUDP.js', 'utf-8');
console.log('index size:', content.length);

// Search for route definitions
const routeMatches = content.matchAll(/path:\s*['"]([^'"]+)['"]/g);
const routes = new Set();
for (const m of routeMatches) {
  routes.add(m[1]);
}
console.log('Routes in index:', Array.from(routes));

// Search for dynamic imports
const importMatches = content.matchAll(/import\(['"]([^'"]+)['"]\)/g);
const imports = new Set();
for (const m of importMatches) {
  imports.add(m[1]);
}
console.log('Dynamic imports:', Array.from(imports));
