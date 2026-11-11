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

const possibleColumns = [
  'name', 'email', 'phone', 'company', 'project_type', 'budget', 'message', 'details',
  'notes', 'status', 'created_at', 'country', 'budget_range', 'subject'
];

(async () => {
  for (const col of possibleColumns) {
    const res = await req('/rest/v1/contact_submissions?select=' + col + '&limit=1', 'GET');
    if (res.status === 200) {
      console.log('contact_submissions HAS COLUMN:', col);
    } else {
      // console.log('contact_submissions NO COLUMN:', col);
    }
  }

  const appColumns = [
    'id', 'job_id', 'candidate_name', 'email', 'phone', 'location', 'experience',
    'linkedin_url', 'portfolio_url', 'cover_letter', 'resume', 'status', 'notes',
    'created_at', 'updated_at'
  ];
  for (const col of appColumns) {
    const res = await req('/rest/v1/applications?select=' + col + '&limit=1', 'GET');
    if (res.status === 200) {
      console.log('applications HAS COLUMN:', col);
    } else {
      console.log('applications NO COLUMN:', col);
    }
  }
})();
