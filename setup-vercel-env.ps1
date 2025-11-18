# Script to set all environment variables in Vercel
# Project ID: prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0
# URL: https://ario-studio-v3.vercel.app

Write-Host "Setting up Vercel Environment Variables..." -ForegroundColor Green
Write-Host "Project: Ario-Studio-V3" -ForegroundColor Cyan
Write-Host "Project ID: prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0" -ForegroundColor Cyan
Write-Host ""

# Check if vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Link project (if not already linked)
Write-Host "Linking project..." -ForegroundColor Yellow
vercel link --yes --project prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0

Write-Host ""
Write-Host "Adding environment variables..." -ForegroundColor Yellow
Write-Host ""

# Database
Write-Host "Setting DATABASE_URL..." -ForegroundColor Cyan
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL production
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL preview
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL development

# Admin
Write-Host "Setting ADMIN_EMAIL..." -ForegroundColor Cyan
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL production
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL preview
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL development

Write-Host "Setting ADMIN_PASSWORD..." -ForegroundColor Cyan
echo "85Ario85" | vercel env add ADMIN_PASSWORD production
echo "85Ario85" | vercel env add ADMIN_PASSWORD preview
echo "85Ario85" | vercel env add ADMIN_PASSWORD development

Write-Host "Setting NEXTAUTH_SECRET..." -ForegroundColor Cyan
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET production
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET preview
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET development

Write-Host "Setting NEXTAUTH_URL..." -ForegroundColor Cyan
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL production
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL preview
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL development

# Email
Write-Host "Setting RESEND_API_KEY..." -ForegroundColor Cyan
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY production
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY preview
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY development

# AI
Write-Host "Setting OPENAI_API_KEY..." -ForegroundColor Cyan
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY development

Write-Host ""
Write-Host "Environment variables set successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Redeploy your project: vercel --prod" -ForegroundColor Cyan
Write-Host "2. Or redeploy from Vercel Dashboard" -ForegroundColor Cyan
Write-Host "3. Test email: https://ario-studio-v3.vercel.app/api/test-email?to=kavehtkts@gmail.com" -ForegroundColor Cyan
Write-Host ""

