'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'

// Content data (exact from HTML)
const content = {
  en: {
    nav: {
      services: 'Services',
      process: 'Process',
      work: 'Work',
      contact: 'Contact',
    },
    badge: 'AI-POWERED STUDIO',
    hero_title: 'The Future of Web Design',
    hero_description:
      'We build websites that inspire, engage, and convert. Combining cinematic design with cutting-edge AI technology to create unforgettable digital experiences.',
    cta_primary: "Let's Get Started",
    cta_secondary: 'View Our Work',
    stats: [
      { num: '150+', label: 'Projects Delivered' },
      { num: '98%', label: 'Client Satisfaction' },
      { num: '50+', label: 'Team Members' },
      { num: '24/7', label: 'Support Available' },
    ],
    services: {
      label: 'WHAT WE DO',
      title: 'Our Services',
      subtitle: 'Comprehensive digital solutions tailored to elevate your brand',
      items: [
        {
          icon: '🎨',
          title: 'Web Design',
          description:
            'Stunning, user-centric designs that capture your brand essence and engage your audience.',
          features: ['UI/UX Design', 'Brand Identity', 'Prototyping'],
        },
        {
          icon: '⚡',
          title: 'Development',
          description:
            'High-performance websites built with modern technologies for optimal speed and scalability.',
          features: ['Frontend & Backend', 'CMS Integration', 'E-commerce'],
        },
        {
          icon: '🤖',
          title: 'AI Integration',
          description:
            'Leverage cutting-edge AI to automate, personalize, and optimize your digital presence.',
          features: ['Chatbots', 'Personalization', 'Analytics'],
        },
      ],
    },
    process: {
      label: 'HOW WE WORK',
      title: 'Our Process',
      subtitle: 'A streamlined approach to bringing your vision to life',
      steps: [
        {
          title: 'Discovery & Research',
          description:
            'We dive deep into your business, goals, and audience to build a solid strategic foundation.',
        },
        {
          title: 'Design & Prototype',
          description:
            'Our designers create stunning visuals and interactive prototypes for your approval.',
        },
        {
          title: 'Development & Build',
          description:
            'We bring designs to life with clean, efficient code and cutting-edge technology.',
        },
        {
          title: 'Launch & Optimize',
          description:
            'We launch your project and continuously optimize for peak performance and results.',
        },
      ],
    },
    work: {
      label: 'RECENT WORK',
      title: 'Featured Projects',
      subtitle: 'Explore some of our latest and greatest work',
      items: [
        { title: 'FinTech Dashboard', category: 'Web Application' },
        { title: 'E-Commerce Platform', category: 'Online Store' },
        { title: 'SaaS Marketing Site', category: 'Landing Page' },
        { title: 'AI Chatbot Interface', category: 'AI Integration' },
      ],
    },
    cta: {
      title: 'Ready to Start Your Project?',
      subtitle: "Let's collaborate and create something extraordinary together",
      button: 'Get in Touch',
    },
    footer: {
      tagline: 'Empowering creativity with AI',
      services: {
        title: 'Services',
        links: ['Web Design', 'Development', 'AI Solutions', 'Branding'],
      },
      company: {
        title: 'Company',
        links: ['About Us', 'Careers', 'Blog', 'Contact'],
      },
      legal: {
        title: 'Legal',
        links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
      },
      copyright: '© 2024 Ario Studio. All rights reserved.',
    },
  },
  fa: {
    nav: {
      services: 'خدمات',
      process: 'فرآیند',
      work: 'نمونه کارها',
      contact: 'تماس',
    },
    badge: 'استودیو مبتنی بر هوش مصنوعی',
    hero_title: 'آینده طراحی وب',
    hero_description:
      'ما وب‌سایت‌هایی می‌سازیم که الهام‌بخش، جذاب و تبدیل‌کننده هستند. ترکیب طراحی سینمایی با فناوری پیشرفته هوش مصنوعی برای ایجاد تجربیات دیجیتال فراموش‌نشدنی.',
    cta_primary: 'بیایید شروع کنیم',
    cta_secondary: 'کارهای ما را ببینید',
    stats: [
      { num: '۱۵۰+', label: 'پروژه تحویل داده شده' },
      { num: '۹۸٪', label: 'رضایت مشتری' },
      { num: '۵۰+', label: 'اعضای تیم' },
      { num: '۲۴/۷', label: 'پشتیبانی در دسترس' },
    ],
    services: {
      label: 'کارهای ما',
      title: 'خدمات ما',
      subtitle: 'راه‌حل‌های دیجیتال جامع برای ارتقای برند شما',
      items: [
        {
          icon: '🎨',
          title: 'طراحی وب',
          description:
            'طراحی‌های خیره‌کننده و کاربرمحور که جوهره برند شما را به تصویر می‌کشند و مخاطبان را درگیر می‌کنند.',
          features: ['طراحی UI/UX', 'هویت برند', 'نمونه‌سازی'],
        },
        {
          icon: '⚡',
          title: 'توسعه وب',
          description:
            'وب‌سایت‌های با عملکرد بالا ساخته شده با فناوری‌های مدرن برای سرعت و مقیاس‌پذیری بهینه.',
          features: ['فرانت‌اند و بک‌اند', 'یکپارچگی CMS', 'تجارت الکترونیک'],
        },
        {
          icon: '🤖',
          title: 'یکپارچگی هوش مصنوعی',
          description:
            'از هوش مصنوعی پیشرفته برای خودکارسازی، شخصی‌سازی و بهینه‌سازی حضور دیجیتال خود استفاده کنید.',
          features: ['چت‌بات‌ها', 'شخصی‌سازی', 'تجزیه و تحلیل'],
        },
      ],
    },
    process: {
      label: 'نحوه کار ما',
      title: 'فرآیند ما',
      subtitle: 'رویکردی ساده برای زنده کردن دیدگاه شما',
      steps: [
        {
          title: 'کشف و تحقیق',
          description:
            'ما عمیقاً به کسب‌وکار، اهداف و مخاطبان شما می‌پردازیم تا یک پایه استراتژیک محکم بسازیم.',
        },
        {
          title: 'طراحی و نمونه‌سازی',
          description:
            'طراحان ما تصاویر خیره‌کننده و نمونه‌های تعاملی برای تایید شما ایجاد می‌کنند.',
        },
        {
          title: 'توسعه و ساخت',
          description:
            'ما طرح‌ها را با کد تمیز و کارآمد و فناوری پیشرفته زنده می‌کنیم.',
        },
        {
          title: 'راه‌اندازی و بهینه‌سازی',
          description:
            'ما پروژه شما را راه‌اندازی می‌کنیم و به طور مداوم برای عملکرد و نتایج بهینه بهینه‌سازی می‌کنیم.',
        },
      ],
    },
    work: {
      label: 'کارهای اخیر',
      title: 'پروژه‌های ویژه',
      subtitle: 'برخی از جدیدترین و بهترین کارهای ما را کاوش کنید',
      items: [
        { title: 'داشبورد فین‌تک', category: 'اپلیکیشن وب' },
        { title: 'پلتفرم تجارت الکترونیک', category: 'فروشگاه آنلاین' },
        { title: 'سایت بازاریابی SaaS', category: 'صفحه فرود' },
        { title: 'رابط چت‌بات هوش مصنوعی', category: 'یکپارچگی هوش مصنوعی' },
      ],
    },
    cta: {
      title: 'آماده شروع پروژه خود هستید؟',
      subtitle: 'بیایید همکاری کنیم و با هم چیزی فوق‌العاده بسازیم',
      button: 'با ما در تماس باشید',
    },
    footer: {
      tagline: 'خلاقیت را با هوش مصنوعی تقویت کنید',
      services: {
        title: 'خدمات',
        links: ['طراحی وب', 'توسعه', 'راه‌حل‌های هوش مصنوعی', 'برندسازی'],
      },
      company: {
        title: 'شرکت',
        links: ['درباره ما', 'فرصت‌های شغلی', 'وبلاگ', 'تماس'],
      },
      legal: {
        title: 'قانونی',
        links: ['سیاست حفظ حریم خصوصی', 'شرایط استفاده', 'سیاست کوکی'],
      },
      copyright: '© ۱۴۰۳ استودیو آریو. تمامی حقوق محفوظ است.',
    },
  },
}

