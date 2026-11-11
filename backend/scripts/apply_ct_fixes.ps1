$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

# 1. Remove captcha widget in Contact
$ctCap = '(0,g.jsx)(`div`,{className:`flex justify-center py-2`,children:(0,g.jsx)(i,{ref:n,sitekey:`d244a6b6-9a9e-4cee-a426-d8108b8eecb2`,onVerify:e=>S(e),onExpire:()=>S(``)})}),'
if ($ct.Contains($ctCap)) {
    $ct = $ct.Replace($ctCap, 'null,')
    Write-Output "Removed hCaptcha widget from Contact"
} else {
    Write-Warning "Could not find hCaptcha widget in Contact"
}

# 2. Remove robot check
$targetRob = 'let t=a||(n.current?n.current.getResponse():``);if(!t)r.error(`Please verify that you are not a robot.`);else{P(!0);'
if ($ct.Contains($targetRob)) {
    $ct = $ct.Replace($targetRob, 'P(!0);')
    Write-Output "Removed robot check from Contact"
} else {
    Write-Warning "Target robot check string not found"
}

[System.IO.File]::WriteAllText('d:\macenza\assets\Contact-c1-iI1nI.js', $ct, [System.Text.Encoding]::UTF8)
Write-Output "Saved updated Contact-c1-iI1nI.js"
