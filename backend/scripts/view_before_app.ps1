$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$idx = $curr.IndexOf('let appId="AGX-"')
if ($idx -ge 0) {
    Write-Output "BEFORE APPID:"
    Write-Output $curr.Substring([Math]::Max(0, $idx - 150), 160)
}
