param(
    [int]$Port = 5173,
    [string]$Root = 'd:\macenza'
)

$endpoint = New-Object System.Net.IPEndPoint ([System.Net.IPAddress]::Loopback, $Port)
$listener = New-Object System.Net.Sockets.TcpListener $endpoint
$listener.Start()

Write-Host "TCP HTTP Server started on http://127.0.0.1:$Port/ (Root: $Root)"

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".mjs"  = "application/javascript; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".webp" = "image/webp"
    ".gif"  = "image/gif"
    ".ico"  = "image/x-icon"
}

try {
    while ($true) {
        $client = $listener.AcceptTcpClient()
        $stream = $client.GetStream()
        $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII)
        
        $requestLine = $reader.ReadLine()
        if ([string]::IsNullOrEmpty($requestLine)) {
            $client.Close()
            continue
        }

        # Read remainder of headers
        while (-not [string]::IsNullOrEmpty($reader.ReadLine())) {}

        $parts = $requestLine.Split(' ')
        $method = $parts[0]
        $url = if ($parts.Length -gt 1) { $parts[1] } else { "/" }
        
        $pathOnly = $url.Split('?')[0]
        $relPath = [System.Uri]::UnescapeDataString($pathOnly).TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($relPath)) {
            $relPath = "index.html"
        }

        $filePath = Join-Path $Root ($relPath -replace '/', '\')

        # SPA fallback
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $ext = [System.IO.Path]::GetExtension($filePath)
            if ([string]::IsNullOrEmpty($ext)) {
                $filePath = Join-Path $Root "index.html"
            }
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($filePath)

            $header = "HTTP/1.1 200 OK`r`n" +
                      "Content-Type: $mime`r`n" +
                      "Content-Length: $($bytes.Length)`r`n" +
                      "Connection: close`r`n" +
                      "Access-Control-Allow-Origin: *`r`n`r`n"
            $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)

            $stream.Write($headerBytes, 0, $headerBytes.Length)
            if ($method -ne "HEAD") {
                $stream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $notFound = "HTTP/1.1 404 Not Found`r`nContent-Length: 9`r`nConnection: close`r`n`r`nNot Found"
            $nfBytes = [System.Text.Encoding]::ASCII.GetBytes($notFound)
            $stream.Write($nfBytes, 0, $nfBytes.Length)
        }

        $stream.Flush()
        $client.Close()
    }
} finally {
    $listener.Stop()
    Write-Host "Server stopped."
}
