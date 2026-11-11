$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

$oldFetch = 'let e=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"New Project Inquiry: "+j.name.trim(),_template:"table",_captcha:"false","Full Name":j.name.trim(),"Email Address":j.email.trim(),"Phone Number":j.phone.trim()||"Not provided","Company Name":j.company.trim()||"Not provided","Project Type":j.project_type,"Budget Range":j.budget||"Not provided","Project Details":j.details.trim()})});'

$newSubmit = @'
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
  add("_subject","New Project Inquiry: "+j.name.trim());
  add("_template","table");
  add("_captcha","false");
  add("Full Name",j.name.trim());
  add("Email Address",j.email.trim());
  add("Phone Number",j.phone.trim()||"Not provided");
  add("Company Name",j.company.trim()||"Not provided");
  add("Project Type",j.project_type);
  add("Budget Range",j.budget||"Not provided");
  add("Project Details",j.details.trim());
  document.body.appendChild(form);
  form.submit();
  setTimeout(()=>{try{form.remove();}catch(_){}},2000);
}catch(_){}
'@

$newSubmitClean = $newSubmit.Replace("`r`n", "").Replace("`n", "")
if ($ct.Contains($oldFetch)) {
    $ct = $ct.Replace($oldFetch, $newSubmitClean)
    [System.IO.File]::WriteAllText('d:\macenza\assets\Contact-c1-iI1nI.js', $ct, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated Contact to standard form submission"
} else {
    Write-Warning "Old fetch string not found in Contact"
}
