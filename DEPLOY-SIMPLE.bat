@echo off
echo ========================================
echo   Sanity Studio Deployment
echo ========================================
echo.

set SANITY_AUTH_TOKEN=skUzS1IWpst85gj7LEtulkIgZkuQAj2Gd5SmD9AX51cdmoPvUYZP7Ii2op0P8wDf5luJpDwNVgGAvnhIo7pI0sD8xlQV7UU1hzu1mrCd9mqKf7FNj4z8iwyje0pxQK6CZjJpTb95gjhUKtAeRMt6E99lyfqxI0ILJdRiRENUo3uGtTw5Nqko
set NEXT_PUBLIC_SANITY_PROJECT_ID=dgwzv4lg
set NEXT_PUBLIC_SANITY_DATASET=production

cd /d "C:\Users\Ario\Desktop\Ario-Studio-V3"

echo Deploying studio to: https://ariostudio.sanity.studio
echo.
echo Note: This will open a browser for authentication (one-time only)
echo.

npx sanity deploy --host ariostudio

echo.
echo Done!
pause

