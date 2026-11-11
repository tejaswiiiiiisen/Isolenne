$imgFile = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\test_website_dev_1793104135782.jpg'
$html = @"
<!DOCTYPE html>
<html>
<body>
<img id="img" src="file:///$($imgFile.Replace('\', '/'))">
<div id="out"></div>
<script>
window.onload = () => {
    const img = document.getElementById('img');
    const c = document.createElement('canvas');
    c.width = img.naturalWidth;
    c.height = img.naturalHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = c.toDataURL('image/webp', 0.92);
    document.getElementById('out').innerText = data;
};
</script>
</body>
</html>
"@
[System.IO.File]::WriteAllText("d:\macenza\convert_test.html", $html)

$chrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
$psi = New-Object System.Diagnostics.ProcessStartInfo
$psi.FileName = $chrome
$psi.Arguments = "--headless --no-sandbox --disable-crash-reporter --disable-gpu --virtual-time-budget=2000 --dump-dom file:///d:/macenza/convert_test.html"
$psi.RedirectStandardOutput = $true
$psi.UseShellExecute = $false
$p = [System.Diagnostics.Process]::Start($psi)
$dom = $p.StandardOutput.ReadToEnd()
$p.WaitForExit()

if ($dom -match 'data:image/webp;base64,([a-zA-Z0-9+/=]+)') {
    $bytes = [System.Convert]::FromBase64String($matches[1])
    [System.IO.File]::WriteAllBytes("d:\macenza\portfolio\test_out.webp", $bytes)
    Write-Output "CONVERTED_SUCCESSFULLY: Size = $($bytes.Length) bytes"
} else {
    Write-Output "FAILED: DOM length = $($dom.Length)"
}
