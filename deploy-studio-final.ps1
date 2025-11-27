# Final Sanity Studio Deployment Script
# This handles the deployment with proper error handling

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sanity Studio Deployment" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$PROJECT_ID = "dgwzv4lg"
$HOSTNAME = "ariostudio"
$API_TOKEN = "skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko"

Write-Host "📋 Configuration:" -ForegroundColor Green
Write-Host "   Project ID: $PROJECT_ID" -ForegroundColor Gray
Write-Host "   Hostname: $HOSTNAME" -ForegroundColor Gray
Write-Host "   Target URL: https://${HOSTNAME}.sanity.studio" -ForegroundColor Gray
Write-Host ""

# Set environment variables
$env:SANITY_AUTH_TOKEN = $API_TOKEN
$env:NEXT_PUBLIC_SANITY_PROJECT_ID = $PROJECT_ID
$env:NEXT_PUBLIC_SANITY_DATASET = "production"

# Ensure we're in the project directory
Set-Location "C:\Users\Ario\Desktop\Ario-Studio-V3"

Write-Host "🔍 Checking Sanity CLI..." -ForegroundColor Yellow
$sanityCheck = npx sanity --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Sanity CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g @sanity/cli
}

Write-Host ""
Write-Host "📦 Deploying studio..." -ForegroundColor Yellow
Write-Host "   Note: This may open a browser for authentication" -ForegroundColor Gray
Write-Host ""

# Run the deploy command
try {
    # The deploy command will require interactive authentication
    # We'll run it and capture any output
    $deployProcess = Start-Process -FilePath "npx" `
        -ArgumentList "sanity","deploy","--host",$HOSTNAME `
        -NoNewWindow `
        -Wait `
        -PassThru `
        -RedirectStandardOutput "deploy-stdout.txt" `
        -RedirectStandardError "deploy-stderr.txt"
    
    Write-Host "Exit Code: $($deployProcess.ExitCode)" -ForegroundColor $(if ($deployProcess.ExitCode -eq 0) { "Green" } else { "Yellow" })
    
    if (Test-Path "deploy-stdout.txt") {
        $stdout = Get-Content "deploy-stdout.txt" -Raw
        if ($stdout) {
            Write-Host "`nOutput:" -ForegroundColor Cyan
            Write-Host $stdout
        }
    }
    
    if (Test-Path "deploy-stderr.txt") {
        $stderr = Get-Content "deploy-stderr.txt" -Raw
        if ($stderr -and $stderr -notmatch "^\s*$") {
            Write-Host "`nErrors:" -ForegroundColor Yellow
            Write-Host $stderr
        }
    }
    
    if ($deployProcess.ExitCode -eq 0) {
        Write-Host "`n✅ Studio deployed successfully!" -ForegroundColor Green
        Write-Host "🌐 Your studio is available at: https://${HOSTNAME}.sanity.studio" -ForegroundColor Cyan
    } else {
        Write-Host "`n⚠️  Deployment requires interactive authentication" -ForegroundColor Yellow
        Write-Host ""
        Write-Host "📝 To complete deployment, please run these commands manually:" -ForegroundColor Cyan
        Write-Host "   1. npx sanity login" -ForegroundColor White
        Write-Host "      (This will open a browser - complete the authentication)" -ForegroundColor Gray
        Write-Host "   2. npx sanity deploy --host $HOSTNAME" -ForegroundColor White
        Write-Host ""
        Write-Host "💡 The 'Add studio' button in the dashboard is ONLY for custom-hosted studios." -ForegroundColor Yellow
        Write-Host "   Sanity-hosted studios (sanity.studio domains) MUST be created via CLI." -ForegroundColor Yellow
    }
} catch {
    Write-Host "`n❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "📝 Please run manually:" -ForegroundColor Yellow
    Write-Host "   npx sanity login" -ForegroundColor White
    Write-Host "   npx sanity deploy --host $HOSTNAME" -ForegroundColor White
}

Write-Host ""

