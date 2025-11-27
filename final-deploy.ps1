# Final Sanity Studio Deployment Script
# This script handles the complete deployment process

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sanity Studio Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set environment variables
$env:SANITY_AUTH_TOKEN = "skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko"
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = "dgwzv4lg"
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

Write-Host "✅ Configuration:" -ForegroundColor Green
Write-Host "   Project ID: $env:NEXT_PUBLIC_SANITY_PROJECT_ID" -ForegroundColor Gray
Write-Host "   Hostname: ariostudio" -ForegroundColor Gray
Write-Host "   Target URL: https://ariostudio.sanity.studio" -ForegroundColor Gray
Write-Host ""

# Ensure we're in the right directory
Set-Location "C:\Users\Ario\Desktop\Ario-Studio-V3"

Write-Host "📦 Starting deployment..." -ForegroundColor Yellow
Write-Host ""

# Run the deploy command
# Note: This will require interactive authentication
try {
    $process = Start-Process -FilePath "npx" -ArgumentList "sanity","deploy","--host","ariostudio" -NoNewWindow -Wait -PassThru -RedirectStandardOutput "deploy-output.txt" -RedirectStandardError "deploy-error.txt"
    
    Write-Host "Deployment process completed with exit code: $($process.ExitCode)" -ForegroundColor $(if ($process.ExitCode -eq 0) { "Green" } else { "Yellow" })
    
    if (Test-Path "deploy-output.txt") {
        Write-Host "`nOutput:" -ForegroundColor Cyan
        Get-Content "deploy-output.txt"
    }
    
    if (Test-Path "deploy-error.txt") {
        $errors = Get-Content "deploy-error.txt"
        if ($errors) {
            Write-Host "`nErrors:" -ForegroundColor Yellow
            Write-Host $errors
        }
    }
    
    if ($process.ExitCode -eq 0) {
        Write-Host "`n✅ Studio deployed successfully!" -ForegroundColor Green
        Write-Host "🌐 Available at: https://ariostudio.sanity.studio" -ForegroundColor Cyan
    } else {
        Write-Host "`n⚠️  Deployment may require interactive authentication" -ForegroundColor Yellow
        Write-Host "`nPlease run manually:" -ForegroundColor Cyan
        Write-Host "   npx sanity login" -ForegroundColor White
        Write-Host "   npx sanity deploy --host ariostudio" -ForegroundColor White
    }
} catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    Write-Host "`nPlease run manually:" -ForegroundColor Yellow
    Write-Host "   npx sanity login" -ForegroundColor White
    Write-Host "   npx sanity deploy --host ariostudio" -ForegroundColor White
}

Write-Host ""

