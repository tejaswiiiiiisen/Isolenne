$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

# 1. Read JobDetails-GYJXLp7H.js
$jdPath = 'd:\macenza\assets\JobDetails-GYJXLp7H.js'
$jdText = [System.IO.File]::ReadAllText($jdPath, [System.Text.Encoding]::UTF8)

# Write to both old and new cache-busted filename
$newJdPath = 'd:\macenza\assets\JobDetails-C7v9Kp2L.js'
[System.IO.File]::WriteAllText($jdPath, $jdText, $utf8NoBom)
[System.IO.File]::WriteAllText($newJdPath, $jdText, $utf8NoBom)
Write-Output "Copied to JobDetails-C7v9Kp2L.js successfully."

# 2. Update index-CJjfnUDP.js to point to JobDetails-C7v9Kp2L.js
$indexPath = 'd:\macenza\assets\index-CJjfnUDP.js'
$indexText = [System.IO.File]::ReadAllText($indexPath, [System.Text.Encoding]::UTF8)
$indexText = $indexText.Replace('JobDetails-GYJXLp7H.js', 'JobDetails-C7v9Kp2L.js')
[System.IO.File]::WriteAllText($indexPath, $indexText, $utf8NoBom)
Write-Output "Updated index-CJjfnUDP.js to reference JobDetails-C7v9Kp2L.js."

# Check if index-CJjfnUDP.js contains JobDetails-C7v9Kp2L.js
$hasNew = $indexText.Contains('JobDetails-C7v9Kp2L.js')
Write-Output "index references new file: $hasNew"
