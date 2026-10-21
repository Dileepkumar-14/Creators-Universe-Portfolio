# Run this script from the Creators Universe website root.
$root = Get-Location
$assets = Join-Path $root "assets\stills"
$jsFolder = Join-Path $root "js"
$output = Join-Path $jsFolder "stills-manifest.js"
$folders = [ordered]@{ homeStills = "home"; paranormalStills = "paranormal"; loopStills = "loop-break-free" }
$extensions = @(".jpg", ".jpeg", ".png", ".webp", ".avif")
$manifest = [ordered]@{}
foreach ($key in $folders.Keys) {
  $folder = Join-Path $assets $folders[$key]
  $images = @()
  if (Test-Path $folder) {
    $images = @(Get-ChildItem -Path $folder -File | Where-Object { $extensions -contains $_.Extension.ToLower() } | Sort-Object Name | ForEach-Object { "assets/stills/$($folders[$key])/$($_.Name)" })
  }
  $manifest[$key] = $images
}
$json = $manifest | ConvertTo-Json -Depth 6
Set-Content -Path $output -Value ("window.CU_STILLS = " + $json + ";") -Encoding UTF8
Write-Host "Created $output" -ForegroundColor Green
foreach ($key in $folders.Keys) { Write-Host ("{0}: {1} images" -f $key, $manifest[$key].Count) }
Read-Host "Press Enter to close"
