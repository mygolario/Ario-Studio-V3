"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © {currentYear} آریو استودیو. تمام حقوق محفوظ است.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-brand-400 transition-colors">
              حریم خصوصی
            </a>
            <a href="#" className="hover:text-brand-400 transition-colors">
              شرایط استفاده
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

