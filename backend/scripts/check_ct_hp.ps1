$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
$idx = $ct.IndexOf('honeypot')
if ($idx -ge 0) {
    Write-Output "CONTACT HONEYPOT FOUND:"
    Write-Output $ct.Substring([Math]::Max(0, $idx - 50), 150)
} else {
    Write-Output "Honeypot not in Contact"
}
