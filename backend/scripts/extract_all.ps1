$ErrorActionPreference = 'Stop'
$assetsDir = 'd:\macenza\assets'
if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Force -Path $assetsDir | Out-Null
}

function Extract-Payload([string]$srcPath, [string]$dstPath) {
    if (-not (Test-Path $srcPath)) {
        Write-Warning "Source not found: $srcPath"
        return
    }
    $raw = [System.IO.File]::ReadAllText($srcPath, [System.Text.Encoding]::UTF8)
    $marker = "---`r`n`r`n"
    $idx = $raw.IndexOf($marker)
    if ($idx -ge 0) {
        $content = $raw.Substring($idx + $marker.Length)
    } else {
        $markerLF = "---`n`n"
        $idxLF = $raw.IndexOf($markerLF)
        if ($idxLF -ge 0) {
            $content = $raw.Substring($idxLF + $markerLF.Length)
        } else {
            $content = $raw
        }
    }
    [System.IO.File]::WriteAllText($dstPath, $content, [System.Text.Encoding]::UTF8)
    Write-Output "Extracted $dstPath : $($content.Length) bytes"
}

$steps = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\8ae37eda-a450-4747-88f5-faeb83232736\.system_generated\steps'
Extract-Payload "$steps\114\content.md" 'd:\macenza\assets\ScrollJourney-BfoU4NIB.js'
Extract-Payload "$steps\175\content.md" 'd:\macenza\assets\About-Cknf45eQ.js'
Extract-Payload "$steps\177\content.md" 'd:\macenza\assets\Solutions-t1X74Uu6.js'
Extract-Payload "$steps\179\content.md" 'd:\macenza\assets\Technology-ZTDnumXL.js'
Extract-Payload "$steps\181\content.md" 'd:\macenza\assets\Careers-DWZwzI43.js'
Extract-Payload "$steps\183\content.md" 'd:\macenza\assets\Contact-c1-iI1nI.js'
Extract-Payload "$steps\185\content.md" 'd:\macenza\assets\fallbackJobs-CXZUWuQR.js'
Extract-Payload "$steps\187\content.md" 'd:\macenza\assets\supabaseClient-D-l7bFfY.js'
Extract-Payload "$steps\189\content.md" 'd:\macenza\assets\vendor-supabase-BKn5fTQy.js'
Extract-Payload "$steps\191\content.md" 'd:\macenza\assets\Policy-BKaaHHJ2.js'
Extract-Payload "$steps\193\content.md" 'd:\macenza\assets\Terms-DXnJrRtB.js'
Extract-Payload "$steps\195\content.md" 'd:\macenza\assets\CookiePolicy-fmDezeNh.js'
Extract-Payload "$steps\197\content.md" 'd:\macenza\assets\Blog-BdwIUN6g.js'
Extract-Payload "$steps\199\content.md" 'd:\macenza\assets\BlogPost-sP2EaVz1.js'
Extract-Payload "$steps\201\content.md" 'd:\macenza\assets\Partnership-CwtX-McC.js'
Extract-Payload "$steps\203\content.md" 'd:\macenza\assets\CertificateVerification-C6UvfXlH.js'
Extract-Payload "$steps\205\content.md" 'd:\macenza\assets\JobDetails-GYJXLp7H.js'
Extract-Payload "$steps\207\content.md" 'd:\macenza\assets\Admin-BPLJ7cRc.js'
