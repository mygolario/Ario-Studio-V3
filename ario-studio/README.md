# آریو استودیو - Ario Studio

یک وب‌سایت سینماتیک و پریمیوم برای استودیوی دیجیتال و هوش مصنوعی آریو استودیو.

## ویژگی‌ها

- ✨ طراحی سینماتیک و پریمیوم با انیمیشن‌های GSAP
- 🎨 UI/UX مدرن با Glassmorphism و افکت‌های نور
- 📱 کاملاً Responsive (موبایل، تبلت، دسکتاپ)
- 🌐 RTL کامل برای زبان فارسی
- ⚡ Smooth Scroll با Lenis
- 🎯 فرم درخواست پروژه چندمرحله‌ای
- 💼 بخش نمونه‌کارها با فیلتر و Modal
- 💰 بخش قیمت‌گذاری با مقایسه پکیج‌ها
- ❓ بخش سوالات متداول با Accordion
- 📧 بخش تماس با فرم و لینک‌های جایگزین

## تکنولوژی‌ها

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **GSAP** (انیمیشن‌های پیشرفته)
- **Framer Motion** (انیمیشن‌های UI)
- **Lenis** (Smooth Scroll)

## نصب و راه‌اندازی

```bash
# نصب وابستگی‌ها
npm install

# اجرای پروژه در حالت توسعه
npm run dev

# ساخت پروژه برای production
npm run build

# اجرای پروژه در حالت production
npm start
```

پس از اجرای `npm run dev`، پروژه در آدرس [http://localhost:3000](http://localhost:3000) در دسترس خواهد بود.

## ساختار پروژه

```
src/
├── app/                    # صفحات و Layout اصلی
│   ├── layout.tsx         # Layout اصلی با RTL
│   ├── page.tsx           # صفحه اصلی (Home)
│   └── globals.css        # استایل‌های全局
├── components/            # کامپوننت‌ها
│   ├── header/           # Header و Navigation
│   ├── hero/             # بخش Hero
│   ├── portfolio/        # بخش نمونه‌کارها
│   ├── pricing/          # بخش قیمت‌گذاری
│   ├── faq/              # بخش سوالات متداول
│   ├── contact/          # بخش تماس
│   ├── navigation/       # Navigation helpers
│   └── shared/           # کامپوننت‌های مشترک
├── hooks/                # Custom Hooks
│   ├── useLenisScroll.ts
│   └── useIsomorphicLayoutEffect.ts
└── lib/
    └── content/
        └── fa.ts          # محتوای فارسی
```

## سفارشی‌سازی

### تغییر محتوا

تمام محتوای فارسی در فایل `src/lib/content/fa.ts` قرار دارد. می‌توانید:

- متن‌های Hero را تغییر دهید
- پروژه‌های نمونه‌کار را ویرایش یا اضافه کنید
- پکیج‌های قیمت‌گذاری را تغییر دهید
- سوالات FAQ را به‌روزرسانی کنید

### تغییر رنگ‌ها

رنگ‌های برند در `src/app/globals.css` در بخش `@theme` تعریف شده‌اند. می‌توانید مقادیر `--color-brand-*` را تغییر دهید.

### اضافه کردن فونت فارسی

برای اضافه کردن فونت فارسی (مثل Vazirmatn):

1. فونت را از Google Fonts یا فایل محلی اضافه کنید
2. در `src/app/layout.tsx` فونت را import کنید
3. در `src/app/globals.css` در بخش `--font-sans` فونت را اضافه کنید

### اضافه کردن تصاویر

تصاویر پروژه‌ها در حال حاضر از placeholder استفاده می‌کنند. برای اضافه کردن تصاویر واقعی:

1. تصاویر را در پوشه `public/portfolio/` قرار دهید
2. در `src/lib/content/fa.ts` مسیر تصاویر را به‌روزرسانی کنید

## کامپوننت‌های کلیدی

### MagneticButton

دکمه با افکت مغناطیسی که با حرکت موس جابه‌جا می‌شود:

```tsx
<MagneticButton onClick={handleClick} variant="primary">
  متن دکمه
</MagneticButton>
```

### ProjectRequestModal

Modal چندمرحله‌ای برای درخواست پروژه:

```tsx
<ProjectRequestModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
/>
```

### SectionWrapper

Wrapper برای بخش‌ها با انیمیشن ورود:

```tsx
<SectionWrapper id="section-id" className="py-24">
  محتوای بخش
</SectionWrapper>
```

## نکات مهم

- تمام متن‌ها به فارسی و RTL هستند
- انیمیشن‌ها با GSAP و Framer Motion پیاده‌سازی شده‌اند
- Smooth Scroll با Lenis فعال است
- فرم‌ها در حال حاضر فقط داده‌ها را console.log می‌کنند - باید با backend یکپارچه شوند

## مراحل بعدی

1. ✅ اضافه کردن فونت فارسی (Vazirmatn یا فونت سفارشی)
2. ✅ اضافه کردن تصاویر واقعی پروژه‌ها
3. ✅ یکپارچه‌سازی فرم‌ها با Backend API
4. ✅ اضافه کردن Analytics
5. ✅ بهینه‌سازی SEO
6. ✅ اضافه کردن زبان انگلیسی (i18n)

## لایسنس

این پروژه برای استفاده داخلی آریو استودیو ساخته شده است.