export default function HomePageV2() {
  const { language, setLanguage } = useLanguage()
  const pathname = usePathname()
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const c = content[language]
  const localePrefix = language === 'en' ? '/en' : ''

  // Update document direction and body class
  useEffect(() => {
    document.documentElement.setAttribute('lang', language)
    document.documentElement.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr')
    document.body.setAttribute('dir', language === 'fa' ? 'rtl' : 'ltr')
    document.body.className = 'v2-dark'
  }, [language])

  // Nav scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.substring(1)
      const element = document.getElementById(id)
      if (element) {
        const headerHeight = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerHeight
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
      setIsMobileMenuOpen(false)
    }
  }

  // Language toggle
  const handleLanguageToggle = (lang: 'fa' | 'en') => {
    setLanguage(lang)
    const currentPath = pathname.startsWith('/en') ? pathname.substring(3) : pathname
    if (lang === 'en' && !pathname.startsWith('/en')) {
      router.push(`/en${currentPath}`)
    } else if (lang === 'fa' && pathname.startsWith('/en')) {
      router.push(currentPath || '/')
    }
  }

  return (
    <>
      {/* Animated Background */}
      <div className="animated-bg">
        <div className="bg-gradient"></div>
        <div className="bg-gradient"></div>
        <div className="bg-gradient"></div>
      </div>
      <div className="grid-pattern"></div>

      {/* Content Layer */}
      <div className="content-layer">
        {/* Navigation */}
        <nav className={`nav ${isScrolled ? 'scrolled' : ''}`} id="nav">
          <div className="container">
            <div className="nav-content">
              <Link href={localePrefix || '/'} className="nav-logo">
                ARIO
              </Link>
              <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
                <li>
                  <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')}>
                    {c.nav.services}
                  </a>
                </li>
                <li>
                  <a href="#process" onClick={(e) => handleAnchorClick(e, '#process')}>
                    {c.nav.process}
                  </a>
                </li>
                <li>
                  <a href="#work" onClick={(e) => handleAnchorClick(e, '#work')}>
                    {c.nav.work}
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')}>
                    {c.nav.contact}
                  </a>
                </li>
              </ul>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="lang-switch">
                  <button
                    className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                    onClick={() => handleLanguageToggle('en')}
                  >
                    EN
                  </button>
                  <button
                    className={`lang-btn ${language === 'fa' ? 'active' : ''}`}
                    onClick={() => handleLanguageToggle('fa')}
                  >
                    FA
                  </button>
                </div>
                <button
                  className="mobile-toggle"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  ☰
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <div className="hero-badge">
                  <div className="badge-dot"></div>
                  <span>{c.badge}</span>
                </div>
                <h1 className="hero-title">
                  {language === 'en' ? (
                    <>
                      The <span className="gradient-text">Future</span> of{' '}
                      <span className="gradient-text">Web Design</span>
                    </>
                  ) : (
                    <>
                      <span className="gradient-text">آینده</span> طراحی{' '}
                      <span className="gradient-text">وب</span>
                    </>
                  )}
                </h1>
                <p className="hero-description">{c.hero_description}</p>
                <div className="hero-ctas">
                  <a
                    href="#contact"
                    className="btn btn-primary"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                  >
                    <span>{c.cta_primary}</span>
                    <span>→</span>
                  </a>
                  <a
                    href="#work"
                    className="btn btn-secondary"
                    onClick={(e) => handleAnchorClick(e, '#work')}
                  >
                    <span>{c.cta_secondary}</span>
                  </a>
                </div>
              </div>
              <div className="hero-visual">
                <div className="card-stack">
                  <div className="floating-card card-1">
                    <div className="card-icon">🎨</div>
                    <h3 className="card-title">
                      {language === 'en' ? 'Design' : 'طراحی'}
                    </h3>
                    <p className="card-text">
                      {language === 'en'
                        ? 'Stunning visuals that captivate'
                        : 'تصاویر خیره‌کننده که جذاب می‌کنند'}
                    </p>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-icon">⚡</div>
                    <h3 className="card-title">
                      {language === 'en' ? 'Build' : 'ساخت'}
                    </h3>
                    <p className="card-text">
                      {language === 'en'
                        ? 'High-performance solutions'
                        : 'راه‌حل‌های با عملکرد بالا'}
                    </p>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-icon">🤖</div>
                    <h3 className="card-title">
                      {language === 'en' ? 'Automate' : 'خودکارسازی'}
                    </h3>
                    <p className="card-text">
                      {language === 'en'
                        ? 'AI-powered experiences'
                        : 'تجربیات مبتنی بر هوش مصنوعی'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats">
          <div className="container">
            <div className="stats-grid">
              {c.stats.map((stat, i) => (
                <div key={i} className="stat-item">
                  <div className="stat-number">{stat.num}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-header">
              <div className="section-label">{c.services.label}</div>
              <h2 className="section-title">{c.services.title}</h2>
              <p className="section-subtitle">{c.services.subtitle}</p>
            </div>
            <div className="services-grid">
              {c.services.items.map((service, i) => (
                <div key={i} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className="service-link"
                    onClick={(e) => handleAnchorClick(e, '#contact')}
                  >
                    {language === 'en' ? 'Learn More →' : 'بیشتر بدانید →'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="section" id="process">
          <div className="container">
            <div className="section-header">
              <div className="section-label">{c.process.label}</div>
              <h2 className="section-title">{c.process.title}</h2>
              <p className="section-subtitle">{c.process.subtitle}</p>
            </div>
            <div className="process-container">
              <div className="process-steps">
                {c.process.steps.map((step, i) => (
                  <div key={i} className="process-step">
                    <div className="step-number">{i + 1}</div>
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-description">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section className="showcase" id="work">
          <div className="container">
            <div className="section-header">
              <div className="section-label">{c.work.label}</div>
              <h2 className="section-title">{c.work.title}</h2>
              <p className="section-subtitle">{c.work.subtitle}</p>
            </div>
            <div className="showcase-grid">
              {c.work.items.map((item, i) => (
                <div key={i} className="showcase-item">
                  <div className="showcase-overlay">
                    <h3 className="showcase-title">{item.title}</h3>
                    <div className="showcase-category">{item.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta" id="contact">
          <div className="container">
            <div className="cta-container">
              <div className="cta-content">
                <h2 className="cta-title">{c.cta.title}</h2>
                <p className="cta-subtitle">{c.cta.subtitle}</p>
                <Link href={localePrefix + '/start-project'} className="cta-button">
                  <span>{c.cta.button}</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div>
                <div className="footer-brand">ARIO</div>
                <p className="footer-tagline">{c.footer.tagline}</p>
                <div className="footer-social">
                  <a href="#" className="social-link" aria-label="Twitter">
                    𝕏
                  </a>
                  <a href="#" className="social-link" aria-label="LinkedIn">
                    in
                  </a>
                  <a href="#" className="social-link" aria-label="Instagram">
                    📷
                  </a>
                  <a href="#" className="social-link" aria-label="Dribbble">
                    🏀
                  </a>
                </div>
              </div>
              <div>
                <h4 className="footer-title">{c.footer.services.title}</h4>
                <ul className="footer-links">
                  {c.footer.services.links.map((link, i) => (
                    <li key={i}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="footer-title">{c.footer.company.title}</h4>
                <ul className="footer-links">
                  {c.footer.company.links.map((link, i) => (
                    <li key={i}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="footer-title">{c.footer.legal.title}</h4>
                <ul className="footer-links">
                  {c.footer.legal.links.map((link, i) => (
                    <li key={i}>
                      <a href="#">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>{c.footer.copyright}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
