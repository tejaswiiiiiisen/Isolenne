import fs from 'fs';

const content = fs.readFileSync('D:/agnix/assets/JobDetails-C7v9Kp2L.js', 'utf-8');
const idx = content.indexOf('resumePublicUrl');
console.log(content.slice(idx, idx + 1500));
