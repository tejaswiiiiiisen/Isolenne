$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $chrome
$psi.Arguments = "--headless --no-sandbox --disable-crash-reporter --disable-gpu --dump-dom file:///d:/macenza/test_canvas_webp.html"
$psi.RedirectStandardOutput = $true
$psi.UseShellExecute = $false
$p = [System.Diagnostics.Process]::Start($psi)
$dom = $p.StandardOutput.ReadToEnd()
$p.WaitForExit()

if ($dom -match 'data:image/webp;base64,([a-zA-Z0-9+/=]+)') {
    Write-Output "CHROME_WEBP_SUCCESS: $($matches[1].Substring(0, 40))"
} else {
    Write-Output "CHROME_FAILED: $($dom.Substring(0, [Math]::Min(200, $dom.Length)))"
}
