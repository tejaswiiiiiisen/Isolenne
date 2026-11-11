$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\Contact-c1-iI1nI.js')
$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

Write-Output ("Orig length: " + $orig.Length + ", Curr length: " + $curr.Length)

# Find first difference
$minLen = [Math]::Min($orig.Length, $curr.Length)
for ($i = 0; $i -lt $minLen; $i++) {
    if ($orig[$i] -ne $curr[$i]) {
        Write-Output ("First difference at index: $i")
        Write-Output ("Orig: " + $orig.Substring([Math]::Max(0, $i - 30), [Math]::Min(100, $orig.Length - $i + 30)))
        Write-Output ("Curr: " + $curr.Substring([Math]::Max(0, $i - 30), [Math]::Min(100, $curr.Length - $i + 30)))
        break
    }
}
