$log = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\.system_generated\logs\transcript_full.jsonl'
$line = Get-Content $log | Where-Object { $_ -match '"step_index":245\b' } | Select-Object -First 1
# Search for .jpg, .png, .webp, or file paths
$regex = [regex]'[A-Za-z]:\\[^"''\s]+\.(jpg|png|webp|jpeg)'
$matches = $regex.Matches($line)
foreach ($m in $matches) {
    Write-Output "Image in step 245: $($m.Value)"
}
if ($matches.Count -eq 0) {
    Write-Output "No direct regex match, printing full line substring:"
    Write-Output $line.Substring(0, [Math]::Min(500, $line.Length))
}
