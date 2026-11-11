$c = New-Object System.Net.Sockets.TcpClient
$c.Connect('127.0.0.1', 5173)
$s = $c.GetStream()
$req = [System.Text.Encoding]::ASCII.GetBytes("GET / HTTP/1.1`r`nHost: localhost`r`nConnection: close`r`n`r`n")
$s.Write($req, 0, $req.Length)
$reader = New-Object System.IO.StreamReader($s)
$resp = $reader.ReadToEnd()
Write-Output "--- RESPONSE START ---"
Write-Output $resp.Substring(0, [Math]::Min(500, $resp.Length))
$c.Close()
