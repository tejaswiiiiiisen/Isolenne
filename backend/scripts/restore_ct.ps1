$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\Contact-c1-iI1nI.js')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Replace target email in Contact
$orig = $orig.Replace('info@agnix.com', 'tejaswisen27@gmail.com')

# Remove captcha check by making robot check always pass
$check = 'let t=a||(n.current?n.current.getResponse():``);if(!t)r.error(`Please verify that you are not a robot.`);else{'
if ($orig.Contains($check)) {
    $orig = $orig.Replace($check, 'let t="verified";if(t){')
    Write-Output "Bypassed captcha check in Contact"
}

# Remove captcha widget
$capWidget = '(0,g.jsx)(`div`,{className:`flex justify-center py-2`,children:(0,g.jsx)(i,{ref:n,sitekey:`d244a6b6-9a9e-4cee-a426-d8108b8eecb2`,onVerify:e=>S(e),onExpire:()=>S(``)})}),'
if ($orig.Contains($capWidget)) {
    $orig = $orig.Replace($capWidget, 'null,')
    Write-Output "Removed captcha widget in Contact"
}

[System.IO.File]::WriteAllText('d:\macenza\assets\Contact-c1-iI1nI.js', $orig, $utf8NoBom)
Write-Output "Saved clean Contact-c1-iI1nI.js"
