# Sanity Studio Deployment Script
# This script sets up the environment and deploys the Sanity Studio

Write-Host "🚀 Sanity Studio Deployment Script" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:SANITY_AUTH_TOKEN = "skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko"
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "dgwzv4lg"
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

Write-Host "✅ Environment variables set" -ForegroundColor Green
Write-Host "   Project ID: $env:NEXT_PUBLIC_SANITY_PROJECT_ID" -ForegroundColor Gray
Write-Host ""

# Check if .env.local exists and update it
$envContent = @"
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=dgwzv4lg
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=$env:SANITY_AUTH_TOKEN
"@

$envContent | Out-File -FilePath ".env.local" -Encoding utf8 -Force
Write-Host "✅ .env.local file updated" -ForegroundColor Green
Write-Host ""

# Try to deploy
Write-Host "📦 Attempting to deploy studio..." -ForegroundColor Yellow
Write-Host "   Hostname: ariostudio" -ForegroundColor Gray
Write-Host "   URL: https://ariostudio.sanity.studio" -ForegroundColor Gray
Write-Host ""

try {
    # Run sanity deploy
    $deployOutput = npx sanity deploy --host ariostudio 2>&1 | Out-String
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Studio deployed successfully!" -ForegroundColor Green
        Write-Host "🌐 Your studio is available at: https://ariostudio.sanity.studio" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️  Deployment may require interactive authentication" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📝 Manual steps:" -ForegroundColor Cyan
        Write-Host "   1. Run: npx sanity login" -ForegroundColor White
        Write-Host "   2. Run: npx sanity deploy" -ForegroundColor White
        Write-Host "   3. When prompted, enter hostname: ariostudio" -ForegroundColor White
    }
} catch {
    Write-Host "❌ Error during deployment: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Try running these commands manually:" -ForegroundColor Yellow
    Write-Host "   npx sanity login" -ForegroundColor White
    Write-Host "   npx sanity deploy" -ForegroundColor White
}

Write-Host ""
Write-Host "✨ Setup complete!" -ForegroundColor Green

