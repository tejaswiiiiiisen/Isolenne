$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$hp = $curr.IndexOf('name:`honeypot`')
if ($hp -ge 0) {
    Write-Output "FORM HONEYPOT:"
    Write-Output $curr.Substring([Math]::Max(0, $hp - 100), 200)
}
