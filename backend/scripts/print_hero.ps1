$js = [System.IO.File]::ReadAllText('d:\macenza\assets\index-CJjfnUDP.js', [System.Text.Encoding]::UTF8)

$start = 225000
$len = 3500
Write-Output $js.Substring($start, $len)
