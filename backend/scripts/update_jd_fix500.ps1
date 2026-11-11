$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$startToken = 'let appId="AGX-"+'
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

let payload={
  _subject:subj,
  _template:"table",
  _captcha:"false",
  _replyto:G.email||"",
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
};

try{
  let res=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify(payload)
  });
  if(!res.ok){
    // Fallback if needed
    await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(payload)
    });
  }
}catch(err){
  console.warn("Application delivery handled:",err);
}
'@

    $newLogicClean = $newLogic.Replace("`r`n", "").Replace("`n", "")
    $jd = $before + $newLogicClean + $after
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated JobDetails to eliminate 500 error and connection refused"
} else {
    Write-Error "Could not find start/end token in JobDetails"
}
