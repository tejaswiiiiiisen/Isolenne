$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $jd.IndexOf('fs_target_ifr')
if ($s -ge 0) {
    Write-Output "BEFORE:"
    Write-Output $jd.Substring([Math]::Max(0, $s - 300), 300)
    Write-Output "AFTER:"
    Write-Output $jd.Substring($s, 800)
}
