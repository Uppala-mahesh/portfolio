# Screenshot harness for self-verification (headless Chromium, parallel-safe).
# Usage: powershell -ExecutionPolicy Bypass -File _audit\shot.ps1 -Url http://localhost:5173 -Out _audit\shot.png -W 1440 -H 900
param(
  [string]$Url = "http://localhost:5173",
  [string]$Out = "_audit\shot.png",
  [int]$W = 1440,
  [int]$H = 900,
  [int]$DelayMs = 4000
)
$candidates = @(
  "C:\Program Files\Google\Chrome\Application\chrome.exe",
  "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
  "C:\Program Files\Microsoft\Edge\Application\msedge.exe",
  "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
)
$exe = $candidates | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $exe) { Write-Error "no chromium browser found"; exit 1 }
$id = [guid]::NewGuid().ToString('N').Substring(0, 8)
$tmp = Join-Path $env:TEMP "opencode\shot-$id.png"
$prof = Join-Path $env:TEMP "opencode\chrome-prof-$id"
$args = @(
  '--headless=new', '--hide-scrollbars', "--window-size=$W,$H", "--screenshot=$tmp",
  "--virtual-time-budget=$DelayMs", '--run-all-compositor-stages-before-draw',
  "--user-data-dir=$prof", $Url
)
Start-Process -FilePath $exe -ArgumentList $args -Wait -NoNewWindow
if (Test-Path $tmp) { Move-Item $tmp $Out -Force; Write-Output "$Out  ($W x $H)" }
else { Write-Warning "screenshot failed" }
