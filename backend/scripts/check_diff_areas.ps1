$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\JobDetails-GYJXLp7H.js')
$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

# Print size and find chunks
Write-Output "Differences:"
$i = 0
$diffCount = 0
while ($i -lt $curr.Length -and $diffCount -lt 10) {
    # find next mismatch with orig
    # let's just inspect where we made changes
    $diffCount++
    break
}

# Where is the captcha removed in curr?
$cap = $curr.IndexOf('sitekey')
Write-Output ("Sitekey in curr: " + $cap)

# Where is honeypot label in curr?
$hp = $curr.IndexOf('honeypot')
if ($hp -ge 0) {
    Write-Output ("Honeypot in curr: " + $curr.Substring([Math]::Max(0, $hp - 50), 150))
}

# Where is captcha div in curr?
$btn = $curr.IndexOf('type:`submit`')
if ($btn -ge 0) {
    Write-Output ("Before submit button in curr: " + $curr.Substring([Math]::Max(0, $btn - 100), 120))
}
