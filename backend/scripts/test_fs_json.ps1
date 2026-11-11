# Test FormSubmit JSON post to tejaswisen27@gmail.com
try {
    $body = @{
        _subject = "Test Application - Rahul Sharma"
        _template = "table"
        _captcha = "false"
        "Full Name" = "Rahul Sharma"
        "Email Address" = "test@example.com"
        "Phone Number" = "+91 9876543210"
        "Position" = "Frontend Developer"
    } | ConvertTo-Json

    $resp = Invoke-RestMethod -Uri "https://formsubmit.co/ajax/tejaswisen27@gmail.com" -Method Post -Body $body -ContentType "application/json" -Headers @{ Accept = "application/json" }
    Write-Output "JSON POST SUCCESS:"
    Write-Output ($resp | ConvertTo-Json)
} catch {
    Write-Output "JSON POST FAILED:"
    Write-Output $_.Exception.Message
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($stream)
        Write-Output ("Response body: " + $reader.ReadToEnd())
    }
}
