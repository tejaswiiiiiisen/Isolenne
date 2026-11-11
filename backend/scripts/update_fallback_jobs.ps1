$content = [System.IO.File]::ReadAllText("assets/fallbackJobs-CXZUWuQR.js", [System.Text.Encoding]::UTF8)
$updated = $content.Replace("location:`Remote`", "location:`Tamil Nadu`")
[System.IO.File]::WriteAllText("assets/fallbackJobs-CXZUWuQR.js", $updated, [System.Text.Encoding]::UTF8)
Write-Host "Updated fallbackJobs-CXZUWuQR.js successfully"
