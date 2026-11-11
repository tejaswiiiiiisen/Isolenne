$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$s = $curr.IndexOf('Y=async')
$e = $curr.IndexOf(',X=()=>', $s)
Write-Output $curr.Substring($s, $e - $s)
