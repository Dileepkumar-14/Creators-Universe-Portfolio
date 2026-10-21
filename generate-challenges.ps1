
# Run this script from the Creators Universe website root.
$root = Get-Location
$assets = Join-Path $root "assets\challenges"
$jsFolder = Join-Path $root "js"
$output = Join-Path $jsFolder "challenges-manifest.js"

$folders = [ordered]@{
    paranormalChallenge1 = "paranormal\challenge-1"
    paranormalChallenge2 = "paranormal\challenge-2"
    loopChallenge1       = "loop-break-free\challenge-1"
    loopChallenge2       = "loop-break-free\challenge-2"
}

$extensions = @(
    ".jpg", ".jpeg", ".png", ".webp", ".avif",
    ".gif", ".bmp", ".tif", ".tiff", ".svg"
)

if (-not (Test-Path $jsFolder)) {
    New-Item -ItemType Directory -Path $jsFolder | Out-Null
}

$manifest = [ordered]@{}

foreach ($key in $folders.Keys) {
    $relativeFolder = $folders[$key]
    $folder = Join-Path $assets $relativeFolder
    $images = @()

    if (Test-Path $folder) {
        $images = @(
            Get-ChildItem -Path $folder -File |
            Where-Object {
                $extensions -contains $_.Extension.ToLowerInvariant()
            } |
            Sort-Object Name |
            ForEach-Object {
                "assets/challenges/$($relativeFolder.Replace('\','/'))/$($_.Name)"
            }
        )
    }

    $manifest[$key] = $images
}

$json = ConvertTo-Json -InputObject $manifest -Depth 6
$content = "window.CU_CHALLENGES = $json;"

Set-Content -Path $output -Value $content -Encoding UTF8

Write-Host "`nCreated $output" -ForegroundColor Green

foreach ($key in $folders.Keys) {
    Write-Host ("{0}: {1} images" -f $key, $manifest[$key].Count)
}

Read-Host "Press Enter to close"
