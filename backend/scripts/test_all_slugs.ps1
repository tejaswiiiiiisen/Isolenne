$jobs = @(
    @{ id = 'mern-stack-developer-intern'; title = 'MERN Stack Developer Intern' },
    @{ id = 'frontend-developer-intern'; title = 'Frontend Developer Intern' }
)

$k = { param($s) if (!$s) { return "" }; return [System.Text.RegularExpressions.Regex]::Replace([System.Text.RegularExpressions.Regex]::Replace($s.ToLower().Trim(), '[^\w\s-]', ''), '[\s_-]+', '-').Trim('-') }

$testUrls = @(
    'frontend developer intern',
    'mern stack developer intern',
    'mern-stack-developer-intern',
    'frontend-developer-intern',
    'frontend%20developer%20intern'
)

foreach ($u in $testUrls) {
    $rawE = [System.Uri]::UnescapeDataString($u).Trim()
    $normE = &$k $rawE
    
    $found = $null
    foreach ($j in $jobs) {
        $titleNorm = &$k $j.title
        $idNorm = &$k $j.id
        if ($titleNorm -eq $normE -or $j.id -eq $normE -or $idNorm -eq $normE -or $j.title.ToLower() -eq $rawE.ToLower() -or $j.id -eq $u) {
            $found = $j
            break
        }
    }
    
    if ($found) {
        Write-Output "URL: '$u' -> MATCHED: $($found.title) (id: $($found.id))"
    } else {
        Write-Error "URL: '$u' -> NOT MATCHED"
    }
}
