$scratchFiles = Get-ChildItem -Path 'd:\macenza' -Filter '*.ps1' | Where-Object { $_.Name -ne 'run_server.ps1' }
foreach ($file in $scratchFiles) {
    Remove-Item -Force $file.FullName
}
Write-Output "Cleaned up $($scratchFiles.Count) temporary scripts."
