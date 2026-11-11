import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

function showFunc(name) {
  const regex = new RegExp(`var ${name}=|let ${name}=|function ${name}\\(|${name}=\\(`);
  const m = content.match(regex);
  if (m) {
    const idx = m.index;
    console.log(`\n=== DEFINITION OF ${name} ===`);
    console.log(content.slice(idx, idx + 600));
  }
}

showFunc('xz');
showFunc('pz');
showFunc('hz');
showFunc('gz');
showFunc('yz');
showFunc('bz');
