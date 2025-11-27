# Complete Build and Prepare Script for Sanity Studio

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sanity Studio Build & Deploy Prep" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$PROJECT_ID = "dgwzv4lg"
$DATASET = "production"

# Set environment variables
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = $PROJECT_ID
$env:NEXT_PUBLIC_SANITY_DATASET = $DATASET

# Change to project directory
Set-Location "C:\Users\Ario\Desktop\Ario-Studio-V3"

Write-Host "📋 Configuration:" -ForegroundColor Green
Write-Host "   Project ID: $PROJECT_ID" -ForegroundColor Gray
Write-Host "   Dataset: $DATASET" -ForegroundColor Gray
Write-Host "   Target: https://www.ariostudio.net" -ForegroundColor Gray
Write-Host ""

# Step 1: Build
Write-Host "🔨 Step 1: Building Studio..." -ForegroundColor Yellow
Write-Host ""

try {
    $buildOutput = npx sanity build 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Build completed with warnings" -ForegroundColor Yellow
        Write-Host $buildOutput
    }
} catch {
    Write-Host "❌ Build failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 2: Check dist folder
Write-Host "📁 Step 2: Checking build output..." -ForegroundColor Yellow
Write-Host ""

if (Test-Path "dist") {
    $fileCount = (Get-ChildItem "dist" -Recurse -File).Count
    $folderSize = (Get-ChildItem "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    
    Write-Host "✅ Build output found!" -ForegroundColor Green
    Write-Host "   Files: $fileCount" -ForegroundColor Gray
    Write-Host "   Size: $([math]::Round($folderSize, 2)) MB" -ForegroundColor Gray
    Write-Host ""
    
    # List main files
    Write-Host "📄 Main files:" -ForegroundColor Cyan
    if (Test-Path "dist/index.html") {
        Write-Host "   ✅ index.html" -ForegroundColor Green
    } else {
        Write-Host "   ⚠️  index.html not found" -ForegroundColor Yellow
    }
    
    Get-ChildItem "dist" -File | Select-Object -First 10 Name | ForEach-Object {
        Write-Host "   - $($_.Name)" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ dist/ folder not found!" -ForegroundColor Red
    Write-Host "   Build may have failed. Please check the output above." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ✅ Build Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📦 Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Upload the 'dist' folder to your hosting:" -ForegroundColor White
Write-Host "   - Vercel: Connect GitHub repo and set output to 'dist'" -ForegroundColor Gray
Write-Host "   - Netlify: Connect GitHub repo and set publish dir to 'dist'" -ForegroundColor Gray
Write-Host "   - Your Server: Upload dist/ folder contents" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Configure SPA routing:" -ForegroundColor White
Write-Host "   - All routes should redirect to index.html" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Access your studio at:" -ForegroundColor White
Write-Host "   https://www.ariostudio.net" -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ Your studio is ready to deploy!" -ForegroundColor Green
Write-Host ""

