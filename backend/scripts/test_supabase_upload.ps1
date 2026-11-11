$headers = @{
    'apikey' = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
    'Authorization' = 'Bearer sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
}
try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes("Test Resume Content")
    $fn = "test-resume-" + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds() + ".txt"
    $uploadUrl = "https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/resumes/$fn"
    
    $res = Invoke-RestMethod -Uri $uploadUrl -Method Post -Headers $headers -Body $bytes -ContentType "text/plain"
    Write-Output "UPLOAD SUCCESS: $fn"
    Write-Output ("Public URL: https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/object/public/resumes/$fn")
} catch {
    Write-Output "Upload failed: $_"
}
