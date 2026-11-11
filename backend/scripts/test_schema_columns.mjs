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
  // Try inserting an empty object or invalid object to see column error or table info
  const resApp = await req('/rest/v1/applications', 'POST', { id: 'test_check' });
  console.log('Insert applications test:', resApp.status, resApp.data);

  const resContact = await req('/rest/v1/contact_submissions', 'POST', { id: 'test_check' });
  console.log('Insert contact_submissions test:', resContact.status, resContact.data);
})();
