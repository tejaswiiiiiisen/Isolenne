$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
Write-Output ("Contact contains /ajax/: " + $ct.Contains('/ajax/'))
