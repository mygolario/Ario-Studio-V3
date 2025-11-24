'use client';

import Link from 'next/link';

export default function Footer({ lang }: { lang: 'en' | 'fa' }) {
  const isFa = lang === 'fa';

  const content = {
    newsletter: {
      heading: isFa ? 'عضویت در خبرنامه' : 'Stay Updated',
      description: isFa 
        ? 'آخرین اخبار و به‌روزرسانی‌ها را دریافت کنید' 
        : 'Get the latest news and updates',
      namePlaceholder: isFa ? 'نام شما' : 'Your Name',
      emailPlaceholder: isFa ? 'ایمیل شما' : 'Your Email',
      submit: isFa ? 'ارسال' : 'Subscribe',
    },
    links: {
      utility: isFa 
        ? ['راهنمای استایل', 'لایسنس', 'تغییرات', 'خطای 404'] 
        : ['Style guide', 'License', 'Changelog', '404 Error'],
      quick: isFa 
        ? ['خانه', 'درباره ما', 'قیمت‌ها', 'بلاگ', 'تماس'] 
        : ['Home', 'About', 'Pricing', 'Blog', 'Contact'],
    },
    socials: [
      { name: 'Dribbble', icon: 'D' },
      { name: 'Behance', icon: 'B' },
      { name: 'Instagram', icon: 'I' },
      { name: 'X', icon: 'X' },
      { name: 'LinkedIn', icon: 'L' },
    ],
  };

  return (
    <footer className="bg-[#02020a] py-20 border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand & Newsletter - Takes 5 columns */}
          <div className="lg:col-span-5 space-y-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <span className="text-4xl font-bold tracking-tighter text-white">Ariostudio</span>
                <p className="text-sm text-gray-400 max-w-md">
                  {isFa 
                    ? "خلاقیت را با هوش مصنوعی تقویت کنید. ما به برندها کمک می‌کنیم تا تجربیات دیجیتالی تأثیرگذار بسازند."
                    : "Empower creativity with AI. We help brands build impactful digital experiences."
                  }
                </p>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-2 text-white">{content.newsletter.heading}</h3>
                <p className="text-sm text-gray-400 mb-4">{content.newsletter.description}</p>
              </div>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder={content.newsletter.namePlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={content.newsletter.emailPlaceholder}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all backdrop-blur-sm"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#02020a] px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-xl hover:shadow-white/20 hover:scale-105"
                  >
                    {content.newsletter.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links Grid - Takes 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-8 lg:gap-12">
            {/* Utility Links */}
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "ابزار" : "Utility"}
              </h4>
              <ul className="space-y-3">
                {content.links.utility.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                    >
                      <span>{item}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "منو" : "Menu"}
              </h4>
              <ul className="space-y-3">
                {content.links.quick.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                    >
                      <span>{item}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "اجتماعی" : "Social"}
              </h4>
              <ul className="space-y-3">
                {content.socials.map((item, i) => (
                  <li key={i}>
                    <Link 
                      href="#" 
                      className="text-gray-400 hover:text-white transition-colors text-sm group inline-flex items-center gap-2"
                    >
                      <span>{item.name}</span>
                      <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Address */}
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "آدرس" : "Address"}
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                {isFa 
                  ? "تهران، ایران\ninfo@ariostudio.net\n+98 21 1234 5678"
                  : "Tehran, Iran\ninfo@ariostudio.net\n+98 21 1234 5678"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ariostudio. {isFa ? 'تمام حقوق محفوظ است.' : 'All rights reserved.'}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p>{isFa ? "تهران، ایران" : "Tehran, Iran"}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
