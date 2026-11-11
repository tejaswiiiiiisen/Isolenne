for ($i = 1; $i -le 9; $i++) {
    $dest = "d:\macenza\portfolio\$i.webp"
    & curl.exe -k -s -o $dest "https://www.macenza.com/portfolio/$i.webp"
    Copy-Item $dest "d:\macenza\portfolio\$i.jpg" -Force
}

# Deploy the generated ultra-modern HQ images for 1 and 2
Copy-Item "C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\workspace_collab_area_1793108593478.jpg" "d:\macenza\portfolio\1.webp" -Force
Copy-Item "C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\workspace_collab_area_1793108593478.jpg" "d:\macenza\portfolio\1.jpg" -Force

Copy-Item "C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\workspace_meeting_room_1793108618189.jpg" "d:\macenza\portfolio\2.webp" -Force
Copy-Item "C:\Users\ASUS\.gemini\antigravity-ide\brain\c27bee59-c727-4ff2-9d4d-3d2f3e75354e\workspace_meeting_room_1793108618189.jpg" "d:\macenza\portfolio\2.jpg" -Force

Get-ChildItem "d:\macenza\portfolio" | Where-Object { $_.Name -match '^[1-9]\.webp$' } | Select-Object Name, Length
