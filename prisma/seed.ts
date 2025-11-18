import { PrismaClient } from '@prisma/client'

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

  // Seed Services
  console.log('📦 Seeding Services...')
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: 'Design',
        slug: 'design',
        subtitle: 'Cinematic interfaces, premium aesthetics, and brand-first visuals.',
        pillLabel: 'Design',
        items: [
          'High-end landing pages and marketing sites',
          'Portfolio and studio websites with expressive visuals',
          'Brand-aligned UI systems with consistent components',
        ],
        order: 1,
      },
    }),
    prisma.service.create({
      data: {
        title: 'Build',
        slug: 'build',
        subtitle: 'Next.js engineering, performance-first architecture, and clean systems built for scale.',
        pillLabel: 'Build',
        items: [
          'Production-grade Next.js frontends',
          'Fast, responsive layouts optimized for modern devices',
          'Clean, maintainable codebases ready to grow',
        ],
        order: 2,
      },
    }),
    prisma.service.create({
      data: {
        title: 'Automate',
        slug: 'automate',
        subtitle: 'AI integration, workflow automation, and custom intelligent agents.',
        pillLabel: 'Automate',
        items: [
          'AI-powered chat and support experiences',
          'Automated workflows connecting tools and services',
          'Smart systems that reduce manual work',
        ],
        order: 3,
      },
    }),
  ])
  console.log(`✅ Created ${services.length} services`)

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
  
  // Portfolio Content: Ario Studio Case Study
  const portfolioContent = await prisma.content.create({
    data: {
      type: 'portfolio',
      slug: 'ario-studio-case-study',
      isPublished: true,
      featured: true,
      order: 1,
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Ario Studio — AI-Native Portfolio Website',
            subtitle: 'Cinematic UX meets modern engineering',
            excerpt: 'A comprehensive portfolio website featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system.',
            body: 'This portfolio website itself—an AI-native studio site featuring cinematic UX, GSAP-powered animations, and a polished Day/Night theme system. Built a comprehensive portfolio site with GSAP motion system, theme switching, structured case study pages, and a polished Start Project form.',
            metaTitle: 'Ario Studio Portfolio — AI-Native Web Design & Development',
            metaDescription: 'Explore Ario Studio\'s portfolio website featuring cinematic UX, GSAP animations, and modern Next.js architecture.',
            tags: ['Next.js', 'GSAP', 'AI-native', 'Motion Design', 'Portfolio'],
          },
          {
            lang: 'fa',
            title: 'آریو استودیو — وب‌سایت پورتفولیو مبتنی بر هوش مصنوعی',
            subtitle: 'تجربه کاربری سینمایی و مهندسی مدرن',
            excerpt: 'وب‌سایت پورتفولیوی جامع با تجربه کاربری سینمایی، انیمیشن‌های GSAP و سیستم تم روز/شب.',
            body: 'این وب‌سایت پورتفولیو خودش—یک سایت استودیوی مبتنی بر هوش مصنوعی با تجربه کاربری سینمایی، انیمیشن‌های GSAP و سیستم تم روز/شب. ساخت یک سایت پورتفولیوی جامع با سیستم موشن GSAP، تغییر تم، صفحات case study ساختاریافته و فرم Start Project.',
            metaTitle: 'پورتفولیو آریو استودیو — طراحی و توسعه وب مبتنی بر هوش مصنوعی',
            metaDescription: 'کاوش وب‌سایت پورتفولیو آریو استودیو با تجربه کاربری سینمایی، انیمیشن‌های GSAP و معماری مدرن Next.js.',
            tags: ['Next.js', 'GSAP', 'AI-native', 'طراحی موشن', 'پورتفولیو'],
          },
        ],
      },
    },
  })
  console.log(`✅ Created portfolio content: ${portfolioContent.slug}`)

  // Service Content: Cinematic Web Experiences
  const serviceContent1 = await prisma.content.create({
    data: {
      type: 'service',
      slug: 'cinematic-web-experiences',
      isPublished: true,
      featured: true,
      order: 1,
      translations: {
        create: [
          {
            lang: 'en',
            title: 'Cinematic Web Experiences',
            subtitle: 'High-end design, expressive motion, and brand-first visuals',
            excerpt: 'We design and build cinematic web experiences that captivate audiences and drive results.',
            body: 'From concept to launch, we combine visual storytelling, modern engineering, and AI automation to build experiences that feel alive. Our cinematic approach ensures every interaction is intentional, every animation serves a purpose, and every pixel contributes to the narrative.',
            metaTitle: 'Cinematic Web Experiences — Ario Studio',
            metaDescription: 'High-end web design and development with cinematic UX, expressive motion, and brand-first visuals.',
            tags: ['Design', 'Motion', 'UX', 'Brand'],
          },
          {
            lang: 'fa',
            title: 'تجربه‌های وب سینمایی',
            subtitle: 'طراحی سطح بالا، موشن بیانگر و تصاویر مبتنی بر برند',
            excerpt: 'ما تجربه‌های وب سینمایی طراحی و می‌سازیم که مخاطبان را جذب می‌کند و نتایج را به ارمغان می‌آورد.',
            body: 'از مفهوم تا راه‌اندازی، ما داستان‌سرایی بصری، مهندسی مدرن و اتوماسیون هوش مصنوعی را ترکیب می‌کنیم تا تجربیاتی بسازیم که زنده به نظر می‌رسند. رویکرد سینمایی ما اطمینان می‌دهد که هر تعامل هدفمند است، هر انیمیشن هدفی دارد و هر پیکسل به روایت کمک می‌کند.',
            metaTitle: 'تجربه‌های وب سینمایی — آریو استودیو',
            metaDescription: 'طراحی و توسعه وب سطح بالا با تجربه کاربری سینمایی، موشن بیانگر و تصاویر مبتنی بر برند.',
            tags: ['طراحی', 'موشن', 'UX', 'برند'],
          },
        ],
      },
    },
  })
  console.log(`✅ Created service content: ${serviceContent1.slug}`)

  // Service Content: AI-Powered Automation
  const serviceContent2 = await prisma.content.create({
    data: {
      type: 'service',
      slug: 'ai-powered-automation',
      isPublished: true,
      featured: true,
      order: 2,
      translations: {
        create: [
          {
            lang: 'en',
            title: 'AI-Powered Automation',
            subtitle: 'Intelligent systems that reduce manual work and amplify results',
            excerpt: 'We integrate AI into your workflows to automate repetitive tasks and create intelligent experiences.',
            body: 'From AI-powered chat experiences to automated workflows connecting tools and services, we build smart systems that reduce manual work and amplify results. Our AI-native approach ensures your systems are future-proof and ready for intelligent integration.',
            metaTitle: 'AI-Powered Automation — Ario Studio',
            metaDescription: 'Intelligent automation systems that reduce manual work and amplify business results.',
            tags: ['AI', 'Automation', 'Workflow', 'Integration'],
          },
          {
            lang: 'fa',
            title: 'اتوماسیون مبتنی بر هوش مصنوعی',
            subtitle: 'سیستم‌های هوشمند که کار دستی را کاهش می‌دهند و نتایج را تقویت می‌کنند',
            excerpt: 'ما هوش مصنوعی را در گردش کار شما ادغام می‌کنیم تا کارهای تکراری را خودکار کنیم و تجربیات هوشمند ایجاد کنیم.',
            body: 'از تجربیات چت مبتنی بر هوش مصنوعی تا گردش کارهای خودکار که ابزارها و سرویس‌ها را به هم متصل می‌کنند، ما سیستم‌های هوشمندی می‌سازیم که کار دستی را کاهش می‌دهند و نتایج را تقویت می‌کنند. رویکرد مبتنی بر هوش مصنوعی ما اطمینان می‌دهد که سیستم‌های شما آینده‌نگر هستند و برای ادغام هوشمند آماده‌اند.',
            metaTitle: 'اتوماسیون مبتنی بر هوش مصنوعی — آریو استودیو',
            metaDescription: 'سیستم‌های اتوماسیون هوشمند که کار دستی را کاهش می‌دهند و نتایج کسب‌وکار را تقویت می‌کنند.',
            tags: ['هوش مصنوعی', 'اتوماسیون', 'گردش کار', 'ادغام'],
          },
        ],
      },
    },
  })
  console.log(`✅ Created service content: ${serviceContent2.slug}`)

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

