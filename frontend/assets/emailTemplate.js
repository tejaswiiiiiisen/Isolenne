// SkilloraPath Recruitment Email Generator
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function generateRecruitmentEmailHtml(data) {
  const candidateName = escapeHtml(data.candidateName || 'Candidate');
  const email = escapeHtml(data.email || 'Not provided');
  const phone = escapeHtml(data.phone || 'Not provided');
  const location = escapeHtml(data.location || 'Not provided');
  const experience = escapeHtml(data.experience || 'Not specified');
  const position = escapeHtml(data.positionTitle || 'General Application');
  const coverLetter = escapeHtml(data.coverLetter || 'No cover letter provided.');
  const resumeName = escapeHtml(data.resumeName || 'Resume.pdf');
  const resumeSize = escapeHtml(data.resumeSize || 'Uploaded');
  const appId = escapeHtml(data.applicationId || ('AGX-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000)));
  const submittedOn = escapeHtml(data.submittedOn || new Date().toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata'
  }) + ' (IST)');

  const linkedInDisplay = data.linkedInUrl 
    ? `<a href="${escapeHtml(data.linkedInUrl)}" target="_blank" style="color: #0066ff; text-decoration: underline; word-break: break-all;">${escapeHtml(data.linkedInUrl)}</a>`
    : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>';

  const portfolioDisplay = data.portfolioUrl 
    ? `<a href="${escapeHtml(data.portfolioUrl)}" target="_blank" style="color: #0066ff; text-decoration: underline; word-break: break-all;">${escapeHtml(data.portfolioUrl)}</a>`
    : '<span style="color: #94a3b8; font-style: italic;">Not provided</span>';

  const futureConsentBadge = data.agreeToFutureRecruitment
    ? '<span style="background-color: #dcfce7; color: #15803d; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; display: inline-block;">Agreed</span>'
    : '<span style="background-color: #f1f5f9; color: #64748b; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; display: inline-block;">Not Granted</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Job Application Received | SkilloraPath</title>
  <style>
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    body { margin: 0; padding: 0; width: 100% !important; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
    @media only screen and (max-width: 620px) {
      .email-container { width: 100% !important; max-width: 100% !important; margin: 0 !important; border-radius: 0 !important; }
      .mobile-stack { display: block !important; width: 100% !important; box-sizing: border-box !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-title { font-size: 22px !important; line-height: 28px !important; }
      .mobile-bottom-space { margin-bottom: 16px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 30px 0; background-color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 10px 15px;">
        <table role="presentation" class="email-container" width="640" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; width: 100%; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08); border: 1px solid #e2e8f0;">
          
          <!-- Top Header: Logo + Tagline -->
          <tr>
            <td class="mobile-padding" style="padding: 28px 36px 20px 36px; background-color: #ffffff;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" valign="middle">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" style="padding-right: 10px;">
                          <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #071e3d 0%, #0066ff 100%); border-radius: 8px; text-align: center; line-height: 32px;">
                            <span style="color: #ffffff; font-weight: 900; font-size: 18px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">▲</span>
                          </div>
                        </td>
                        <td valign="middle">
                          <span style="font-size: 24px; font-weight: 800; color: #0b2545; letter-spacing: -0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">Agni<span style="color: #0066ff;">X</span></span>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="font-size: 11px; font-weight: 800; color: #0284c7; letter-spacing: 2px; text-transform: uppercase;">BUILD. AUTOMATE. GROW.</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Hero Banner Section -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 20px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #071E3D 0%, #0047AB 60%, #0066FF 100%); border-radius: 16px; overflow: hidden;">
                <tr>
                  <td style="padding: 30px 28px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="72" valign="middle" style="padding-right: 18px;">
                          <div style="width: 60px; height: 60px; background-color: rgba(255, 255, 255, 0.15); border-radius: 50%; border: 2px solid rgba(255, 255, 255, 0.25); text-align: center; line-height: 60px;">
                            <span style="font-size: 28px;">✉️</span>
                          </div>
                        </td>
                        <td valign="middle">
                          <h1 class="hero-title" style="margin: 0; font-size: 25px; font-weight: 800; color: #ffffff; line-height: 32px; letter-spacing: -0.5px;">
                            New <span style="color: #38bdf8;">Job</span> Application Received
                          </h1>
                          <p style="margin: 6px 0 0 0; font-size: 14px; color: #e2e8f0; font-weight: 400; line-height: 20px;">
                            A new candidate has applied to join SkilloraPath.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Meta Information Card -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 20px;">
                <tr>
                  <td class="mobile-stack" width="50%" valign="middle" style="padding: 4px 10px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="middle">
                          <div style="width: 32px; height: 32px; background-color: #eff6ff; border-radius: 8px; text-align: center; line-height: 32px; font-size: 16px;">
                            📅
                          </div>
                        </td>
                        <td valign="middle" style="padding-left: 10px;">
                          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px;">Application ID</div>
                          <div style="font-size: 15px; color: #0047ab; font-weight: 800; letter-spacing: 0.5px;">${appId}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td class="mobile-stack" width="1" style="background-color: #e2e8f0; font-size: 0; line-height: 0;">&nbsp;</td>
                  <td class="mobile-stack" width="50%" valign="middle" style="padding: 4px 10px 4px 20px;">
                    <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="36" valign="middle">
                          <div style="width: 32px; height: 32px; background-color: #eff6ff; border-radius: 8px; text-align: center; line-height: 32px; font-size: 16px;">
                            🕒
                          </div>
                        </td>
                        <td valign="middle" style="padding-left: 10px;">
                          <div style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px;">Submitted On</div>
                          <div style="font-size: 14px; color: #0f172a; font-weight: 700;">${submittedOn}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: Candidate Information -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 18px;">
                <tr>
                  <td width="32" valign="middle">
                    <div style="width: 26px; height: 26px; background-color: #0066ff; border-radius: 50%; text-align: center; line-height: 26px; color: #ffffff; font-size: 14px; font-weight: bold;">
                      👤
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 10px; white-space: nowrap;">
                    <span style="font-size: 17px; font-weight: 800; color: #0b2545; letter-spacing: -0.3px;">Candidate Information</span>
                  </td>
                  <td valign="middle" width="100%" style="padding-left: 15px;">
                    <div style="height: 1px; background-color: #cbd5e1;"></div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 15px 12px 0;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">Full Name</div>
                    <div style="font-size: 15px; color: #0f172a; font-weight: 800;">${candidateName}</div>
                  </td>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 0 12px 15px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">💼 Years of Experience</div>
                    <div style="font-size: 15px; color: #0f172a; font-weight: 700;">${experience}</div>
                  </td>
                </tr>
                <tr>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 15px 12px 0;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">✉️ Email Address</div>
                    <div style="font-size: 14px; font-weight: 600;">
                      <a href="mailto:${email}" style="color: #0066ff; text-decoration: none; word-break: break-all;">${email}</a>
                    </div>
                  </td>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 0 12px 15px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">💻 Applying Position</div>
                    <div style="font-size: 15px; color: #0b2545; font-weight: 800;">${position}</div>
                  </td>
                </tr>
                <tr>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 15px 12px 0;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">📞 Phone Number</div>
                    <div style="font-size: 14px; font-weight: 700;">
                      <a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>
                    </div>
                  </td>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 0 12px 15px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">🔗 LinkedIn URL</div>
                    <div style="font-size: 14px; font-weight: 600;">${linkedInDisplay}</div>
                  </td>
                </tr>
                <tr>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 15px 12px 0;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">📍 Current Location</div>
                    <div style="font-size: 14px; color: #0f172a; font-weight: 600;">${location}</div>
                  </td>
                  <td class="mobile-stack mobile-bottom-space" width="50%" valign="top" style="padding: 8px 0 12px 15px;">
                    <div style="font-size: 12px; color: #64748b; font-weight: 600; margin-bottom: 4px;">🌐 Portfolio URL</div>
                    <div style="font-size: 14px; font-weight: 600;">${portfolioDisplay}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: Cover Letter / Pitch -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                <tr>
                  <td width="32" valign="middle">
                    <div style="width: 26px; height: 26px; background-color: #0066ff; border-radius: 50%; text-align: center; line-height: 26px; color: #ffffff; font-size: 13px;">
                      ✏️
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 10px; white-space: nowrap;">
                    <span style="font-size: 17px; font-weight: 800; color: #0b2545; letter-spacing: -0.3px;">Candidate's Cover Letter / Pitch</span>
                  </td>
                  <td valign="middle" width="100%" style="padding-left: 15px;">
                    <div style="height: 1px; background-color: #cbd5e1;"></div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px;">
                <tr>
                  <td style="padding: 20px 24px; font-size: 14px; color: #334155; line-height: 24px; white-space: pre-wrap; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${coverLetter}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: Resume -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 24px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                <tr>
                  <td width="32" valign="middle">
                    <div style="width: 26px; height: 26px; background-color: #0066ff; border-radius: 50%; text-align: center; line-height: 26px; color: #ffffff; font-size: 14px;">
                      📎
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 10px; white-space: nowrap;">
                    <span style="font-size: 17px; font-weight: 800; color: #0b2545; letter-spacing: -0.3px;">Resume</span>
                  </td>
                  <td valign="middle" width="100%" style="padding-left: 15px;">
                    <div style="height: 1px; background-color: #cbd5e1;"></div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0f6ff; border: 1px solid #bfdbfe; border-radius: 14px; padding: 16px 20px;">
                <tr>
                  <td width="48" valign="middle">
                    <div style="width: 42px; height: 42px; background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%); border-radius: 10px; text-align: center; line-height: 42px; color: #ffffff; font-weight: 900; font-size: 12px; letter-spacing: 0.5px;">
                      PDF
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 14px;">
                    <div style="font-size: 15px; font-weight: 800; color: #0f172a;">Resume Attached</div>
                    <div style="font-size: 12px; color: #64748b; font-weight: 500; margin-top: 3px;">
                      Filename: <span style="color: #0f172a; font-weight: 700;">${resumeName}</span> • Size: ${resumeSize}
                    </div>
                  </td>
                  <td align="right" valign="middle">
                    <div style="display: inline-block; background-color: #ffffff; border: 1px solid #3b82f6; border-radius: 9999px; padding: 8px 18px; font-size: 12px; font-weight: 700; color: #1d4ed8;">
                      ⬇ Download Resume
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- SECTION: Privacy & Consent -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 28px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 14px;">
                <tr>
                  <td width="32" valign="middle">
                    <div style="width: 26px; height: 26px; background-color: #0066ff; border-radius: 50%; text-align: center; line-height: 26px; color: #ffffff; font-size: 14px;">
                      🛡️
                    </div>
                  </td>
                  <td valign="middle" style="padding-left: 10px; white-space: nowrap;">
                    <span style="font-size: 17px; font-weight: 800; color: #0b2545; letter-spacing: -0.3px;">Privacy & Consent</span>
                  </td>
                  <td valign="middle" width="100%" style="padding-left: 15px;">
                    <div style="height: 1px; background-color: #cbd5e1;"></div>
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px 20px;">
                <tr>
                  <td width="24" valign="middle" style="padding: 6px 0;">
                    <span style="color: #16a34a; font-size: 16px;">✔</span>
                  </td>
                  <td valign="middle" style="padding: 6px 10px; font-size: 13px; color: #1e293b; font-weight: 600;">
                    Recruitment Data Processing Consent:
                  </td>
                  <td align="right" valign="middle" style="padding: 6px 0;">
                    <span style="background-color: #dcfce7; color: #15803d; padding: 4px 14px; border-radius: 9999px; font-size: 12px; font-weight: 800; letter-spacing: 0.3px; display: inline-block;">
                      Agreed
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="3" style="border-top: 1px solid #f1f5f9; padding: 4px 0;"></td>
                </tr>
                <tr>
                  <td width="24" valign="middle" style="padding: 6px 0;">
                    <span style="color: #16a34a; font-size: 16px;">✔</span>
                  </td>
                  <td valign="middle" style="padding: 6px 10px; font-size: 13px; color: #1e293b; font-weight: 600;">
                    Future Employment Opportunities Consent:
                  </td>
                  <td align="right" valign="middle" style="padding: 6px 0;">
                    ${futureConsentBadge}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Corporate Banner -->
          <tr>
            <td class="mobile-padding" style="padding: 0 36px 16px 36px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(135deg, #071E3D 0%, #0B2545 100%); border-radius: 14px;">
                <tr>
                  <td style="padding: 18px 24px;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" width="130">
                          <span style="font-size: 20px; font-weight: 900; color: #ffffff; letter-spacing: -0.5px;">▲ Agni<span style="color: #60a5fa;">X</span></span>
                        </td>
                        <td width="1" style="background-color: rgba(255, 255, 255, 0.2); font-size: 0; line-height: 0;">&nbsp;</td>
                        <td valign="middle" style="padding-left: 20px;">
                          <div style="font-size: 13px; font-weight: 800; color: #ffffff;">SkilloraPath Careers</div>
                          <div style="font-size: 10px; font-weight: 700; color: #93c5fd; letter-spacing: 2px; text-transform: uppercase;">BUILD. AUTOMATE. GROW.</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sub-footer Notice -->
          <tr>
            <td align="center" style="padding: 0 36px 28px 36px;">
              <p style="margin: 0; font-size: 12px; color: #94a3b8; font-weight: 500;">
                This application was submitted through the official SkilloraPath careers website.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
