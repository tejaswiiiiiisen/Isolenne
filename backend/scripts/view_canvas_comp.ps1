$js = [System.IO.File]::ReadAllText('d:\macenza\assets\index-CJjfnUDP.js', [System.Text.Encoding]::UTF8)

$start = 24000
$len = 4000
Write-Output $js.Substring($start, $len)
