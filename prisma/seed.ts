import { PrismaClient } from '@prisma/client'
import { services } from '../content/services'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data (optional - comment out if you want to keep existing data)
  await prisma.contentTranslation.deleteMany()
  await prisma.content.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.highlight.deleteMany()
  await prisma.processStep.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()

  // Old Services model seeding removed - now using Content model with services from content/services.ts

  // Seed Process Steps
  console.log('🔄 Seeding Process Steps...')
  const processSteps = await Promise.all([
    prisma.processStep.create({
      data: {
        title: 'Discovery',
        description: 'Understanding goals, audience, and brand direction.',
        order: 1,
      },
    }),
    prisma.processStep.create({
      data: {
        title: 'Design',
        description: 'Crafting cinematic visuals, systems, and user flows.',
        order: 2,
      },
    }),
    prisma.processStep.create({
      data: {
        title: 'Build',
        description: 'Developing performance-first, scalable interfaces.',
        order: 3,
      },
    }),
    prisma.processStep.create({
      data: {
        title: 'Optimize',
        description: 'Refining visuals, interactions and speed for a polished experience.',
        order: 4,
      },
    }),
    prisma.processStep.create({
      data: {
        title: 'Automate',
        description: 'Adding AI-driven systems to reduce manual work and amplify results.',
        order: 5,
      },
    }),
  ])
  console.log(`✅ Created ${processSteps.length} process steps`)

  // Seed Highlights (About/Philosophy)
  console.log('⭐ Seeding Highlights...')
  const highlights = await Promise.all([
    prisma.highlight.create({
      data: {
        title: 'Attention to detail',
        description: null,
        type: 'about',
        order: 1,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'High-end design sensibility',
        description: null,
        type: 'about',
        order: 2,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'Modern, scalable architecture',
        description: null,
        type: 'about',
        order: 3,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'AI-first problem solving',
        description: null,
        type: 'about',
        order: 4,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'Clear timelines & communication',
        description: 'Structured workflow with regular updates and transparent milestones.',
        type: 'trust',
        order: 1,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'Production-ready Next.js architecture',
        description: 'Robust, scalable, and maintainable codebases for long-term value.',
        type: 'trust',
        order: 2,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'Cinematic UX & motion-first design',
        description: 'Engaging and memorable user experiences that stand out.',
        type: 'trust',
        order: 3,
      },
    }),
    prisma.highlight.create({
      data: {
        title: 'AI-native workflows & automation in mind',
        description: 'Future-proof solutions designed for intelligent integration.',
        type: 'trust',
        order: 4,
      },
    }),
  ])
  console.log(`✅ Created ${highlights.length} highlights`)

  // Seed Projects
  console.log('🎨 Seeding Projects...')
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Ario Account',
        slug: 'ario-account',
        shortDescription: 'Digital marketplace for gaming and AI accounts with automated order handling',
        longDescription:
          'A digital marketplace platform for selling gaming and AI accounts with fully automated order processing and delivery. Built a Next.js-based marketplace with automated order handling, AI-powered account verification, and a clean, conversion-focused UX.',
        tags: ['Next.js', 'E-commerce', 'Automation', 'AI'],
        role: 'Design & Build',
        isFeatured: true,
        order: 1,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Ario Gold',
        slug: 'ario-gold',
        shortDescription: 'Concept MVP for online gold purchase experience with clean UX and modern UI',
        longDescription:
          'A concept MVP for an online gold purchase experience featuring clean UX, modern UI, and streamlined checkout process. Designed and built a modern MVP with focus on clarity, trust signals, and simplified purchase flow using Next.js and Tailwind CSS.',
        tags: ['Next.js', 'E-commerce', 'UI/UX', 'MVP'],
        role: 'Design & Frontend',
        isFeatured: true,
        order: 2,
      },
    }),
    prisma.project.create({
      data: {
        title: 'Ario Studio',
        slug: 'ario-studio',
        shortDescription: 'AI-native studio website with cinematic UX and motion-first design',
        longDescription:
          'This portfolio website itself—an AI-native studio site featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system. Built a comprehensive portfolio site with GSAP motion system, theme switching, structured case study pages, and a polished Start Project form.',
        tags: ['Next.js', 'GSAP', 'AI-native', 'Motion Design'],
        role: 'Design & Build',
        isFeatured: true,
        order: 3,
      },
    }),
  ])
  console.log(`✅ Created ${projects.length} projects`)

  // Seed Multilingual Content
  console.log('🌍 Seeding Multilingual Content...')
  
  // Portfolio Content: Ario Studio Case Study (with full Case Study fields)
  const portfolioContent = await prisma.content.create({
    data: {
      type: 'portfolio',
      slug: 'ario-studio-case-study',
      isPublished: true,
      featured: true,
      order: 1,
      layoutType: 'cinematic',
      category: 'full-site',
      tags: 'Next.js,GSAP,AI-native,Motion Design,Portfolio,Live',
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Ario Studio — AI-Native Portfolio Website',
            subtitle: 'Cinematic UX meets modern engineering',
            excerpt: 'A comprehensive portfolio website featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system.',
            body: 'This portfolio website itself—an AI-native studio site featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system.',
            bodyIntro: 'This portfolio website itself—an AI-native studio site featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system. Built a comprehensive portfolio site with GSAP motion system, theme switching, structured case study pages, and a polished Start Project form.',
            bodyProblem: 'Creating a portfolio website that stands out in a crowded market while maintaining professional standards and showcasing our unique approach to design and development.',
            bodySolution: 'We designed and built a cinematic, motion-first website using Next.js, GSAP animations, and a sophisticated theme system. The site features structured case study pages, multilingual support, and a polished contact form.',
            bodyProcess: 'The development process involved: 1) Discovery and design system creation, 2) GSAP animation implementation, 3) Theme system development, 4) Case study template creation, 5) Multilingual content integration, 6) Performance optimization.',
            bodyResult: 'The result is a stunning portfolio website that effectively showcases our work, attracts high-quality clients, and demonstrates our technical and creative capabilities. The site has received positive feedback and has become a key tool in our business development.',
            metaTitle: 'Ario Studio Portfolio — AI-Native Web Design & Development',
            metaDescription: 'Explore Ario Studio\'s portfolio website featuring cinematic UX, GSAP animations, and modern Next.js architecture.',
            tags: ['Next.js', 'GSAP', 'AI-native', 'Motion Design', 'Portfolio', 'Live'],
            featuredImage: '/images/case-studies/ario-studio-hero.jpg',
            galleryImages: [
              '/images/case-studies/ario-studio-1.jpg',
              '/images/case-studies/ario-studio-2.jpg',
              '/images/case-studies/ario-studio-3.jpg',
              '/images/case-studies/ario-studio-4.jpg',
              '/images/case-studies/ario-studio-5.jpg',
              '/images/case-studies/ario-studio-6.jpg',
            ],
          },
          {
            lang: 'fa',
            title: 'آریو استودیو — وب‌سایت پورتفولیو مبتنی بر هوش مصنوعی',
            subtitle: 'تجربه کاربری سینمایی و مهندسی مدرن',
            excerpt: 'وب‌سایت پورتفولیوی جامع با تجربه کاربری سینمایی، انیمیشن‌های GSAP و سیستم تم روز/شب.',
            body: 'این وب‌سایت پورتفولیو خودش—یک سایت استودیوی مبتنی بر هوش مصنوعی با تجربه کاربری سینمایی، انیمیشن‌های GSAP و سیستم تم روز/شب.',
            bodyIntro: 'این وب‌سایت پورتفولیو خودش—یک سایت استودیوی مبتنی بر هوش مصنوعی با تجربه کاربری سینمایی، انیمیشن‌های GSAP و سیستم تم روز/شب. ساخت یک سایت پورتفولیوی جامع با سیستم موشن GSAP، تغییر تم، صفحات case study ساختاریافته و فرم Start Project.',
            bodyProblem: 'ایجاد یک وب‌سایت پورتفولیو که در بازار شلوغ متمایز باشد و در عین حال استانداردهای حرفه‌ای را حفظ کند و رویکرد منحصر به فرد ما به طراحی و توسعه را به نمایش بگذارد.',
            bodySolution: 'ما یک وب‌سایت سینمایی و موشن-فرست با استفاده از Next.js، انیمیشن‌های GSAP و یک سیستم تم پیچیده طراحی و ساختیم. این سایت شامل صفحات case study ساختاریافته، پشتیبانی چندزبانه و یک فرم تماس پولیش شده است.',
            bodyProcess: 'فرآیند توسعه شامل: 1) کشف و ایجاد سیستم طراحی، 2) پیاده‌سازی انیمیشن GSAP، 3) توسعه سیستم تم، 4) ایجاد قالب case study، 5) یکپارچه‌سازی محتوای چندزبانه، 6) بهینه‌سازی عملکرد.',
            bodyResult: 'نتیجه یک وب‌سایت پورتفولیوی خیره‌کننده است که به طور مؤثر کار ما را به نمایش می‌گذارد، مشتریان با کیفیت بالا را جذب می‌کند و قابلیت‌های فنی و خلاقانه ما را نشان می‌دهد. این سایت بازخورد مثبت دریافت کرده و به یک ابزار کلیدی در توسعه کسب‌وکار ما تبدیل شده است.',
            metaTitle: 'پورتفولیو آریو استودیو — طراحی و توسعه وب مبتنی بر هوش مصنوعی',
            metaDescription: 'کاوش وب‌سایت پورتفولیو آریو استودیو با تجربه کاربری سینمایی، انیمیشن‌های GSAP و معماری مدرن Next.js.',
            tags: ['Next.js', 'GSAP', 'AI-native', 'طراحی موشن', 'پورتفولیو', 'فعال'],
            featuredImage: '/images/case-studies/ario-studio-hero.jpg',
            galleryImages: [
              '/images/case-studies/ario-studio-1.jpg',
              '/images/case-studies/ario-studio-2.jpg',
              '/images/case-studies/ario-studio-3.jpg',
              '/images/case-studies/ario-studio-4.jpg',
              '/images/case-studies/ario-studio-5.jpg',
              '/images/case-studies/ario-studio-6.jpg',
            ],
          },
        ],
      },
    },
  })
  console.log(`✅ Created portfolio content: ${portfolioContent.slug}`)

  // Portfolio Content: Sample Cinematic Landing Page (Mock Case Study)
  const portfolioContent2 = await prisma.content.create({
    data: {
      type: 'portfolio',
      slug: 'sample-cinematic-landing',
      isPublished: true,
      featured: true,
      order: 2,
      layoutType: 'split',
      category: 'landing-page',
      tags: 'Next.js,Tailwind CSS,Motion Design,Landing Page,Concept',
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Sample Cinematic Landing Page',
            subtitle: 'Premium design meets high-performance engineering',
            excerpt: 'A stunning landing page showcasing cinematic design principles and modern web technologies.',
            bodyIntro: 'This project demonstrates our approach to creating premium landing pages that combine cinematic visuals with high-performance engineering. The result is a fast, beautiful, and conversion-optimized experience.',
            bodyProblem: 'The client needed a landing page that would stand out in a competitive market, load quickly, and convert visitors into customers effectively.',
            bodySolution: 'We created a cinematic landing page using Next.js, Tailwind CSS, and custom animations. The design emphasizes visual storytelling while maintaining fast load times and excellent SEO.',
            bodyProcess: 'Our process included: 1) Brand discovery and visual direction, 2) Wireframing and design system creation, 3) Animation planning, 4) Development with Next.js, 5) Performance optimization, 6) SEO implementation.',
            bodyResult: 'The landing page achieved a 95+ Lighthouse score, reduced bounce rate by 40%, and increased conversion rate by 25%. The client was extremely satisfied with both the design and performance.',
            metaTitle: 'Sample Cinematic Landing Page — Premium Web Design',
            metaDescription: 'Explore this stunning cinematic landing page featuring premium design and high-performance engineering.',
            tags: ['Next.js', 'Tailwind CSS', 'Motion Design', 'Landing Page', 'Concept'],
            featuredImage: '/images/case-studies/sample-landing-hero.jpg',
            galleryImages: [
              '/images/case-studies/sample-landing-1.jpg',
              '/images/case-studies/sample-landing-2.jpg',
              '/images/case-studies/sample-landing-3.jpg',
            ],
          },
          {
            lang: 'fa',
            title: 'صفحه فرود سینمایی نمونه',
            subtitle: 'طراحی پریمیوم و مهندسی با عملکرد بالا',
            excerpt: 'یک صفحه فرود خیره‌کننده که اصول طراحی سینمایی و فناوری‌های وب مدرن را به نمایش می‌گذارد.',
            bodyIntro: 'این پروژه رویکرد ما را برای ایجاد صفحات فرود پریمیوم که تصاویر سینمایی را با مهندسی با عملکرد بالا ترکیب می‌کنند، نشان می‌دهد. نتیجه یک تجربه سریع، زیبا و بهینه‌شده برای تبدیل است.',
            bodyProblem: 'مشتری به یک صفحه فرود نیاز داشت که در بازار رقابتی متمایز باشد، به سرعت بارگذاری شود و بازدیدکنندگان را به طور مؤثر به مشتری تبدیل کند.',
            bodySolution: 'ما یک صفحه فرود سینمایی با استفاده از Next.js، Tailwind CSS و انیمیشن‌های سفارشی ایجاد کردیم. طراحی بر داستان‌سرایی بصری تأکید می‌کند در حالی که زمان بارگذاری سریع و SEO عالی را حفظ می‌کند.',
            bodyProcess: 'فرآیند ما شامل: 1) کشف برند و جهت بصری، 2) وایرفریم و ایجاد سیستم طراحی، 3) برنامه‌ریزی انیمیشن، 4) توسعه با Next.js، 5) بهینه‌سازی عملکرد، 6) پیاده‌سازی SEO.',
            bodyResult: 'صفحه فرود به نمره 95+ Lighthouse دست یافت، نرخ پرش را 40% کاهش داد و نرخ تبدیل را 25% افزایش داد. مشتری از هر دو طراحی و عملکرد بسیار راضی بود.',
            metaTitle: 'صفحه فرود سینمایی نمونه — طراحی وب پریمیوم',
            metaDescription: 'کاوش این صفحه فرود سینمایی خیره‌کننده با طراحی پریمیوم و مهندسی با عملکرد بالا.',
            tags: ['Next.js', 'Tailwind CSS', 'طراحی موشن', 'صفحه فرود', 'کانسپت'],
            featuredImage: '/images/case-studies/sample-landing-hero.jpg',
            galleryImages: [
              '/images/case-studies/sample-landing-1.jpg',
              '/images/case-studies/sample-landing-2.jpg',
              '/images/case-studies/sample-landing-3.jpg',
            ],
          },
        ],
      },
    },
  })
  console.log(`✅ Created portfolio content: ${portfolioContent2.slug}`)

  // Seed Services from content/services.ts
  console.log('📦 Seeding Services from content/services.ts...')
  const serviceContents = await Promise.all(
    services.map((service, index) =>
      prisma.content.create({
        data: {
          type: 'service',
          slug: service.slug,
          isPublished: true,
          featured: true,
          order: index + 1,
          servicePriceFrom: service.priceFromUsd,
          serviceCurrency: 'USD',
          // Store duration in a format that can be localized in UI
          // Format: "2-4|۲ تا ۴" where first part is EN, second is FA
          serviceDuration: `${service.durationEn}|${service.durationFa}`,
          serviceLevel: service.level,
          translations: {
            create: [
              {
                lang: 'en',
                title: service.en.title,
                subtitle: service.en.shortLabel || service.en.title,
                excerpt: service.en.summary,
                body: `${service.en.summary}\n\nSuitable for: ${service.en.suitableFor}`,
                metaTitle: `${service.en.title} — Ario Studio`,
                metaDescription: service.en.summary,
                tags: service.en.suitableFor.split(',').map((s) => s.trim()),
              },
              {
                lang: 'fa',
                title: service.fa.title,
                subtitle: service.fa.shortLabel || service.fa.title,
                excerpt: service.fa.summary,
                body: `${service.fa.summary}\n\nمناسب برای: ${service.fa.suitableFor}`,
                metaTitle: `${service.fa.title} — آریو استودیو`,
                metaDescription: service.fa.summary,
                tags: service.fa.suitableFor.split('،').map((s) => s.trim()),
              },
            ],
          },
        },
      })
    )
  )
  console.log(`✅ Created ${serviceContents.length} service contents`)

  // Blog Content: Example (placeholder)
  const blogContent = await prisma.content.create({
    data: {
      type: 'blog',
      slug: 'introduction-to-cinematic-ux',
      isPublished: false, // Draft for now
      featured: false,
      order: 1,
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Introduction to Cinematic UX',
            subtitle: 'Designing experiences that feel alive',
            excerpt: 'An exploration of cinematic UX principles and how they can transform web experiences.',
            body: 'Cinematic UX is about creating web experiences that feel alive, intentional, and memorable. In this article, we explore the principles behind cinematic design and how they can transform your web presence.',
            metaTitle: 'Introduction to Cinematic UX — Ario Studio Blog',
            metaDescription: 'Learn about cinematic UX principles and how they can transform web experiences.',
            tags: ['UX', 'Design', 'Motion', 'Web'],
          },
          {
            lang: 'fa',
            title: 'مقدمه‌ای بر تجربه کاربری سینمایی',
            subtitle: 'طراحی تجربیاتی که زنده به نظر می‌رسند',
            excerpt: 'کاوشی در اصول تجربه کاربری سینمایی و چگونگی تبدیل تجربیات وب.',
            body: 'تجربه کاربری سینمایی درباره ایجاد تجربیات وب است که زنده، هدفمند و به یاد ماندنی به نظر می‌رسند. در این مقاله، ما اصول پشت طراحی سینمایی و چگونگی تبدیل حضور وب شما را بررسی می‌کنیم.',
            metaTitle: 'مقدمه‌ای بر تجربه کاربری سینمایی — بلاگ آریو استودیو',
            metaDescription: 'درباره اصول تجربه کاربری سینمایی و چگونگی تبدیل تجربیات وب بیاموزید.',
            tags: ['UX', 'طراحی', 'موشن', 'وب'],
          },
        ],
      },
    },
  })
  console.log(`✅ Created blog content: ${blogContent.slug} (draft)`)

  console.log('✨ Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

