import https from 'https';

const apikey = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8';

function req(path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const url = new URL('https://cmpghiavghpdwtyuiuqm.supabase.co' + path);
    const options = {
      method,
      headers: {
        'apikey': apikey,
        'Authorization': 'Bearer ' + apikey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    };
    const r = https.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, data });
      });
    });
    r.on('error', err => resolve({ error: err.message }));
    if (body) r.write(JSON.stringify(body));
    r.end();
  });
}

(async () => {
  // Test inserting into contact_submissions
  const contactPayload = {
    name: 'Test Contact Lead',
    email: 'testlead@example.com',
    phone: '+1 555-0199',
    company: 'Acme Test Corp',
    project_type: 'AI Development',
    budget: '$10k - $25k',
    details: 'This is a test lead submission verification.'
  };
  const contactRes = await req('/rest/v1/contact_submissions', 'POST', contactPayload);
  console.log('contact_submissions INSERT status:', contactRes.status, contactRes.data);

  // Test inserting into applications
  // Get an active job id first
  const jobsRes = await req('/rest/v1/jobs?select=id,title&limit=1', 'GET');
  const jobs = JSON.parse(jobsRes.data);
  const jobId = jobs[0]?.id;
  console.log('Using job ID:', jobId);

  const appPayload = {
    job_id: jobId,
    candidate_name: 'Test Candidate',
    email: 'testcandidate@example.com',
    phone: '+1 555-0123',
    location: 'Remote',
    experience: '3+ years',
    linkedin_url: 'https://linkedin.com/in/testcandidate',
    portfolio_url: 'https://github.com/testcandidate',
    cover_letter: 'Passionate developer interested in AI systems.',
    resume_url: 'https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/resumes/sample.pdf',
    status: 'Applied'
  };
  const appRes = await req('/rest/v1/applications', 'POST', appPayload);
  console.log('applications INSERT status:', appRes.status, appRes.data);
})();
