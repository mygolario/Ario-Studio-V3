import Link from 'next/link';

interface IdentityHighlightProps {
  data: any;
  lang: 'en' | 'fa';
}

export default function IdentityHighlight({ data, lang }: IdentityHighlightProps) {
  const isFa = lang === 'fa';

  const content = {
    heading: isFa 
      ? "طراحی سفرهای تأثیرگذار برای برندهای جسور دیجیتال"
      : "Designing impactful journeys for ambitious modern brands.",
    paragraph: isFa
      ? "ما هویت‌هایی می‌سازیم که در همه‌ی نقاط تماس با کاربر، قابل تشخیص، سازگار و ماندگار باشند."
      : "We create identities that are timeless, adaptable, and built to thrive across every platform.",
    links: isFa
      ? ["استراتژی برند", "تحقیقات بازار"]
      : ["Brand strategy", "Market research"]
  };

  return (
    <section className="py-32 bg-white text-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Placeholder */}
          <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
             <div className="absolute bottom-8 left-8 text-white font-bold text-xl">
                Identity Visual
             </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <h2 className="text-5xl lg:text-6xl font-bold leading-tight">
              {content.heading}
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed">
              {content.paragraph}
            </p>
            
            <div className="space-y-4 pt-8 border-t border-gray-200">
               {content.links.map((link, i) => (
                 <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 group cursor-pointer">
                    <span className="text-lg font-bold">{link}</span>
                    <span className="transform transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2">↗</span>
                 </div>
               ))}
            </div>
            
            <div className="pt-8">
               <div className="text-8xl font-bold tracking-tighter">150+</div>
               <div className="text-sm text-gray-500 uppercase tracking-widest mt-2">Unique brand identities</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
