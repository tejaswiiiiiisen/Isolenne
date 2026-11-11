$js = [System.IO.File]::ReadAllText('d:\macenza\assets\index-CJjfnUDP.js', [System.Text.Encoding]::UTF8)

# Find all occurrences of scroll, wheel, touch, observer
$keywords = @('scroll', 'wheel', 'IntersectionObserver', 'scrollY', 'scrollTop', 'canvas', 'hero-robot', 'Globe', 'cobe')
foreach ($kw in $keywords) {
    $idx = 0
    $count = 0
    Write-Output "=== KEYWORD: $kw ==="
    while (($idx = $js.IndexOf($kw, $idx, [System.StringComparison]::OrdinalIgnoreCase)) -ge 0) {
        $count++
        $start = [Math]::Max(0, $idx - 60)
        $len = [Math]::Min(140, $js.Length - $start)
        $snippet = $js.Substring($start, $len).Replace("`r", "").Replace("`n", " ")
        Write-Output "[$idx]: ... $snippet ..."
        $idx += $kw.Length
        if ($count -ge 10) {
            Write-Output "(more than 10 matches, truncating...)"
            break
        }
    }
}
