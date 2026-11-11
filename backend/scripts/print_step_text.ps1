$path = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\8ae37eda-a450-4747-88f5-faeb83232736\.system_generated\steps\216\content.md'
$text = [System.IO.File]::ReadAllText($path)
Write-Output $text.Substring(0, [Math]::Min(500, $text.Length))
