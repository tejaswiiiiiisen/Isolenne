# Save without BOM
$files = Get-ChildItem -Path 'd:\macenza\assets' -Filter '*.js'
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

foreach ($f in $files) {
    $bytes = [System.IO.File]::ReadAllBytes($f.FullName)
    if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
        Write-Output ("Removing BOM from: " + $f.Name)
        $text = [System.Text.Encoding]::UTF8.GetString($bytes, 3, $bytes.Length - 3)
        [System.IO.File]::WriteAllText($f.FullName, $text, $utf8NoBom)
    }
}

Write-Output "BOM check completed."
