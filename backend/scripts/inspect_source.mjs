import fs from 'fs';

function inspectFile(filename, keywords) {
  const content = fs.readFileSync('D:/agnix/assets/' + filename, 'utf-8');
  console.log(`\n=== INSPECTING ${filename} (size: ${content.length}) ===`);
  for (const kw of keywords) {
    let idx = 0;
    let foundCount = 0;
    while ((idx = content.indexOf(kw, idx)) !== -1) {
      foundCount++;
      const snippet = content.slice(Math.max(0, idx - 100), Math.min(content.length, idx + 200));
      console.log(`[Found "${kw}"] ...${snippet}...`);
      idx += kw.length;
      if (foundCount >= 4) break;
    }
  }
}

inspectFile('Contact-c1-iI1nI.js', ['formsubmit', 'supabase', 'contact', 'handleSubmit', 'post', 'fetch']);
inspectFile('JobDetails-C7v9Kp2L.js', ['formsubmit', 'supabase', 'applications', 'resume', 'storage']);
inspectFile('CertificateVerification-C6UvfXlH.js', ['certificates', 'verification', 'supabase', 'verify']);
inspectFile('Admin-BPLJ7cRc.js', ['jobs', 'applications', 'employees', 'bills', 'finance', 'events', 'lead']);
