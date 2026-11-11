$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $jd.IndexOf('let Y=async e=>{')
if ($s -ge 0) {
    Write-Output $jd.Substring($s, 800)
} else {
    Write-Output "Y handler not found"
}
