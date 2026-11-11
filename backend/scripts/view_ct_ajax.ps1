$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
$s = $ct.IndexOf('https://formsubmit.co/ajax/')
if ($s -ge 0) {
    Write-Output $ct.Substring([Math]::Max(0, $s - 100), 400)
}
