import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

function findContext(kw) {
  let idx = 0;
  console.log(`\n=== CONTEXT FOR ${kw} ===`);
  while ((idx = content.indexOf(kw, idx)) !== -1) {
    console.log(content.slice(Math.max(0, idx - 150), Math.min(content.length, idx + 250)));
    console.log('-------------------');
    idx += kw.length;
  }
}

findContext(`from(\`employees\`)`);
findContext(`auth.signInWithPassword`);
findContext(`auth.signUp`);
findContext(`from(\`applications\`)`);
findContext(`from(\`jobs\`)`);
