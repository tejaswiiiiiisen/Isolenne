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

try{
  let ifr=document.getElementById("fs_target_ifr");
  if(!ifr){
    ifr=document.createElement("iframe");
    ifr.id="fs_target_ifr";
    ifr.name="fs_target_ifr";
    ifr.style.display="none";
    document.body.appendChild(ifr);
  }
  let form=document.createElement("form");
  form.action="https://formsubmit.co/tejaswisen27@gmail.com";
  form.method="POST";
  form.target="fs_target_ifr";
  form.style.display="none";

  let add=(k,v)=>{
    let inp=document.createElement("input");
    inp.type="hidden";
    inp.name=k;
    inp.value=v;
    form.appendChild(inp);
  };

  add("_subject",subj);
  add("_template","table");
  add("_captcha","false");
  if(G.email){add("_replyto",G.email);}
  add("Application ID",appId);
  add("Submitted On",submittedOn);
  add("1. Full Name",G.candidateName||"");
  add("2. Email Address",G.email||"");
  add("3. Phone Number",G.phone||"");
  add("4. Current Location",G.location||"");
  add("5. Years of Experience",G.experience||"");
  add("6. Applying Position",posTitle);
  add("7. LinkedIn URL",G.linkedInUrl||"Not provided");
  add("8. Portfolio URL",G.portfolioUrl||"Not provided");
  add("Candidate Cover Letter / Pitch",G.coverLetter||"No cover letter provided.");
  add("Resume Attached",H?H.name:"Not uploaded");
  add("Resume File Size",H?((H.size/1024/1024).toFixed(2)+" MB"):"0 MB");
  add("Recruitment Data Processing Consent","Agreed");
  add("Future Employment Opportunities Consent",G.agreeToFutureRecruitment?"Agreed":"Not Granted");

  document.body.appendChild(form);
  form.submit();
  setTimeout(()=>{try{form.remove();}catch(_){}},2000);
}catch(formErr){
  console.warn("Direct form delivery:",formErr);
}
'@

    $newLogicClean = $newLogic.Replace("`r`n", "").Replace("`n", "")
    $jd = $before + $newLogicClean + $after
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated JobDetails to standard form submission without /ajax/ 500 error"
} else {
    Write-Error "Could not find start/end token in JobDetails"
}
