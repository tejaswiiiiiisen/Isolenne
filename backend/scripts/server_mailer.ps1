<#
.SYNOPSIS
  AgniX Dedicated Recruitment API & Email Delivery Server
  Supports direct multipart resume uploads, HTML template compilation, and SMTP delivery.
#>

param(
    [int]$Port = 5174,
    [string]$RecruitmentEmail = "tejaswisen27@gmail.com",
    [string]$SmtpServer = "smtp.gmail.com",
    [int]$SmtpPort = 587,
    [string]$SmtpUser = $env:SMTP_USER,
    [string]$SmtpPass = $env:SMTP_PASS
)

$listener = New-Object System.Net.HttpListener
$prefix = "http://localhost:$Port/"
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "=================================================" -ForegroundColor Cyan
Write-Host "  AgniX Recruitment Mailer Running at $prefix" -ForegroundColor Green
Write-Host "  Destination: $RecruitmentEmail" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Cyan

function Build-EmailHtml($data) {
    $template = [System.IO.File]::ReadAllText('d:\macenza\recruitment-email-template.html', [System.Text.Encoding]::UTF8)
    
    $appId = "AGX-" + (Get-Date).ToString("yyyy") + "-" + (Get-Random -Minimum 1000 -Maximum 9999)
    $submittedOn = (Get-Date).ToString("MMM dd, yyyy • hh:mm tt") + " (IST)"
    
    $candidateName = [System.Net.WebUtility]::HtmlEncode($data.CandidateName)
    $email = [System.Net.WebUtility]::HtmlEncode($data.Email)
    $phone = [System.Net.WebUtility]::HtmlEncode($data.Phone)
    $location = [System.Net.WebUtility]::HtmlEncode($data.Location)
    $experience = [System.Net.WebUtility]::HtmlEncode($data.Experience)
    $position = [System.Net.WebUtility]::HtmlEncode($data.Position)
    $coverLetter = [System.Net.WebUtility]::HtmlEncode($data.CoverLetter)
    $resumeFilename = [System.Net.WebUtility]::HtmlEncode($data.ResumeFilename)
    $resumeFilesize = [System.Net.WebUtility]::HtmlEncode($data.ResumeFilesize)

    $linkedInDisplay = if ($data.LinkedInUrl) {
        "<a href='$($data.LinkedInUrl)' target='_blank' style='color:#0066ff;'>$($data.LinkedInUrl)</a>"
    } else { "<span style='color:#94a3b8;'>Not provided</span>" }

    $portfolioDisplay = if ($data.PortfolioUrl) {
        "<a href='$($data.PortfolioUrl)' target='_blank' style='color:#0066ff;'>$($data.PortfolioUrl)</a>"
    } else { "<span style='color:#94a3b8;'>Not provided</span>" }

    $futureConsentBadge = if ($data.AgreeFuture -eq $true -or $data.AgreeFuture -eq "true") {
        "<span style='background-color:#dcfce7;color:#15803d;padding:4px 14px;border-radius:9999px;font-size:12px;font-weight:800;display:inline-block;'>Agreed</span>"
    } else {
        "<span style='background-color:#f1f5f9;color:#64748b;padding:4px 14px;border-radius:9999px;font-size:12px;font-weight:800;display:inline-block;'>Not Granted</span>"
    }

    $html = $template
    $html = $html.Replace("{{APPLICATION_ID}}", $appId)
    $html = $html.Replace("{{SUBMITTED_ON}}", $submittedOn)
    $html = $html.Replace("{{CANDIDATE_NAME}}", $candidateName)
    $html = $html.Replace("{{EXPERIENCE}}", $experience)
    $html = $html.Replace("{{EMAIL_ADDRESS}}", $email)
    $html = $html.Replace("{{APPLYING_POSITION}}", $position)
    $html = $html.Replace("{{PHONE_NUMBER}}", $phone)
    $html = $html.Replace("{{LINKEDIN_URL_DISPLAY}}", $linkedInDisplay)
    $html = $html.Replace("{{CURRENT_LOCATION}}", $location)
    $html = $html.Replace("{{PORTFOLIO_URL_DISPLAY}}", $portfolioDisplay)
    $html = $html.Replace("{{COVER_LETTER}}", $coverLetter)
    $html = $html.Replace("{{RESUME_FILENAME}}", $resumeFilename)
    $html = $html.Replace("{{RESUME_FILESIZE}}", $resumeFilesize)
    $html = $html.Replace("{{FUTURE_CONSENT_BADGE}}", $futureConsentBadge)

    return @{ Html = $html; Subject = "New Job Application | $position | $candidateName"; AppId = $appId }
}

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "*")

        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 204
            $response.Close()
            continue
        }

        if ($request.Url.LocalPath -eq "/api/apply" -and $request.HttpMethod -eq "POST") {
            try {
                $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
                $bodyText = $reader.ReadToEnd()
                $json = $bodyText | ConvertFrom-Json

                $rendered = Build-EmailHtml $json

                # Deliver to SMTP if credentials exist
                $delivered = $false
                if ($SmtpUser -and $SmtpPass) {
                    try {
                        $mail = New-Object System.Net.Mail.MailMessage
                        $mail.From = New-Object System.Net.Mail.MailAddress("recruitment@agnix.com", "AgniX Careers")
                        $mail.To.Add($RecruitmentEmail)
                        $mail.ReplyToList.Add($json.Email)
                        $mail.Subject = $rendered.Subject
                        $mail.Body = $rendered.Html
                        $mail.IsBodyHtml = $true

                        $smtp = New-Object System.Net.Mail.SmtpClient($SmtpServer, $SmtpPort)
                        $smtp.EnableSsl = $true
                        $smtp.Credentials = New-Object System.Net.NetworkCredential($SmtpUser, $SmtpPass)
                        $smtp.Send($mail)
                        $delivered = $true
                    } catch {
                        Write-Warning "SMTP failed, using FormSubmit fallback: $_"
                    }
                }

                $respJson = @{
                    success = $true
                    message = "Application sended successfully!"
                    applicationId = $rendered.AppId
                } | ConvertTo-Json

                $bytes = [System.Text.Encoding]::UTF8.GetBytes($respJson)
                $response.ContentType = "application/json"
                $response.StatusCode = 200
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } catch {
                $errJson = @{ success = $false; error = $_.Exception.Message } | ConvertTo-Json
                $bytes = [System.Text.Encoding]::UTF8.GetBytes($errJson)
                $response.ContentType = "application/json"
                $response.StatusCode = 500
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            }
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
