$ErrorActionPreference = 'Stop'
try {
    $resp = Invoke-WebRequest -Uri 'https://www.macenza.com/Images/ezgif-frame-001.jpg' -Method Head
    Write-Output "Status: $($resp.StatusCode)"
    Write-Output "Content-Length: $($resp.Headers['Content-Length'])"
    Write-Output "Content-Type: $($resp.Headers['Content-Type'])"
} catch {
    Write-Output "Error: $_"
}
