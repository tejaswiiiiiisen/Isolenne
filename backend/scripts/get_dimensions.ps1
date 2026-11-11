Add-Type -AssemblyName System.Drawing

Get-ChildItem "d:\macenza\portfolio\*.webp" | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    Write-Output "$($_.Name): $($img.Width)x$($img.Height)"
    $img.Dispose()
}
