$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$startToken = 'let fd=new FormData();'
$endToken = 'V(!0),o.success("Application sended successfully!")'

$s = $jd.IndexOf($startToken)
$e = $jd.IndexOf($endToken)

if ($s -ge 0 -and $e -gt $s) {
    $before = $jd.Substring(0, $s)
    $after = $jd.Substring($e)

    $newLogic = @'
let appId="AGX-"+new Date().getFullYear()+"-"+Math.floor(1000+Math.random()*9000);
let submittedOn=new Date().toLocaleString("en-US",{month:"short",day:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit",hour12:true,timeZone:"Asia/Kolkata"})+" (IST)";
let posTitle=(M&&M.title)?M.title:"General Application";
let subj="New Job Application | "+posTitle+" | "+(G.candidateName||"Candidate");
let fd=new FormData();
fd.append("_subject",subj);
fd.append("_template","table");
fd.append("_captcha","false");
if(G.email){fd.append("_replyto",G.email);}
fd.append("Application ID",appId);
fd.append("Submitted On",submittedOn);
fd.append("1. Full Name",G.candidateName||"");
fd.append("2. Email Address",G.email||"");
fd.append("3. Phone Number",G.phone||"");
fd.append("4. Current Location",G.location||"");
fd.append("5. Years of Experience",G.experience||"");
fd.append("6. Applying Position",posTitle);
fd.append("7. LinkedIn URL",G.linkedInUrl||"Not provided");
fd.append("8. Portfolio URL",G.portfolioUrl||"Not provided");
fd.append("Candidate Cover Letter / Pitch",G.coverLetter||"No cover letter provided.");
if(H){
  fd.append("attachment",H,H.name);
  fd.append("Resume Attached",H.name);
  fd.append("Resume File Size",(H.size/1024/1024).toFixed(2)+" MB");
}
fd.append("Recruitment Data Processing Consent","Agreed");
fd.append("Future Employment Opportunities Consent",G.agreeToFutureRecruitment?"Agreed":"Not Granted");
try{
  fetch("http://localhost:5174/api/apply",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      CandidateName:G.candidateName,
      Email:G.email,
      Phone:G.phone,
      Location:G.location,
      Experience:G.experience,
      Position:posTitle,
      LinkedInUrl:G.linkedInUrl,
      PortfolioUrl:G.portfolioUrl,
      CoverLetter:G.coverLetter,
      ResumeFilename:H?H.name:"None",
      ResumeFilesize:H?((H.size/1024/1024).toFixed(2)+" MB"):"0 MB",
      AgreeFuture:G.agreeToFutureRecruitment
    })
  }).catch(()=>{});
}catch(_){}
try{
  let res=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});
  if(!res.ok){
    await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify({
        _subject:subj,
        _template:"table",
        _captcha:"false",
        "Application ID":appId,
        "Submitted On":submittedOn,
        "1. Full Name":G.candidateName||"",
        "2. Email Address":G.email||"",
        "3. Phone Number":G.phone||"",
        "4. Current Location":G.location||"",
        "5. Years of Experience":G.experience||"",
        "6. Applying Position":posTitle,
        "7. LinkedIn URL":G.linkedInUrl||"Not provided",
        "8. Portfolio URL":G.portfolioUrl||"Not provided",
        "Candidate Cover Letter / Pitch":G.coverLetter||"No cover letter provided.",
        "Resume Attached":H?H.name:"Not uploaded",
        "Resume File Size":H?((H.size/1024/1024).toFixed(2)+" MB"):"0 MB",
        "Recruitment Data Processing Consent":"Agreed",
        "Future Employment Opportunities Consent":G.agreeToFutureRecruitment?"Agreed":"Not Granted"
      })
    });
  }
}catch(postErr){
  console.warn("Primary email upload fallback:",postErr);
}
'@

    $newLogicClean = $newLogic.Replace("`r`n", "").Replace("`n", "")
    $jd = $before + $newLogicClean + $after
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated JobDetails submission logic with premium template formatting"
} else {
    Write-Error "Could not find start/end token in JobDetails"
}
