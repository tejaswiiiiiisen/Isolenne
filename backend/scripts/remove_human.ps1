$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$target = '(0,O.jsx)(`label`,{children:`Do not fill this field if you are a human`}),'
if ($jd.Contains($target)) {
    $jd = $jd.Replace($target, 'null,')
    [System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
    Write-Output "Removed honeypot human label from JobDetails"
} else {
    Write-Output "Target honeypot label not found in JobDetails"
}
