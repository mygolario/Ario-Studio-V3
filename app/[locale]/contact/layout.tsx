import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const isFa = locale === 'fa';
  
  return {
    title: isFa 
      ? "تماس با ما | آریو استودیو" 
      : "Contact Us | Ario Studio",
    description: isFa
      ? "با آریو استودیو تماس بگیرید و پروژه دیجیتال خود را شروع کنید. ما آماده خلق تجربه‌های سینمایی و آینده‌نگرانه برای برند شما هستیم."
      : "Get in touch with Ario Studio to start your digital project. We're ready to craft cinematic, future-ready experiences for your brand.",
    openGraph: {
      title: isFa 
        ? "تماس با ما | آریو استودیو" 
        : "Contact Us | Ario Studio",
      description: isFa
        ? "با آریو استودیو تماس بگیرید و پروژه دیجیتال خود را شروع کنید."
        : "Get in touch with Ario Studio to start your digital project.",
      url: `https://www.ariostudio.net/${locale}/contact`,
      type: "website",
      locale: isFa ? "fa_IR" : "en_US",
      siteName: isFa ? "آریو استودیو" : "Ario Studio",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: isFa ? "تماس با آریو استودیو" : "Contact Ario Studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isFa ? "تماس با ما | آریو استودیو" : "Contact Us | Ario Studio",
      description: isFa
        ? "با آریو استودیو تماس بگیرید و پروژه دیجیتال خود را شروع کنید."
        : "Get in touch with Ario Studio to start your digital project.",
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `https://www.ariostudio.net/${locale}/contact`,
      languages: {
        'en': 'https://www.ariostudio.net/en/contact',
        'fa': 'https://www.ariostudio.net/fa/contact',
        'x-default': 'https://www.ariostudio.net/en/contact',
      },
    },
  };
}

