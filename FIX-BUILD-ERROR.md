# حل مشکل Build Error

## مشکل
خطای `Rollup failed to resolve import "react-is"` در هنگام build

## راه حل

### مرحله 1: نصب react-is

```powershell
npm install react-is@^18.3.1 --save --legacy-peer-deps
```

### مرحله 2: پاک کردن cache و rebuild

```powershell
# پاک کردن dist و cache
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue

# Build مجدد
npx sanity build
```

### مرحله 3: اگر هنوز خطا دارید

```powershell
# نصب همه dependencies از نو
npm install --legacy-peer-deps

# Build
npx sanity build
```

## بررسی موفقیت Build

بعد از build موفق، باید:
- پوشه `dist/` ایجاد شود
- فایل `dist/index.html` وجود داشته باشد
- فایل‌های JavaScript و CSS در `dist/` باشند

## دستور کامل (یکجا)

```powershell
npm install react-is@^18.3.1 --save --legacy-peer-deps
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
npx sanity build
```

## اگر هنوز مشکل دارید

ممکن است نیاز به update کردن Sanity باشد:

```powershell
npm install sanity@latest --save
npm install --legacy-peer-deps
npx sanity build
```

