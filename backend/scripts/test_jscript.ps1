$orig = [System.IO.File]::ReadAllText('d:\macenza\assets_backup\JobDetails-GYJXLp7H.js')
$curr = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

# Check if there is an unclosed template string or syntax error in $curr
# We can check by using PowerShell's own JScript engine or Windows Script Control
try {
    $sc = New-Object -ComObject ScriptControl
    $sc.Language = "JScript"
    # Wrap in function
    $testCode = "(function(){ " + $curr + " })"
    $sc.Eval($testCode)
    Write-Output "ScriptControl: SYNTAX VALID!"
} catch {
    Write-Output ("ScriptControl error: " + $_.Exception.Message)
}
