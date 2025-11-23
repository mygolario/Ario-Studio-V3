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
    <footer className="bg-surface py-20 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Brand & Newsletter */}
          <div className="space-y-8">
            <div className="flex items-center gap-2 text-3xl font-bold tracking-tighter">
              <div className="w-8 h-8 bg-primary rounded-full" />
              Ariostudio
            </div>
            
            <div className="max-w-md">
              <h3 className="text-xl font-bold mb-6">{content.newsletter.heading}</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={content.newsletter.namePlaceholder}
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                />
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder={content.newsletter.emailPlaceholder}
                    className="flex-1 bg-background border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white text-background px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
                  >
                    {content.newsletter.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">Utility</h4>
              <ul className="space-y-4">
                {content.links.utility.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">Menu</h4>
              <ul className="space-y-4">
                {content.links.quick.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-gray-400 uppercase text-xs tracking-widest">Social</h4>
              <ul className="space-y-4">
                {content.socials.map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 Ariostudio. All rights reserved.</p>
          <p>Tehran, Iran</p>
        </div>
      </div>
    </footer>
  );
}
