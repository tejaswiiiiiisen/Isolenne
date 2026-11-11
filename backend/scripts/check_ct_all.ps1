$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\Contact-c1-iI1nI.js')
$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

Write-Output "Checking captcha bypass:"
Write-Output ("Contains verified: " + $curr.Contains('let t="verified";if(t){'))
Write-Output ("Contains capWidget: " + $curr.Contains('d244a6b6-9a9e-4cee-a426-d8108b8eecb2'))
