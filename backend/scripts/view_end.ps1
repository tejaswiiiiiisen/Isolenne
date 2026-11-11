$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
Write-Output ("Length: " + $jd.Length)
Write-Output $jd.Substring($jd.Length - 300)
