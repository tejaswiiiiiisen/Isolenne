import https from 'https';

const apikey = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8';

function req(path) {
  return new Promise((resolve) => {
    const url = new URL('https://cmpghiavghpdwtyuiuqm.supabase.co' + path);
    const options = {
      headers: {
        'apikey': apikey,
        'Authorization': 'Bearer ' + apikey,
      }
    };
    https.get(url, options, (res) => {
      resolve(res.statusCode);
    });
  });
}

const resumeNames = [
  'resume_url', 'resume_path', 'resume_file', 'cv_url', 'cv', 'file', 'attachment',
  'document_url', 'resume_link', 'resumes', 'pdf_url', 'file_path', 'storage_path'
];

(async () => {
  for (const name of resumeNames) {
    const status = await req('/rest/v1/applications?select=' + name + '&limit=1');
    if (status === 200) console.log('FOUND COLUMN IN applications:', name);
  }

  // Also check id and more on contact_submissions
  const moreContact = ['id', 'country', 'notes', 'status', 'follow_up', 'budget_range', 'message'];
  for (const name of moreContact) {
    const status = await req('/rest/v1/contact_submissions?select=' + name + '&limit=1');
    if (status === 200) console.log('FOUND COLUMN IN contact_submissions:', name);
  }
})();
