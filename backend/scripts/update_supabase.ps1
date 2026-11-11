$headers = @{
    'apikey' = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
    'Authorization' = 'Bearer sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
    'Content-Type' = 'application/json'
    'Prefer' = 'return=representation'
}
$body = @{ location = 'Remote' } | ConvertTo-Json
try {
    $res = Invoke-RestMethod -Method Patch -Uri 'https://cmpghiavghpdwtyuiuqm.supabase.co/rest/v1/jobs?location=eq.Ajmer' -Headers $headers -Body $body
    Write-Output "Updated successfully! Count: $($res.Count)"
} catch {
    Write-Output "Error: $_"
}
