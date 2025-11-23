import { Locale } from '@/config/i18n';

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="w-full py-8 px-8 border-t border-white/10 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Ario Studio. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
           {/* Social links placeholder */}
           <span>Instagram</span>
           <span>LinkedIn</span>
        </div>
      </div>
    </footer>
  );
}
