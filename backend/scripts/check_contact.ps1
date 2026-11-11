$text = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

$cidx = $text.IndexOf('sitekey')
if ($cidx -ge 0) {
    Write-Output "CONTACT CAPTCHA FOUND:"
    Write-Output $text.Substring([Math]::Max(0, $cidx - 150), 300)
} else {
    Write-Output "sitekey not found in Contact"
}

$eidx = $text.IndexOf('formsubmit')
if ($eidx -ge 0) {
    Write-Output "CONTACT FORMSUBMIT FOUND:"
    Write-Output $text.Substring([Math]::Max(0, $eidx - 150), 350)
} else {
    Write-Output "formsubmit not found in Contact"
}
