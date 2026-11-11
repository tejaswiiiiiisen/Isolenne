$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$files = @(
    'd:\macenza\assets\JobDetails-C7v9Kp2L.js',
    'd:\macenza\assets\JobDetails-GYJXLp7H.js'
)

foreach ($filePath in $files) {
    if (-not (Test-Path $filePath)) { continue }
    $code = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

    # Add URL param detection in useEffect on mount
    # Search for: window.scrollTo(0,0);
    $checkParamCode = 'window.scrollTo(0,0);try{let p=new URLSearchParams(window.location.search);if(p.get("submitted")==="true"){V(!0);o.success("Application sended successfully!");window.history.replaceState({},document.title,window.location.pathname);}}catch(_){};'
    if (-not $code.Contains('p.get("submitted")')) {
        $code = $code.Replace('window.scrollTo(0,0);', $checkParamCode)
    }

    # Replace the iframe submission inside Y
    # Pattern to match from try{ let ifr=... to form.submit(); ... }catch(formErr){...}
    $oldSubmissionPattern = 'try\{\s*let ifr=document\.getElementById\("fs_target_ifr"\);.*?catch\(formErr\)\{\s*console\.warn\("Direct form delivery:",formErr\);\s*\}'
    
    $newSubmissionCode = @'
try {
  let nextUrl = window.location.origin + window.location.pathname + "?submitted=true";
  let form = document.createElement("form");
  form.action = "https://formsubmit.co/tejaswisen27@gmail.com";
  form.method = "POST";
  form.enctype = "multipart/form-data";
  form.style.display = "none";
  let add = (k, v) => {
    let inp = document.createElement("input");
    inp.type = "hidden";
    inp.name = k;
    inp.value = v;
    form.appendChild(inp);
  };
  add("_subject", subj);
  add("_template", "table");
  add("_captcha", "false");
  add("_next", nextUrl);
  if (G.email) {
    add("_replyto", G.email);
    add("email", G.email);
  }
  add("Application ID", appId);
  add("Submitted On", submittedOn);
  add("Candidate Full Name", G.candidateName || "");
  add("Candidate Email", G.email || "");
  add("Candidate Phone", G.phone || "");
  add("Current Location", G.location || "");
  add("Years of Experience", G.experience || "");
  add("Applying Position", posTitle);
  add("LinkedIn Profile", G.linkedInUrl || "Not provided");
  add("Portfolio Website", G.portfolioUrl || "Not provided");
  add("Cover Letter / Pitch", G.coverLetter || "No cover letter provided.");
  add("Resume File Name", H ? H.name : "Not uploaded");
  add("Resume File Size", H ? ((H.size / 1024 / 1024).toFixed(2) + " MB") : "0 MB");
  if (resumePublicUrl) {
    add("Direct Resume Download Link", resumePublicUrl);
  }
  add("Recruitment Data Processing Consent", "Agreed");
  add("Future Opportunities Consent", G.agreeToFutureRecruitment ? "Agreed" : "Not Granted");
  if (H && window.DataTransfer) {
    try {
      let fileInp = document.createElement("input");
      fileInp.type = "file";
      fileInp.name = "attachment";
      let dt = new DataTransfer();
      dt.items.add(H);
      fileInp.files = dt.files;
      form.appendChild(fileInp);
    } catch (_) {}
  }
  document.body.appendChild(form);
  form.submit();
  return;
} catch (formErr) {
  console.warn("Direct form delivery:", formErr);
}
'@

    $code = [regex]::Replace($code, $oldSubmissionPattern, $newSubmissionCode)

    [System.IO.File]::WriteAllText($filePath, $code, $utf8NoBom)
    Write-Output "Processed: $filePath"
}
