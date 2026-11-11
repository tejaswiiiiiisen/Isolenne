$bytes = [System.IO.File]::ReadAllBytes('d:\macenza\assets\Contact-c1-iI1nI.js')
Write-Output "First 10 bytes:"
for ($i = 0; $i -lt 10; $i++) {
    $b = $bytes[$i]
    $hex = $b.ToString("X2")
    Write-Output ("Byte " + $i + ": 0x" + $hex)
}
