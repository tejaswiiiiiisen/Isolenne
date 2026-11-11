$filePath = "d:\macenza\assets\About-Cknf45eQ.js"
$backupPath = "d:\macenza\assets\About-Cknf45eQ.js.bak"
Copy-Item $filePath $backupPath -Force

$content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)

# Find the start of m=[ and end of Deepak Gupta entry
$startIdx = $content.IndexOf("m=[{name:`Shashank Shubham`")
if ($startIdx -lt 0) {
    throw "Could not find start of team array"
}

$endTag = "Secutry Tester.webp`}]"
$endIdx = $content.IndexOf($endTag, $startIdx)
if ($endIdx -lt 0) {
    throw "Could not find end of team array"
}

$fullEndIdx = $endIdx + $endTag.Length

$partBefore = $content.Substring(0, $startIdx)
$partAfter = $content.Substring($fullEndIdx)

$newArray = "m=[{name:`Shashank Shubham`,role:`Founder & CEO`,image:`/Team/shashank_shubham.webp`}]"

$newContent = $partBefore + $newArray + $partAfter

# Update layout classes so the single card is centered and looks great
$newContent = $newContent.Replace("grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 team-grid", "flex justify-center team-grid")
$newContent = $newContent.Replace("team-card group", "team-card group max-w-sm w-full text-center")

[System.IO.File]::WriteAllText($filePath, $newContent, [System.Text.Encoding]::UTF8)
Write-Host "SUCCESS: Updated About-Cknf45eQ.js with single Founder card!"
