$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

# 1. Remove captcha widget in JobDetails
$jdCap = '(0,O.jsx)(`div`,{className:`flex justify-center py-2`,children:(0,O.jsx)(s,{ref:r,sitekey:`d244a6b6-9a9e-4cee-a426-d8108b8eecb2`,onVerify:e=>j(e),onExpire:()=>j(``)})}),'
if ($jd.Contains($jdCap)) {
    $jd = $jd.Replace($jdCap, 'null,')
    Write-Output "Removed hCaptcha widget from JobDetails"
} else {
    Write-Error "Could not find hCaptcha widget in JobDetails"
}

# 2. Replace the fetch block in JobDetails
$s = $jd.IndexOf('let fd=new FormData();')
$e = $jd.IndexOf('V(!0),o.success("Application sended successfully!")', $s)
if ($s -ge 0 -and $e -gt $s) {
    $before = $jd.Substring(0, $s)
    $after = $jd.Substring($e)
    
    $newFetch = @'
let fd=new FormData();
fd.append(`_subject`,`New Job Application: ${G.candidateName} - ${M?.title||'General'}`);
fd.append(`_template`,`table`);
fd.append(`_captcha`,`false`);
fd.append(`Candidate Name`,G.candidateName);
fd.append(`Email Address`,G.email);
fd.append(`Phone Number`,G.phone);
fd.append(`Current Location`,G.location);
fd.append(`Years of Experience`,G.experience);
fd.append(`Applying Position`,M?.title||`General Application`);
fd.append(`LinkedIn Profile`,G.linkedInUrl||`Not Provided`);
fd.append(`Portfolio Website`,G.portfolioUrl||`Not Provided`);
fd.append(`Cover Letter / Pitch`,G.coverLetter||`None`);
if(H){
  fd.append(`attachment`,H,H.name);
  fd.append(`Resume File`,H,H.name);
  fd.append(`Resume Info`,`${H.name} (${(H.size/1024/1024).toFixed(2)} MB)`);
}
try{
  let res=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});
  if(!res.ok){
    await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:`New Job Application: ${G.candidateName} - ${M?.title||'General'}`,_template:`table`,_captcha:`false`,"Candidate Name":G.candidateName||"","Email Address":G.email||"","Phone Number":G.phone||"","Current Location":G.location||"","Years of Experience":G.experience||"","Applying Position":M?.title||"General Application","LinkedIn Profile":G.linkedInUrl||"Not Provided","Portfolio Website":G.portfolioUrl||"Not Provided","Cover Letter / Pitch":G.coverLetter||"None","Resume File Info":H?(`${H.name} (${(H.size/1024/1024).toFixed(2)} MB)`):"Not uploaded"})});
  }
}catch(postErr){
  console.warn("Primary upload fallback:",postErr);
  try{
    await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:`New Job Application: ${G.candidateName} - ${M?.title||'General'}`,_template:`table`,_captcha:`false`,"Candidate Name":G.candidateName||"","Email Address":G.email||"","Phone Number":G.phone||"","Current Location":G.location||"","Years of Experience":G.experience||"","Applying Position":M?.title||"General Application","LinkedIn Profile":G.linkedInUrl||"Not Provided","Portfolio Website":G.portfolioUrl||"Not Provided","Cover Letter / Pitch":G.coverLetter||"None","Resume File Info":H?(`${H.name} (${(H.size/1024/1024).toFixed(2)} MB)`):"Not uploaded"})});
  }catch(_){}
}
'@
    # Clean newlines from newFetch
    $newFetchClean = $newFetch.Replace("`r`n", "").Replace("`n", "")
    $jd = $before + $newFetchClean + $after
    Write-Output "Replaced JobDetails fetch logic to target tejaswisen27@gmail.com without typo"
} else {
    Write-Error "Could not find fetch slice in JobDetails"
}

# 3. Clean resetCaptcha reference
$jd = $jd.Replace('r.current?.resetCaptcha(),', '')
[System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
Write-Output "Saved updated JobDetails-GYJXLp7H.js"
