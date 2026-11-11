$procs = Get-CimInstance Win32_Process -Filter "Name like '%node%'"
foreach ($p in $procs) {
    Write-Output "PID: $($p.ProcessId)"
    Write-Output "EXE: $($p.ExecutablePath)"
    Write-Output "CMD: $($p.CommandLine)"
}
