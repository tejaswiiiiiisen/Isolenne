$backup = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\JobDetails-GYJXLp7H.js')
$s = $backup.IndexOf('Y=async')
$e = $backup.IndexOf(',X=()=>', $s)
if ($s -ge 0 -and $e -gt $s) {
    Write-Output "ORIGINAL HANDLER Y:"
    Write-Output $backup.Substring($s, $e - $s + 7)
}
