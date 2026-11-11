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
Extract-Payload "$steps\9\content.md" 'd:\macenza\index.html'
Extract-Payload "$steps\21\content.md" 'd:\macenza\assets\index-BcsQlxXo.css'
Extract-Payload "$steps\25\content.md" 'd:\macenza\assets\vendor-react-qcT314-W.css'
Extract-Payload "$steps\27\content.md" 'd:\macenza\assets\index-CJjfnUDP.js'
Extract-Payload "$steps\29\content.md" 'd:\macenza\logo.svg'
Extract-Payload "$steps\33\content.md" 'd:\macenza\assets\vendor-globe-CHqBwe8E.js'
Extract-Payload "$steps\37\content.md" 'd:\macenza\assets\rolldown-runtime-BCiCTKAo.js'
Extract-Payload "$steps\39\content.md" 'd:\macenza\assets\vendor-gsap-CoLNslfx.js'
Extract-Payload "$steps\41\content.md" 'd:\macenza\assets\vendor-icons-B5oGAX5M.js'
Extract-Payload "$steps\43\content.md" 'd:\macenza\assets\vendor-react-CLSjwvyW.js'
