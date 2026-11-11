$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$jd = $jd.Replace('}catch(e){console.error(e);V(!0),o.success(`Application submitted successfully!`)', '}catch(e){console.error(e);V(!0),o.success("Application sended successfully!")')
[System.IO.File]::WriteAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js', $jd, [System.Text.Encoding]::UTF8)
Write-Output "Updated catch notification"
