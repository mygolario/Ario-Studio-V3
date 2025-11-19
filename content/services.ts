/**
 * Ario Studio - Services Content
 * 
 * Centralized content data for all services.
 * This file contains the structured content for the 5 main services.
 * 
 * To add a new service:
 * 1. Add a new object to the services array below
 * 2. Ensure it has all required fields
 * 3. The service will be available through the content system
 */

import { type ServiceLevel } from '@/lib/content/types'

export type ServiceContent = {
  id: string
  slug: string
  level: ServiceLevel
  priceFromUsd: number
  durationEn: string
  durationFa: string
  en: {
    title: string
    shortLabel?: string
    summary: string
    suitableFor: string
  }
  fa: {
    title: string
    shortLabel?: string
    summary: string
    suitableFor: string
  }
}

export const services: ServiceContent[] = [
  {
    id: 'cinematic-landing',
    slug: 'cinematic-landing-pages',
    level: 'premium',
    priceFromUsd: 450,
    durationEn: '2–4 weeks',
    durationFa: '۲ تا ۴ هفته',
    en: {
      title: 'Cinematic Landing Pages',
      shortLabel: 'Cinematic Landing Pages',
      summary:
        'We design and build immersive, cinematic landing pages powered by modern animations, intelligent UX, and high-end visuals. Perfect for brands that want a web presence that feels alive — not just a static page.',
      suitableFor: 'Founders, creative brands, early-stage startups, personal brands.',
    },
    fa: {
      title: 'لندینگ‌پیج‌های سینمایی',
      shortLabel: 'لندینگ‌پیج سینمایی',
      summary:
        'ما لندینگ‌پیج‌هایی می‌سازیم که حس می‌شوند؛ روایت، حرکت، نور و UX حرفه‌ای کنار هم. یک صفحه‌ی زنده که برند را به شکل سینمایی معرفی می‌کند، نه یک صفحه‌ی خشک.',
      suitableFor: 'استارتاپ‌ها، برندهای خلاق، پیج‌های شخصی حرفه‌ای.',
    },
  },
  {
    id: 'studio-full-site',
    slug: 'studio-grade-websites',
    level: 'pro',
    priceFromUsd: 850,
    durationEn: '3–6 weeks',
    durationFa: '۳ تا ۶ هفته',
    en: {
      title: 'Studio-Grade Full Websites',
      shortLabel: 'Full Website',
      summary:
        'A complete multi-page website built with next-gen design, responsive layouts, and smooth cinematic motion. Ideal for businesses that want a modern, high-trust online identity.',
      suitableFor: 'Small businesses, service providers, growing teams.',
    },
    fa: {
      title: 'وب‌سایت کامل با سطح استودیو',
      shortLabel: 'وب‌سایت کامل',
      summary:
        'یک وب‌سایت کامل چندصفحه‌ای با طراحی نسل‌جدید، ریسپانسیو حرفه‌ای و حرکت‌های نرم سینمایی. مناسب بیزنس‌هایی که دنبال هویت آنلاین مدرن و قابل‌اعتماد هستند.',
      suitableFor: 'کسب‌وکارهای کوچک و متوسط، ارائه‌دهندگان خدمات، تیم‌های درحال رشد.',
    },
  },
  {
    id: 'ai-powered-sites',
    slug: 'ai-powered-websites',
    level: 'premium',
    priceFromUsd: 350,
    durationEn: '1–3 weeks',
    durationFa: '۱ تا ۳ هفته',
    en: {
      title: 'AI-Powered Websites',
      shortLabel: 'AI Web Systems',
      summary:
        'We integrate AI agents, automated systems, smart forms, lead capture flows, dashboards, and content automation into your site. Your website becomes a system that works for you, not just looks good.',
      suitableFor: 'SaaS, agencies, digital creators, tech startups.',
    },
    fa: {
      title: 'وب‌سایت‌های هوشمند با هوش مصنوعی',
      shortLabel: 'وب‌سایت هوشمند',
      summary:
        'هوش مصنوعی، اتوماسیون، فرم‌های هوشمند، داشبورد داده، ثبت لید و فلوهای خودکار را به وب‌سایت اضافه می‌کنیم. سایتی که فقط زیبا نیست؛ برایت کار هم می‌کند.',
      suitableFor: 'استارتاپ‌های تکنولوژی، آژانس‌ها، کرییتورهای دیجیتال.',
    },
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity-visual-system',
    level: 'starter',
    priceFromUsd: 300,
    durationEn: '2–3 weeks',
    durationFa: '۲ تا ۳ هفته',
    en: {
      title: 'Brand Identity & Visual System',
      shortLabel: 'Brand Identity',
      summary:
        'A complete visual identity system including logo design, typography, colors, motion direction, and a creative brand story. Perfect for founders who want a polished, modern creative identity.',
      suitableFor: 'Founders, creators, startups preparing to launch.',
    },
    fa: {
      title: 'هویت بصری و سیستم برند',
      shortLabel: 'هویت بصری',
      summary:
        'طراحی کامل هویت بصری شامل لوگو، تایپوگرافی، پالت رنگ، زبان بصری و روایت برند. مناسب فاوندرهایی که می‌خواهند یک هویت مدرن و حرفه‌ای داشته باشند.',
      suitableFor: 'فاوندرها، کرییتورها، استارتاپ‌هایی که درحال لانچ هستند.',
    },
  },
  {
    id: 'site-optimization-rebuild',
    slug: 'website-optimization-rebuild',
    level: 'pro',
    priceFromUsd: 250,
    durationEn: '1–2 weeks',
    durationFa: '۱ تا ۲ هفته',
    en: {
      title: 'Website Optimization & Rebuild',
      shortLabel: 'Optimization & Rebuild',
      summary:
        'We rebuild outdated or low-performance websites using modern frameworks, better UX, stronger visuals, and faster performance. A complete refresh that brings your site back to life.',
      suitableFor: 'Businesses with outdated sites, creators, freelancers.',
    },
    fa: {
      title: 'بهینه‌سازی و بازطراحی وب‌سایت',
      shortLabel: 'بازطراحی وب‌سایت',
      summary:
        'بازطراحی کامل وب‌سایت‌های قدیمی یا کند با استک مدرن، UX بهتر، ظاهری جذاب‌تر و سرعت بسیار بالاتر. یک نوسازی کامل برای جان دادن دوباره به وب‌سایت.',
      suitableFor: 'بیزنس‌هایی که سایت قدیمی دارند، فریلنسرها، کرییتورها.',
    },
  },
]

