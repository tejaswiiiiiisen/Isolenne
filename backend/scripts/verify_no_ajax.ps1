$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
Write-Output ("Contains /ajax/: " + $jd.Contains('/ajax/'))
Write-Output ("Contains formsubmit.co: " + $jd.Contains('formsubmit.co/tejaswisen27@gmail.com'))
Write-Output ("Contains fs_target_ifr: " + $jd.Contains('fs_target_ifr'))
