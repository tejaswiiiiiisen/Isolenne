$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$stack = New-Object System.Collections.Generic.Stack[string]
$templateBraceStack = New-Object System.Collections.Generic.Stack[int]

$inSingle = $false
$inDouble = $false
$inTemplate = $false

for ($i = 0; $i -lt $jd.Length; $i++) {
    $c = $jd[$i]
    $prev = if ($i -gt 0) { $jd[$i - 1] } else { '' }
    $next = if ($i -lt $jd.Length - 1) { $jd[$i + 1] } else { '' }

    if (-not $inTemplate -and -not $inSingle -and -not $inDouble) {
        if ($c -eq "'") { $inSingle = $true; continue }
        if ($c -eq '"') { $inDouble = $true; continue }
        if ($c -eq '`') { $inTemplate = $true; continue }
    } elseif ($inSingle) {
        if ($c -eq "'" -and $prev -ne '\') { $inSingle = $false }
        continue
    } elseif ($inDouble) {
        if ($c -eq '"' -and $prev -ne '\') { $inDouble = $false }
        continue
    } elseif ($inTemplate) {
        if ($c -eq '$' -and $next -eq '{') {
            $templateBraceStack.Push(1)
            $inTemplate = $false
            $i++ # skip {
            $stack.Push("{ (template expr) at $i")
            continue
        }
        if ($c -eq '`' -and $prev -ne '\') {
            $inTemplate = $false
            continue
        }
        continue
    }

    # Code mode
    if ($c -eq '(' -or $c -eq '[' -or $c -eq '{') {
        $stack.Push("$c at index $i")
    } elseif ($c -eq ')' -or $c -eq ']' -or $c -eq '}') {
        if ($stack.Count -eq 0) {
            Write-Output "ERROR: Extra closing $c at index $i"
        } else {
            $top = $stack.Pop()
            if ($top.StartsWith("{ (template expr)")) {
                $inTemplate = $true
            }
        }
    }
}

Write-Output ("In Single: $inSingle, In Double: $inDouble, In Template: $inTemplate")
Write-Output ("Remaining on stack at end of input: " + $stack.Count)
while ($stack.Count -gt 0) {
    $unclosed = $stack.Pop()
    Write-Output ("Unclosed: " + $unclosed)
    $idx = [int]($unclosed -split " ")[-1]
    Write-Output ("Around unclosed: " + $jd.Substring([Math]::Max(0, $idx - 30), [Math]::Min(150, $jd.Length - $idx + 30)))
}
