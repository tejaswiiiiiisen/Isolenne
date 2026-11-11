$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $jd.IndexOf('Application sended successfully!')
if ($s -ge 0) {
    Write-Output $jd.Substring($s, 600)
}
