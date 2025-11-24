'use client';

import Link from 'next/link';

export default function Footer({ lang }: { lang: 'en' | 'fa' }) {
  const isFa = lang === 'fa';

  const content = {
    newsletter: {
      heading: isFa ? 'عضویت در خبرنامه‌ی آریو استودیو' : 'Subscribe to our newsletter',
      namePlaceholder: isFa ? 'نام شما' : 'Your Name',
      emailPlaceholder: isFa ? 'ایمیل شما' : 'Your Email',
      submit: isFa ? 'ارسال' : 'Submit',
    },
    links: {
      utility: isFa ? ['راهنمای استایل', 'لایسنس', 'تغییرات', 'محافظت شده', 'خطای 404'] : ['Style guide', 'License', 'Changelog', 'Password', '404 Error'],
      quick: isFa ? ['خانه', 'درباره ما', 'قیمت‌ها', 'بلاگ', 'تماس'] : ['Home', 'About', 'Pricing', 'Blog', 'Contact'],
    },
    socials: ['Dribbble', 'Behance', 'Instagram', 'X', 'LinkedIn'],
  };

  return (
    <footer className="bg-[#02020a] py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Brand & Newsletter */}
          <div className="space-y-8">
            <div className="flex flex-col gap-1">
              <span className="text-4xl font-bold tracking-tighter text-white">Ariostudio</span>
              <p className="text-sm text-gray-400">
                {isFa ? "خلاقیت را با هوش مصنوعی تقویت کنید" : "Empower creativity with AI"}
              </p>
            </div>
            
            <div className="max-w-md">
              <h3 className="text-lg font-bold mb-6 text-white">{content.newsletter.heading}</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={content.newsletter.namePlaceholder}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={content.newsletter.emailPlaceholder}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-white/30 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#02020a] px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                  >
                    {content.newsletter.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "ابزار" : "Utility"}
              </h4>
              <ul className="space-y-4">
                {content.links.utility.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "منو" : "Menu"}
              </h4>
              <ul className="space-y-4">
                {content.links.quick.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">
                {isFa ? "اجتماعی" : "Social"}
              </h4>
              <ul className="space-y-4">
                {content.socials.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Ariostudio. All rights reserved.</p>
          <p>{isFa ? "تهران، ایران" : "Tehran, Iran"}</p>
        </div>
      </div>
    </footer>
  );
}
