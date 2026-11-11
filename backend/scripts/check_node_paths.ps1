$paths = @(
    "C:\Program Files\nodejs\node.exe",
    "$env:ProgramFiles\nodejs\node.exe",
    "$env:LOCALAPPDATA\Programs\node\node.exe",
    "$env:APPDATA\npm\node.exe",
    "$env:USERPROFILE\AppData\Local\Programs\node\node.exe",
    "$env:USERPROFILE\AppData\Roaming\nvm\v*\node.exe",
    "C:\nvm\*\node.exe",
    "C:\ProgramData\nvm\*\node.exe"
)

foreach ($p in $paths) {
    $found = Resolve-Path $p -ErrorAction SilentlyContinue
    if ($found) {
        Write-Output "FOUND: $found"
    }
}

Write-Output ("PATH env: " + $env:PATH)
