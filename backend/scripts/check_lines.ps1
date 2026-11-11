$bytes = [System.IO.File]::ReadAllBytes('d:\macenza\assets\JobDetails-GYJXLp7H.js')
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$lines = $text.Split("`n")

Write-Output ("Total lines: " + $lines.Length)
for ($l = 0; $l -lt $lines.Length; $l++) {
    Write-Output ("Line $l (length $($lines[$l].Length)): " + $lines[$l].Substring(0, [Math]::Min(80, $lines[$l].Length)))
}
