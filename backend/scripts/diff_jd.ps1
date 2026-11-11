$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\JobDetails-GYJXLp7H.js')
$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

Write-Output ("Orig length: " + $orig.Length + ", Curr length: " + $curr.Length)

# Find first difference
$minLen = [Math]::Min($orig.Length, $curr.Length)
for ($i = 0; $i -lt $minLen; $i++) {
    if ($orig[$i] -ne $curr[$i]) {
        Write-Output ("First difference at index: $i")
        Write-Output ("Orig: " + $orig.Substring([Math]::Max(0, $i - 30), 80))
        Write-Output ("Curr: " + $curr.Substring([Math]::Max(0, $i - 30), 80))
        break
    }
}
