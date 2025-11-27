# Build with full output capture

$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "dgwzv4lg"
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

Write-Host "Building Sanity Studio..." -ForegroundColor Cyan
Write-Host ""

# Run build and capture all output
npx sanity build *> build-full-output.txt

Write-Host "Build completed. Checking output..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "build-full-output.txt") {
    $content = Get-Content "build-full-output.txt" -Raw
    Write-Host $content
    
    # Check for success indicators
    if ($content -match "Build.*success|✓.*Build") {
        Write-Host "`n✅ Build appears successful!" -ForegroundColor Green
    } elseif ($content -match "Error|Failed|✗") {
        Write-Host "`n❌ Build failed. See output above." -ForegroundColor Red
    }
}

# Check dist folder
if (Test-Path "dist/index.html") {
    Write-Host "`n✅ index.html found in dist/" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  index.html not found in dist/" -ForegroundColor Yellow
}

Write-Host ""

