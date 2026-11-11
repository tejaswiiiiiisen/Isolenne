import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

const displayNames = content.matchAll(/([a-zA-Z0-9_$]+)\.displayName\s*=\s*[`'"]([a-zA-Z0-9_$]+)[`'"]/g);
for (const d of displayNames) {
  if (['Tooltip', 'ResponsiveContainer', 'Legend', 'AreaChart', 'BarChart', 'PieChart', 'LineChart', 'Line'].includes(d[2])) {
    console.log(d[2], '=>', d[1]);
  }
}

// Also search where ResponsiveContainer is defined
const rcIdx = content.indexOf('ResponsiveContainer');
if (rcIdx !== -1) {
  console.log('ResponsiveContainer snippet:', content.slice(rcIdx - 50, rcIdx + 150));
}
