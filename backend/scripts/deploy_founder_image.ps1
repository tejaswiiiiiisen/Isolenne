$srcImage = 'C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\.user_uploaded\media_1793104367381.jpg'

if (-not (Test-Path 'd:\macenza\Team')) {
    New-Item -ItemType Directory -Path 'd:\macenza\Team' -Force | Out-Null
}

# Backup existing founder.webp if not backed up
if (-not (Test-Path 'd:\macenza\review\founder_orig_backup.webp')) {
    Copy-Item 'd:\macenza\review\founder.webp' 'd:\macenza\review\founder_orig_backup.webp' -Force
}

# Copy to review/founder.webp and .jpg
Copy-Item $srcImage 'd:\macenza\review\founder.webp' -Force
Copy-Item $srcImage 'd:\macenza\review\founder.jpg' -Force

# Copy to Team/shashank_shubham.webp and .jpg
Copy-Item $srcImage 'd:\macenza\Team\shashank_shubham.webp' -Force
Copy-Item $srcImage 'd:\macenza\Team\shashank_shubham.jpg' -Force
Copy-Item $srcImage 'd:\macenza\Team\Shashank Shubham Founder & CEO.webp' -Force

Write-Output "Successfully deployed founder photo to review/founder.webp and Team directory!"
