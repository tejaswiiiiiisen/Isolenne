$ErrorActionPreference = 'Continue'

$dirs = @('d:\macenza\Images', 'd:\macenza\portfolio', 'd:\macenza\review')
foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Force -Path $d | Out-Null
    }
}

Write-Host "=== 1. Downloading Hero & Marketing Assets ==="
$staticAssets = @(
    @{ Url = 'https://www.macenza.com/hero-robot.webp'; Out = 'd:\macenza\hero-robot.webp' },
    @{ Url = 'https://www.macenza.com/macenza-ad.webp'; Out = 'd:\macenza\macenza-ad.webp' },
    @{ Url = 'https://www.macenza.com/review/founder.webp'; Out = 'd:\macenza\review\founder.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/website_development.webp'; Out = 'd:\macenza\portfolio\website_development.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/web_applications.webp'; Out = 'd:\macenza\portfolio\web_applications.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/hrms_software.webp'; Out = 'd:\macenza\portfolio\hrms_software.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/ai_development.webp'; Out = 'd:\macenza\portfolio\ai_development.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/automation_solutions.webp'; Out = 'd:\macenza\portfolio\automation_solutions.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/hotel_management.webp'; Out = 'd:\macenza\portfolio\hotel_management.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/diplim_fashion.webp'; Out = 'd:\macenza\portfolio\diplim_fashion.webp' },
    @{ Url = 'https://www.macenza.com/portfolio/hrms_saas.webp'; Out = 'd:\macenza\portfolio\hrms_saas.webp' }
)

for ($i = 1; $i -le 10; $i++) {
    $staticAssets += @{ Url = "https://www.macenza.com/review/client_$i.webp"; Out = "d:\macenza\review\client_$i.webp" }
}

foreach ($item in $staticAssets) {
    if (-not (Test-Path $item.Out) -or (Get-Item $item.Out).Length -eq 0) {
        & curl.exe -k -s -o $item.Out $item.Url
        Write-Host "Fetched $($item.Out)"
    }
}

Write-Host "=== 2. Downloading 240 Scroll Animation Frames ==="
# We can download in batches of 15 using parallel Start-Process curl.exe
$batchSize = 15
for ($i = 1; $i -le 240; $i += $batchSize) {
    $end = [Math]::Min($i + $batchSize - 1, 240)
    $procs = @()
    for ($j = $i; $j -le $end; $j++) {
        $num = $j.ToString("000")
        $file = "d:\macenza\Images\ezgif-frame-$num.jpg"
        if (-not (Test-Path $file) -or (Get-Item $file).Length -eq 0) {
            $url = "https://www.macenza.com/Images/ezgif-frame-$num.jpg"
            $p = Start-Process -FilePath "curl.exe" -ArgumentList "-k -s -o `"$file`" `"$url`"" -PassThru -NoNewWindow
            $procs += $p
        }
    }
    if ($procs.Count -gt 0) {
        $procs | ForEach-Object { $_.WaitForExit() }
        Write-Host "Batch $i - $end downloaded."
    }
}

$count = (Get-ChildItem d:\macenza\Images\*.jpg).Count
Write-Host "Total frames verified: $count / 240"
