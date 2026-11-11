$files = Get-ChildItem -Path 'd:\macenza\assets\*.js'
foreach ($f in $files) {
    $content = [System.IO.File]::ReadAllText($f.FullName)
    $idx = 0
    while (($idx = $content.IndexOf('import(', $idx)) -ge 0) {
        $snippet = $content.Substring($idx, [Math]::Min(50, $content.Length - $idx))
        if (-not $snippet.Contains('/* @vite-ignore */')) {
            Write-Output "$($f.Name) at $idx : $snippet"
        }
        $idx += 7
    }
}
