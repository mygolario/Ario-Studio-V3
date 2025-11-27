# Build Sanity Studio Script

Write-Host "🚀 Building Sanity Studio..." -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "dgwzv4lg"
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

# Change to project directory
Set-Location "C:\Users\Ario\Desktop\Ario-Studio-V3"

Write-Host "📦 Running: npx sanity build" -ForegroundColor Yellow
Write-Host ""

# Run build command
try {
    $output = npx sanity build 2>&1 | Out-String
    
    Write-Host "Build Output:" -ForegroundColor Green
    Write-Host $output
    
    # Check if dist folder was created
    if (Test-Path "dist") {
        Write-Host ""
        Write-Host "✅ Build successful! dist/ folder created" -ForegroundColor Green
        $fileCount = (Get-ChildItem "dist" -Recurse -File).Count
        Write-Host "   Files created: $fileCount" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "⚠️  Build completed but dist/ folder not found" -ForegroundColor Yellow
    }
} catch {
    Write-Host ""
    Write-Host "❌ Build failed: $_" -ForegroundColor Red
}

Write-Host ""

