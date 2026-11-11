$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$idx = $jd.IndexOf('Spam submission blocked via honeypot')
if ($idx -ge 0) {
    Write-Output "FOUND BLOCK CHECK:"
    Write-Output $jd.Substring([Math]::Max(0, $idx - 60), 130)
} else {
    Write-Output "Honeypot block check not found"
}
