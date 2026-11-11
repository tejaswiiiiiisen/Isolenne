$c = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
$s = $c.IndexOf('let e=await fetch(')
$e = $c.IndexOf('r.success(', $s)

$before = $c.Substring(0, $s)
$after = $c.Substring($e)
$replace = 'let e=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"New Project Inquiry: "+j.name.trim(),_template:"table",_captcha:"false","Full Name":j.name.trim(),"Email Address":j.email.trim(),"Phone Number":j.phone.trim()||"Not provided","Company Name":j.company.trim()||"Not provided","Project Type":j.project_type,"Budget Range":j.budget||"Not provided","Project Details":j.details.trim()})});'

$c = $before + $replace + $after
[System.IO.File]::WriteAllText('d:\macenza\assets\Contact-c1-iI1nI.js', $c, [System.Text.Encoding]::UTF8)
Write-Output "Successfully updated Contact fetch block"
