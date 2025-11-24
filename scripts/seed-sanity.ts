/**
 * Seed script to populate Sanity with initial content based on the template
 * Run with: npx tsx scripts/seed-sanity.ts
 */

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'v3ydinkq',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function seedSanity() {
  try {
    console.log('🌱 Starting Sanity seed...')

    // 1. Create Home Page document
    const homePageDoc = {
      _type: 'homePage',
      hero: {
        taglineEn: 'CREATIVE AGENCY',
        headingEn: 'Not just a studio, we are Strategic',
        subtextEn: 'We are a full-service creative agency helping ambitious businesses turn ideas into impactful stories, designs, and digital experiences that connect with people.',
        taglineFa: 'استودیوی خلاق',
        headingFa: 'نه فقط یک استودیو، ما استراتژیک هستیم',
        subtextFa: 'ما یک آژانس خلاق تمام‌خدمات هستیم که به کسب‌وکارهای جاه‌طلب کمک می‌کنیم تا ایده‌ها را به داستان‌ها، طراحی‌ها و تجربیات دیجیتالی تأثیرگذار تبدیل کنند.',
      },
      intro: {
        descriptionEn: 'We are a full-service creative agency helping ambitious businesses turn ideas into impactful stories, designs, and digital experiences that connect with people.',
        descriptionFa: 'ما یک آژانس خلاق تمام‌خدمات هستیم که به کسب‌وکارهای جاه‌طلب کمک می‌کنیم تا ایده‌ها را به داستان‌ها، طراحی‌ها و تجربیات دیجیتالی تأثیرگذار تبدیل کنند.',
      },
      servicesPrimary: ['Branding', 'Photography', 'Animation', 'Design'],
      strengths: [
        {
          titleEn: 'Award winning agency',
          bodyEn: 'We design to global standards, even when the project is for a local business.',
          titleFa: 'آژانس برنده جایزه',
          bodyFa: 'ما با استانداردهای جهانی طراحی می‌کنیم، حتی زمانی که پروژه برای یک کسب‌وکار محلی است.',
        },
        {
          titleEn: 'Vision realized',
          bodyEn: 'From brand strategy to the last pixel on screen, everything follows a single, coherent direction.',
          titleFa: 'چشم‌انداز محقق شده',
          bodyFa: 'از استراتژی برند تا آخرین پیکسل روی صفحه، همه چیز از یک جهت واحد و منسجم پیروی می‌کند.',
        },
        {
          titleEn: 'Impactful design',
          bodyEn: "Designs that don't just look good, but guide user behavior and stay memorable.",
          titleFa: 'طراحی تأثیرگذار',
          bodyFa: 'طراحی‌هایی که نه تنها خوب به نظر می‌رسند، بلکه رفتار کاربر را هدایت می‌کنند و به یاد ماندنی می‌مانند.',
        },
      ],
      evolution: {
        headingEn: 'Evolution through design',
        paragraphEn: 'Our studio connects strategic thinking, experiential design, and AI to turn your brand into a living system that can grow, adapt, and scale.',
        headingFa: 'تکامل از طریق طراحی',
        paragraphFa: 'استودیوی ما تفکر استراتژیک، طراحی تجربی و هوش مصنوعی را به هم متصل می‌کند تا برند شما را به یک سیستم زنده تبدیل کند که می‌تواند رشد کند، سازگار شود و مقیاس‌پذیر باشد.',
      },
      servicesSecondary: [
        {
          title: '(01) Interactive design experiences',
          bodyEn: 'Creating immersive digital experiences that engage and convert.',
          bodyFa: 'ایجاد تجربیات دیجیتالی فراگیر که درگیر می‌کند و تبدیل می‌کند.',
        },
        {
          title: '(02) Motion graphics production',
          bodyEn: 'Bringing brands to life through dynamic animations and visual storytelling.',
          bodyFa: 'زنده کردن برندها از طریق انیمیشن‌های پویا و داستان‌سرایی بصری.',
        },
        {
          title: '(03) Website design development',
          bodyEn: 'Building robust, scalable, and high-performance web applications.',
          bodyFa: 'ساخت برنامه‌های وب قوی، مقیاس‌پذیر و با عملکرد بالا.',
        },
        {
          title: '(04) Digital marketing solutions',
          bodyEn: 'Strategic marketing campaigns that drive growth and engagement.',
          bodyFa: 'کمپین‌های بازاریابی استراتژیک که رشد و تعامل را به همراه دارد.',
        },
        {
          title: '(05) Packaging design innovation',
          bodyEn: 'Innovative packaging solutions that stand out on shelves.',
          bodyFa: 'راه‌حل‌های بسته‌بندی نوآورانه که در قفسه‌ها برجسته می‌شوند.',
        },
      ],
      identityHighlight: {
        headingEn: 'Designing impactful journeys for ambitious modern brands',
        paragraphEn: 'We create identities that are timeless, adaptable, and built to thrive across every platform.',
        headingFa: 'طراحی سفرهای تأثیرگذار برای برندهای مدرن جاه‌طلب',
        paragraphFa: 'ما هویت‌هایی ایجاد می‌کنیم که بی‌زمان، سازگار و برای رشد در هر پلتفرمی ساخته شده‌اند.',
      },
    }

    // Check if homePage already exists
    const existingHomePage = await client.fetch('*[_type == "homePage"][0]')
    
    if (existingHomePage) {
      console.log('📝 Updating existing Home Page...')
      await client
        .patch(existingHomePage._id)
        .set(homePageDoc)
        .commit()
    } else {
      console.log('✨ Creating new Home Page...')
      await client.create(homePageDoc)
    }

    // 2. Create Projects
    const projects = [
      {
        _type: 'project',
        title: 'Chromore',
        slug: { current: 'chromore' },
        year: '2024',
        shortDescriptionEn: 'Modern brand identity and digital experience',
        shortDescriptionFa: 'هویت برند مدرن و تجربه دیجیتالی',
      },
      {
        _type: 'project',
        title: 'Gareos',
        slug: { current: 'gareos' },
        year: '2024',
        shortDescriptionEn: 'Creative direction and visual design',
        shortDescriptionFa: 'جهت‌گیری خلاق و طراحی بصری',
      },
      {
        _type: 'project',
        title: 'Movtreh',
        slug: { current: 'movtreh' },
        year: '2024',
        shortDescriptionEn: 'Brand strategy and digital transformation',
        shortDescriptionFa: 'استراتژی برند و تحول دیجیتالی',
      },
      {
        _type: 'project',
        title: 'Fueltec',
        slug: { current: 'fueltec' },
        year: '2024',
        shortDescriptionEn: 'E-commerce platform and brand identity',
        shortDescriptionFa: 'پلتفرم تجارت الکترونیک و هویت برند',
      },
    ]

    console.log('🎨 Creating Projects...')
    for (const project of projects) {
      const existing = await client.fetch(
        `*[_type == "project" && slug.current == "${project.slug.current}"][0]`
      )
      
      if (existing) {
        await client
          .patch(existing._id)
          .set(project)
          .commit()
      } else {
        await client.create(project)
      }
    }

    // 3. Create Services
    const services = [
      {
        _type: 'service',
        titleEn: 'Branding identity',
        titleFa: 'هویت برندینگ',
        descriptionEn: 'Crafting memorable identities for modern digital brands.',
        descriptionFa: 'ایجاد هویت‌های به یاد ماندنی برای برندهای دیجیتال مدرن.',
      },
      {
        _type: 'service',
        titleEn: 'UI/UX design',
        titleFa: 'طراحی رابط کاربری',
        descriptionEn: 'Designing impactful journeys for ambitious modern brands.',
        descriptionFa: 'طراحی سفرهای تأثیرگذار برای برندهای مدرن جاه‌طلب.',
      },
      {
        _type: 'service',
        titleEn: 'Web development',
        titleFa: 'توسعه وب',
        descriptionEn: 'Building robust, scalable, and high-performance web applications.',
        descriptionFa: 'ساخت برنامه‌های وب قوی، مقیاس‌پذیر و با عملکرد بالا.',
      },
      {
        _type: 'service',
        titleEn: 'Visual design',
        titleFa: 'طراحی بصری',
        descriptionEn: 'Creating stunning visual assets that capture attention and drive engagement.',
        descriptionFa: 'ایجاد دارایی‌های بصری خیره‌کننده که توجه را جلب می‌کند و تعامل را افزایش می‌دهد.',
      },
    ]

    console.log('⚡ Creating Services...')
    for (const service of services) {
      const existing = await client.fetch(
        `*[_type == "service" && titleEn == "${service.titleEn}"][0]`
      )
      
      if (existing) {
        await client
          .patch(existing._id)
          .set(service)
          .commit()
      } else {
        await client.create(service)
      }
    }

    // 4. Update Home Page with portfolio references
    const allProjects = await client.fetch('*[_type == "project"]')
    if (allProjects.length > 0 && existingHomePage) {
      await client
        .patch(existingHomePage._id)
        .set({
          portfolioHighlight: allProjects.slice(0, 4).map((p: any) => ({
            _type: 'reference',
            _ref: p._id,
          })),
        })
        .commit()
    }

    console.log('✅ Seed completed successfully!')
    console.log(`📊 Created/Updated:`)
    console.log(`   - 1 Home Page`)
    console.log(`   - ${projects.length} Projects`)
    console.log(`   - ${services.length} Services`)
    
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

seedSanity()

