$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

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

let resumePublicUrl="";
if(H){
  try{
    let ext=H.name.split(".").pop().toLowerCase();
    let fname=Date.now()+"-"+Math.round(Math.random()*1e9)+"."+ext;
    let{data:upData,error:upErr}=await T.storage.from("resumes").upload(fname,H);
    if(!upErr){
      let{data:{publicUrl:pUrl}}=T.storage.from("resumes").getPublicUrl(fname);
      resumePublicUrl=pUrl||"";
    }
  }catch(_){}
}

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
  form.enctype="multipart/form-data";
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
  if(G.email){
    add("_replyto",G.email);
    add("email",G.email);
  }
  add("Application ID",appId);
  add("Submitted On",submittedOn);
  add("Candidate Full Name",G.candidateName||"");
  add("Candidate Email",G.email||"");
  add("Candidate Phone",G.phone||"");
  add("Current Location",G.location||"");
  add("Years of Experience",G.experience||"");
  add("Applying Position",posTitle);
  add("LinkedIn Profile",G.linkedInUrl||"Not provided");
  add("Portfolio Website",G.portfolioUrl||"Not provided");
  add("Cover Letter / Pitch",G.coverLetter||"No cover letter provided.");
  add("Resume File Name",H?H.name:"Not uploaded");
  add("Resume File Size",H?((H.size/1024/1024).toFixed(2)+" MB"):"0 MB");
  if(resumePublicUrl){
    add("Direct Resume Download Link",resumePublicUrl);
  }
  add("Recruitment Data Processing Consent","Agreed");
  add("Future Opportunities Consent",G.agreeToFutureRecruitment?"Agreed":"Not Granted");

  if(H&&window.DataTransfer){
    try{
      let fileInp=document.createElement("input");
      fileInp.type="file";
      fileInp.name="attachment";
      let dt=new DataTransfer();
      dt.items.add(H);
      fileInp.files=dt.files;
      form.appendChild(fileInp);
    }catch(_){}
  }

  document.body.appendChild(form);
  form.submit();
  setTimeout(()=>{try{form.remove();}catch(_){}},2500);
}catch(formErr){
  console.warn("Direct form delivery:",formErr);
}
'@

    $newLogicClean = $newLogic.Replace("`r`n", "").Replace("`n", "")
    $jd = $before + $newLogicClean + $after
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, $utf8NoBom)
    Write-Output "Successfully updated JobDetails with reply-to, resume upload & attachment, and clean formatting without BOM"
} else {
    Write-Error "Could not find start/end token in JobDetails"
}
