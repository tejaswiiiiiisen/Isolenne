$jd = [System.IO.File]::ReadAllText('d:\macenza\assets\JobDetails-GYJXLp7H.js')

$openBrace = ($jd.ToCharArray() | Where-Object { $_ -eq '{' }).Count
$closeBrace = ($jd.ToCharArray() | Where-Object { $_ -eq '}' }).Count

$openParen = ($jd.ToCharArray() | Where-Object { $_ -eq '(' }).Count
$closeParen = ($jd.ToCharArray() | Where-Object { $_ -eq ')' }).Count

$openBracket = ($jd.ToCharArray() | Where-Object { $_ -eq '[' }).Count
$closeBracket = ($jd.ToCharArray() | Where-Object { $_ -eq ']' }).Count

Write-Output ("Open { : $openBrace, Close } : $closeBrace (Diff: $($openBrace - $closeBrace))")
Write-Output ("Open ( : $openParen, Close ) : $closeParen (Diff: $($openParen - $closeParen))")
Write-Output ("Open [ : $openBracket, Close ] : $closeBracket (Diff: $($openBracket - $closeBracket))")
