param([int]$Port = 5173)

$code = [System.IO.File]::ReadAllText('d:\macenza\web_server.cs')
Add-Type -TypeDefinition $code -Language CSharp

$server = New-Object TinyServer ('d:\macenza', $Port)
$server.Start()

# Keep script running
while ($true) {
    Start-Sleep -Seconds 10
}
