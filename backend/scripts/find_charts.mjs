import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/Admin-BPLJ7cRc.js', 'utf-8');

// Find where AreaChart or ResponsiveContainer is referenced in the app part (after 553218)
const appPart = content.slice(553218);

const charts = ['ResponsiveContainer', 'AreaChart', 'BarChart', 'PieChart', 'LineChart'];
for (const chart of charts) {
  let idx = 0;
  console.log(`\n=== SEARCHING FOR ${chart} ===`);
  while ((idx = content.indexOf(chart, idx)) !== -1) {
    console.log(content.slice(Math.max(0, idx - 60), Math.min(content.length, idx + 100)));
    idx += chart.length;
    if (idx > 553218) {
      console.log('-> FOUND IN APP PART!');
    }
  }
}
