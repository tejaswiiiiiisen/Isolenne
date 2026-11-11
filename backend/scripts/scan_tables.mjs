import fs from 'fs';
import path from 'path';

const dir = 'D:/agnix/assets';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.js'));

const supabaseCalls = new Set();
const storageCalls = new Set();
const localStorageKeys = new Set();

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf-8');
  
  const m1 = content.matchAll(/\.from\(['"]([a-zA-Z0-9_\-]+)['"]\)/g);
  for (const m of m1) supabaseCalls.add(m[1]);

  const m2 = content.matchAll(/storage\.from\(['"]([a-zA-Z0-9_\-]+)['"]\)/g);
  for (const m of m2) storageCalls.add(m[1]);

  const m3 = content.matchAll(/localStorage\.(?:getItem|setItem|removeItem)\(['"]([a-zA-Z0-9_\-]+)['"]\)/g);
  for (const m of m3) localStorageKeys.add(m[1]);
});

console.log('Supabase tables used:', Array.from(supabaseCalls));
console.log('Supabase storage buckets used:', Array.from(storageCalls));
console.log('LocalStorage keys used:', Array.from(localStorageKeys));
