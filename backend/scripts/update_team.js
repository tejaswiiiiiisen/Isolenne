const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'assets', 'About-Cknf45eQ.js');
let code = fs.readFileSync(targetFile, 'utf8');

const startMarker = 'm=[{name:`Tejaswi Sen`';
const startIdx = code.indexOf(startMarker);
if (startIdx === -1) {
    console.error('Error: start marker not found');
    process.exit(1);
}

const endMarker = 'Secutry Tester.webp`}]';
const endIdx = code.indexOf(endMarker, startIdx);
if (endIdx === -1) {
    console.error('Error: end marker not found');
    process.exit(1);
}

const fullEndIdx = endIdx + endMarker.length;

const newArray = 'm=[{name:`Tejaswi Sen`,role:`Founder & CEO`,image:`/Team/tejaswi_sen.webp`}]';

code = code.substring(0, startIdx) + newArray + code.substring(fullEndIdx);

// Update grid to centered flex layout
code = code.replace(
    'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 team-grid',
    'flex justify-center team-grid'
);

code = code.replace(
    'team-card group',
    'team-card group max-w-sm w-full text-center'
);

fs.writeFileSync(targetFile, code, 'utf8');
console.log('Successfully updated About-Cknf45eQ.js with Node script!');
