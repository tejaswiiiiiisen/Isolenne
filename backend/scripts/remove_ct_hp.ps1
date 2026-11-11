$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)

$s1 = 'if(j.honeypot){console.warn(`Spam contact submission blocked via honeypot.`),r.success(`Message sent successfully! We will contact you soon.`),M({name:``,email:``,phone:``,company:``,project_type:`AI Development`,budget:``,details:``,honeypot:``});return}'
if ($ct.Contains($s1)) {
    $ct = $ct.Replace($s1, '')
    Write-Output "Removed honeypot guard from Contact"
}

[System.IO.File]::WriteAllText('d:\macenza\assets\Contact-c1-iI1nI.js', $ct, $utf8NoBom)
Write-Output "Saved Contact"
