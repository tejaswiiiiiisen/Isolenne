$headers = @{
    'apikey' = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
    'Authorization' = 'Bearer sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
}
try {
    $buckets = Invoke-RestMethod -Uri 'https://cmpghiavghpdwtyuiuqm.supabase.co/storage/v1/bucket' -Headers $headers
    Write-Output "BUCKETS FOUND:"
    foreach ($b in $buckets) {
        Write-Output ("Bucket: " + $b.name + ", Public: " + $b.public)
    }
} catch {
    Write-Output "Storage check error: $_"
}
