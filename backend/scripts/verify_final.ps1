$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

Write-Output ("Contains teajswisen (typo): " + $jd.Contains('teajswisen'))
Write-Output ("Contains tejaswisen (correct): " + $jd.Contains('tejaswisen27@gmail.com'))
Write-Output ("Contains sitekey (captcha): " + $jd.Contains('sitekey'))
Write-Output ("Contains Application sended successfully: " + $jd.Contains('Application sended successfully!'))
