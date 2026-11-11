$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$backticks = ($jd.ToCharArray() | Where-Object { $_ -eq '`' }).Count
$dquotes = ($jd.ToCharArray() | Where-Object { $_ -eq '"' }).Count

Write-Output ("Backticks: $backticks (Odd? $($backticks % 2 -ne 0))")
Write-Output ("Double quotes: $dquotes (Odd? $($dquotes % 2 -ne 0))")
