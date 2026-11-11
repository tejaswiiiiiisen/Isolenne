Remove-Item env:https_proxy -ErrorAction SilentlyContinue
Remove-Item env:http_proxy -ErrorAction SilentlyContinue
Remove-Item env:all_proxy -ErrorAction SilentlyContinue
Remove-Item env:no_proxy -ErrorAction SilentlyContinue

$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $chrome
$psi.Arguments = "--headless --disable-gpu --dump-dom file:///d:/macenza/test_canvas_webp.html"
$psi.RedirectStandardOutput = $true
$psi.UseShellExecute = $false
$p = [System.Diagnostics.Process]::Start($psi)
$dom = $p.StandardOutput.ReadToEnd()
$p.WaitForExit()

if ($dom -match 'data:image/webp;base64,([a-zA-Z0-9+/=]+)') {
    Write-Output "WEBP_SUCCESS: $($matches[1].Substring(0, 40))"
} else {
    Write-Output "FAILED: $($dom.Substring(0, [Math]::Min(200, $dom.Length)))"
}
