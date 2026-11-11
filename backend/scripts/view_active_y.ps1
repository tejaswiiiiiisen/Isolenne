$active = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $active.IndexOf('Y=async')
$e = $active.IndexOf(',X=()=>', $s)
if ($s -ge 0 -and $e -gt $s) {
    Write-Output "ACTIVE HANDLER Y:"
    Write-Output $active.Substring($s, $e - $s + 7)
}
