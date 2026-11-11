$files = Get-ChildItem -Path 'd:\macenza\assets' -Filter '*.js'
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    if ($content.Contains('d244a6b6-9a9e-4cee-a426-d8108b8eecb2')) {
        Write-Output ("Sitekey found in: " + $f.Name)
    }
    if ($content.Contains('hcaptcha') -or $content.Contains('hCaptcha')) {
        Write-Output ("hCaptcha string found in: " + $f.Name)
    }
}
