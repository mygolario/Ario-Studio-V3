import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data (optional - comment out if you want to keep existing data)
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

