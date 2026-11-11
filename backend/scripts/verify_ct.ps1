$ct = [System.IO.File]::ReadAllText('d:\macenza\assets\Contact-c1-iI1nI.js')

$capTarget = '(0,g.jsx)(`div`,{className:`flex justify-center py-2`,children:(0,g.jsx)(i,{ref:n,sitekey:`d244a6b6-9a9e-4cee-a426-d8108b8eecb2`,onVerify:e=>S(e),onExpire:()=>S(``)})}),'
Write-Output ("Contains contact captcha chunk: " + $ct.Contains($capTarget))

$checkCaptcha = "let t=a||(n.current?n.current.getResponse():``);if(!t)r.error(`Please verify that you are not a robot.`);else{"
Write-Output ("Contains contact captcha check: " + $ct.Contains($checkCaptcha))
