$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $jd.IndexOf('tejaswisen27@gmail.com')
if ($s -ge 0) {
    Write-Output $jd.Substring([Math]::Max(0, $s - 400), 1000)
} else {
    Write-Output "tejaswisen27 not found"
}
