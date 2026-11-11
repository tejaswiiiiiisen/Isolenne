$js = [System.IO.File]::ReadAllText('d:\macenza\assets\index-CJjfnUDP.js', [System.Text.Encoding]::UTF8)

# Find strings in quotes or backticks
$regex = [regex]'[`"''"]([^`"''\r\n]{2,150}\.(png|jpg|jpeg|svg|webp|mp4|json|webm|glb|gltf|hdr))[`"''"]'
$matches = $regex.Matches($js)
Write-Output "--- IMAGE / MEDIA ASSETS FOUND ---"
$assetSet = [System.Collections.Generic.HashSet[string]]::new()
foreach ($m in $matches) {
    $val = $m.Groups[1].Value
    if ($assetSet.Add($val)) {
        Write-Output $val
    }
}

Write-Output "`n--- URLS / PATHS FOUND ---"
$urlRegex = [regex]'[`"''"](https?://[^`"''\r\n]{3,150}|/[a-zA-Z0-9_\-\./]{3,150})[`"''"]'
$urlMatches = $urlRegex.Matches($js)
$urlSet = [System.Collections.Generic.HashSet[string]]::new()
foreach ($m in $urlMatches) {
    $val = $m.Groups[1].Value
    if ($urlSet.Add($val)) {
        Write-Output $val
    }
}
