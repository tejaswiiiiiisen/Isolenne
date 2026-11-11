$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$target1 = 'if(G.honeypot){console.warn(`Spam submission blocked via honeypot.`),V(!0);return}'
if ($jd.Contains($target1)) {
    $jd = $jd.Replace($target1, '')
    Write-Output "Removed honeypot guard from JobDetails"
} else {
    Write-Warning "Target 1 not found in JobDetails"
}

$target2 = '(0,O.jsxs)(`div`,{className:`absolute opacity-0 -z-50 pointer-events-none h-0 w-0 overflow-hidden`,children:[null,(0,O.jsx)(`input`,{type:`text`,name:`honeypot`,value:G.honeypot,onChange:q,tabIndex:`-1`,autoComplete:`off`})]}),'
if ($jd.Contains($target2)) {
    $jd = $jd.Replace($target2, 'null,')
    Write-Output "Removed honeypot JSX input from JobDetails"
} else {
    Write-Warning "Target 2 not found in JobDetails"
}

[System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, $utf8NoBom)
Write-Output "Saved JobDetails without honeypot"
