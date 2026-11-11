$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$stack = New-Object System.Collections.Generic.Stack[string]
$inTemplate = $false
$inSingle = $false
$inDouble = $false

for ($i = 0; $i -lt $jd.Length; $i++) {
    $c = $jd[$i]
    $prev = if ($i -gt 0) { $jd[$i - 1] } else { '' }

    if ($c -eq '`' -and $prev -ne '\' -and -not $inSingle -and -not $inDouble) {
        $inTemplate = -not $inTemplate
        continue
    }
    if ($inTemplate) { continue }

    if ($c -eq '"' -and $prev -ne '\' -and -not $inSingle) {
        $inDouble = -not $inDouble
        continue
    }
    if ($inDouble) { continue }

    if ($c -eq "'" -and $prev -ne '\') {
        $inSingle = -not $inSingle
        continue
    }
    if ($inSingle) { continue }

    if ($c -eq '(' -or $c -eq '[' -or $c -eq '{') {
        $stack.Push("$c at index $i")
    } elseif ($c -eq ')' -or $c -eq ']' -or $c -eq '}') {
        if ($stack.Count -eq 0) {
            Write-Output "ERROR: Extra closing $c at index $i"
        } else {
            $top = $stack.Pop()
            $match = switch ($c) {
                ')' { '(' }
                ']' { '[' }
                '}' { '{' }
            }
            if (-not $top.StartsWith($match)) {
                Write-Output "MISMATCH: Found $c at index $i, but top was $top"
                $sub = $jd.Substring([Math]::Max(0, $i - 50), 100)
                Write-Output "Snippet: $sub"
            }
        }
    }
}

Write-Output ("Remaining on stack at end of input: " + $stack.Count)
while ($stack.Count -gt 0) {
    $unclosed = $stack.Pop()
    Write-Output ("Unclosed: " + $unclosed)
    $idx = [int]($unclosed -split " ")[-1]
    Write-Output ("Around unclosed: " + $jd.Substring([Math]::Max(0, $idx - 30), 120))
}
