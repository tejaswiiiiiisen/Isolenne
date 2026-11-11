$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
$rIdx = $ct.IndexOf('Please verify')
if ($rIdx -ge 0) {
    Write-Output $ct.Substring([Math]::Max(0, $rIdx - 100), 200)
} else {
    Write-Output "Please verify not found"
}
