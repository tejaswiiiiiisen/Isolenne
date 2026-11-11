$log = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\.system_generated\logs\transcript_full.jsonl'
$line = Get-Content $log | Where-Object { $_ -match '"step_index":245\b' } | Select-Object -First 1
$obj = ConvertFrom-Json $line
$obj | Get-Member -MemberType NoteProperty | ForEach-Object {
    Write-Output "$($_.Name)"
}
if ($obj.media_paths) {
    Write-Output "media_paths: $($obj.media_paths -join ', ')"
}
if ($obj.images) {
    Write-Output "images: $($obj.images -join ', ')"
}
if ($obj.files) {
    Write-Output "files: $($obj.files -join ', ')"
}
