$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# Clean JobDetails-GYJXLp7H.js
$jdPath = 'd:\macenza\assets\JobDetails-GYJXLp7H.js'
$jdText = [System.IO.File]::ReadAllText($jdPath, [System.Text.Encoding]::UTF8)
$jdText = $jdText.Replace(',honeypot:``', '')
$jdText = $jdText.Replace(',honeypot:""', '')
[System.IO.File]::WriteAllText($jdPath, $jdText, $utf8NoBom)
Write-Output "JobDetails cleaned. Any honeypot left: $([regex]::IsMatch($jdText, 'honeypot'))"

# Clean Contact-c1-iI1nI.js
$ctPath = 'd:\macenza\assets\Contact-c1-iI1nI.js'
$ctText = [System.IO.File]::ReadAllText($ctPath, [System.Text.Encoding]::UTF8)
$ctText = $ctText.Replace(',honeypot:``', '')
$ctText = $ctText.Replace(',honeypot:""', '')

# Remove if(j.honeypot){...}
$ctPattern = 'if\(j\.honeypot\)\{[^\}]+\}'
$ctText = [regex]::Replace($ctText, $ctPattern, '')

# Remove honeypot input from JSX if any
$ctPattern2 = '\(0,g\.jsxs\)\(`div`,[^\}]*Do not fill this field if you are a human[^\)]+\)\),?'
$ctText = [regex]::Replace($ctText, $ctPattern2, 'null,')
[System.IO.File]::WriteAllText($ctPath, $ctText, $utf8NoBom)
Write-Output "Contact cleaned. Any honeypot left: $([regex]::IsMatch($ctText, 'honeypot'))"

# Validate Syntax of both
node -e "new Function(require('fs').readFileSync('d:/macenza/assets/JobDetails-GYJXLp7H.js', 'utf8')); console.log('JobDetails syntax: OK');"
node -e "new Function(require('fs').readFileSync('d:/macenza/assets/Contact-c1-iI1nI.js', 'utf8')); console.log('Contact syntax: OK');"
