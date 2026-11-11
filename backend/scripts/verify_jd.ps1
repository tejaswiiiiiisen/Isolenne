$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

# Check captcha chunk
$capTarget = '(0,O.jsx)(`div`,{className:`flex justify-center py-2`,children:(0,O.jsx)(s,{ref:r,sitekey:`d244a6b6-9a9e-4cee-a426-d8108b8eecb2`,onVerify:e=>j(e),onExpire:()=>j(``)})}),'
Write-Output ("Contains captcha chunk: " + $jd.Contains($capTarget))

# Check fetch chunk
$fetchStart = $jd.IndexOf('let fd=new FormData();')
$fetchEnd = $jd.IndexOf('V(!0),o.success("Application sended successfully!")')
Write-Output ("Fetch start: " + $fetchStart + ", Fetch end: " + $fetchEnd)
if ($fetchStart -ge 0 -and $fetchEnd -gt $fetchStart) {
    Write-Output "FOUND FETCH SLICE:"
    Write-Output $jd.Substring($fetchStart, [Math]::Min(800, $fetchEnd - $fetchStart + 100))
}
