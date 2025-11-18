#!/bin/bash
# Script to set all environment variables in Vercel
# Project ID: prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0
# URL: https://ario-studio-v3.vercel.app

echo "Setting up Vercel Environment Variables..."
echo "Project: Ario-Studio-V3"
echo "Project ID: prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Link project (if not already linked)
echo "Linking project..."
vercel link --yes --project prj_rh6elzbu2zw6ABrsmq1Z7mqTTtR0

echo ""
echo "Adding environment variables..."
echo ""

# Database
echo "Setting DATABASE_URL..."
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL production
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL preview
echo "postgresql://neondb_owner:npg_0zHRQvDCfsS9@ep-square-smoke-agcvuf1p-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require" | vercel env add DATABASE_URL development

# Admin
echo "Setting ADMIN_EMAIL..."
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL production
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL preview
echo "kavehtkts@gmail.com" | vercel env add ADMIN_EMAIL development

echo "Setting ADMIN_PASSWORD..."
echo "85Ario85" | vercel env add ADMIN_PASSWORD production
echo "85Ario85" | vercel env add ADMIN_PASSWORD preview
echo "85Ario85" | vercel env add ADMIN_PASSWORD development

echo "Setting NEXTAUTH_SECRET..."
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET production
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET preview
echo "R6npFUqmpQfnVSm8Km581hmTLm7hnb0dZPfNxVe+6g8=" | vercel env add NEXTAUTH_SECRET development

echo "Setting NEXTAUTH_URL..."
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL production
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL preview
echo "https://ario-studio-v3.vercel.app" | vercel env add NEXTAUTH_URL development

# Email
echo "Setting RESEND_API_KEY..."
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY production
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY preview
echo "re_H4wtiCcr_EmE5Xparq1nrS2LFU7HZThwK" | vercel env add RESEND_API_KEY development

# AI
echo "Setting OPENAI_API_KEY..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiI2OTFiY2NmNTY5MjdkMjAxMDBiZWU0MjgiLCJ0eXBlIjoiYWlfa2V5IiwiaWF0IjoxNzYzNDI5NjIxfQ.Bsbq45mwzKEw5dErH5VUokSk43QT7uH7h0C446ai4Fc" | vercel env add OPENAI_API_KEY development

echo ""
echo "Environment variables set successfully!"
echo ""
echo "Next steps:"
echo "1. Redeploy your project: vercel --prod"
echo "2. Or redeploy from Vercel Dashboard"
echo "3. Test email: https://ario-studio-v3.vercel.app/api/test-email?to=kavehtkts@gmail.com"
echo ""

