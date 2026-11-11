$dirs = @('assets', 'Images', 'portfolio', 'review', 'Team', 'node_modules')
foreach ($d in $dirs) {
    if (Test-Path "D:\agnix\$d") {
        if (-not (Test-Path "D:\dashborad\$d")) {
            New-Item -ItemType Junction -Path "D:\dashborad\$d" -Target "D:\agnix\$d" -Force
        }
    }
}
Get-ChildItem -Path "D:\agnix" -File | ForEach-Object {
    Copy-Item $_.FullName "D:\dashborad\" -Force
}
Write-Output "Mirrored D:\agnix to D:\dashborad successfully"
