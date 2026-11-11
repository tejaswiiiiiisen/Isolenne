$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
Write-Output ("Contains 5174: " + $jd.Contains('5174'))
Write-Output ("Contains tejaswisen27: " + $jd.Contains('tejaswisen27@gmail.com'))
Write-Output ("Contains Application sended successfully: " + $jd.Contains('Application sended successfully!'))
