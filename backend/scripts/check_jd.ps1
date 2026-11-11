$text = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$idx = $text.IndexOf('tejaswisen')
if ($idx -ge 0) {
    Write-Output $text.Substring([Math]::Max(0, $idx - 300), 700)
} else {
    Write-Output "tejaswisen not found in JobDetails"
}

$cidx = $text.IndexOf('sitekey')
if ($cidx -ge 0) {
    Write-Output "CAPTCHA FOUND:"
    Write-Output $text.Substring([Math]::Max(0, $cidx - 150), 300)
} else {
    Write-Output "sitekey not found"
}
