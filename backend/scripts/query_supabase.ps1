$headers = @{
    'apikey' = 'sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
    'Authorization' = 'Bearer sb_publishable_545SR2CWuNiNGvx4viBoIQ_23O3hFO8'
}
$jobs = Invoke-RestMethod -Uri 'https://cmpghiavghpdwtyuiuqm.supabase.co/rest/v1/jobs?select=id,title,location' -Headers $headers
foreach ($j in $jobs) {
    Write-Output "$($j.id) | $($j.title) | $($j.location)"
}
