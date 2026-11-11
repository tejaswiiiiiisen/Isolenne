$portfolioDir = "d:\macenza\portfolio"
$backupDir = "d:\macenza\portfolio_backup"

if (-not (Test-Path $backupDir)) {
    New-Item -ItemType Directory -Path $backupDir -Force | Out-Null
    Copy-Item "$portfolioDir\*.webp" $backupDir -Force
    Write-Output "Backed up original portfolio files to $backupDir"
}

$files = @{
    'website_development.webp'   = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\test_website_dev_1793104135782.jpg'
    'web_applications.webp'      = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\agnix_web_apps_1793104278085.jpg'
    'hrms_software.webp'         = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\agnix_hrms_soft_1793104376839.jpg'
    'ai_development.webp'        = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\agnix_ai_dev_1793104439407.jpg'
    'automation_solutions.webp'  = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\agnix_auto_sol_1793104505990.jpg'
    'hotel_management.webp'      = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\agnix_hotel_mgmt_1793104607607.jpg'
}

foreach ($target in $files.Keys) {
    $src = $files[$target]
    if (Test-Path $src) {
        Copy-Item $src "$portfolioDir\$target" -Force
        # Also save a .jpg copy for convenience
        $jpgName = $target.Replace('.webp', '.jpg')
        Copy-Item $src "$portfolioDir\$jpgName" -Force
        Write-Output "Copied $src -> $portfolioDir\$target and $jpgName"
    } else {
        Write-Error "Source file missing: $src"
    }
}
