$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$output = Start-Process -FilePath $chrome -ArgumentList "--headless --disable-gpu --dump-dom file:///d:/macenza/test_canvas_webp.html" -NoNewWindow -PassThru -RedirectStandardOutput "d:\macenza\dom.txt"
$output.WaitForExit()
$dom = [System.IO.File]::ReadAllText("d:\macenza\dom.txt")
if ($dom -match 'data:image/webp;base64,([a-zA-Z0-9+/=]+)') {
    Write-Output "WEBP_SUCCESS: $($matches[1].Substring(0, 40))"
} else {
    Write-Output "FAILED"
    Write-Output $dom
}
