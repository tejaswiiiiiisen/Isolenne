$bytes = [System.IO.File]::ReadAllBytes('d:\macenza\assets\JobDetails-GYJXLp7H.js')
Write-Output "First 10 bytes (Hex):"
for ($i = 0; $i -lt 10; $i++) {
    Write-Output ("Byte $i: 0x{0:X2} ('{1}')" -f $bytes[$i], [char]$bytes[$i])
}
