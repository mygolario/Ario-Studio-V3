import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface LandingPageProps {
  data: any;
  lang: "en" | "fa";
}

interface ProjectItem {
  title: string;
  year: string;
  slug: string;
  image: string | null;
}

const SectionBadge = ({ label }: { label: string }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
    <span className="text-[11px] tracking-[0.3em] uppercase text-gray-300 font-semibold">
      {label}
    </span>
  </div>
);

export default function LandingPage({ data, lang }: LandingPageProps) {
  const isFa = lang === "fa";
  const direction = isFa ? "rtl" : "ltr";

  const heroContent = {
    tagline: isFa ? "آژانس هوش خلاق" : "Cognitive Design Studio",
    heading: isFa
      ? "طراحی تجربه‌های لوکس با قدرت هوش مصنوعی"
      : "Crafting Luxury Digital Worlds Powered by AI",
    subheading: isFa
      ? "آریو استودیو با ترکیب زیبایی‌شناسی پرجزئیات و سیستم‌های هوش مصنوعی سفارشی، تجربه‌هایی خلق می‌کند که در ذهن مخاطب حک می‌شوند."
      : "Ariostudio merges meticulous aesthetics with bespoke AI systems to build memorable, high-performance experiences for visionary brands.",
    primaryCta: isFa ? "رزرو جلسه" : "Book a Session",
    secondaryCta: isFa ? "مشاهده پکیج‌ها" : "Explore Services",
  };

  const services = [
    {
      label: isFa ? "طراحی هویت ۳۶۰" : "360° Identity Systems",
      desc: isFa
        ? "طراحی برند، زبان بصری و دارایی‌های متحرک مختص برندهای لوکس."
        : "Signature brand systems, kinetic identities, and bespoke motion packages.",
    },
    {
      label: isFa ? "تجربه وب هوشمند" : "Intelligent Web Experiences",
      desc: isFa
        ? "وب‌سایت‌های نسل جدید با هوش مصنوعی ادغام‌شده، شخصی‌سازی و اتوماسیون."
        : "Next-gen web platforms with embedded AI assistants, personalization, and automation.",
    },
    {
      label: isFa ? "موتور AI اختصاصی" : "Private AI Orchestration",
      desc: isFa
        ? "طراحی و استقرار مدل‌های AI سفارشی برای تیم‌های محصول و مارکتینگ."
        : "Designing and deploying private AI models for product and marketing teams.",
    },
    {
      label: isFa ? "لانچ محتوا و کمپین" : "Campaign & Content Lab",
      desc: isFa
        ? "تولید روایت‌های سینماتیک، سناریوهای تعاملی و کمپین‌های دیتامحور."
        : "Cinematic storytelling, interactive previews, and data-rich launch campaigns.",
    },
  ];

  const aiSuite = [
    {
      title: isFa ? "Cerebro OS" : "Cerebro OS",
      detail: isFa
        ? "داشبورد مرکزی برای مشاهده KPI، رفتار مخاطب و سیگنال‌های برند."
        : "Central intelligence dashboard for KPI, sentiment, and brand signal monitoring.",
    },
    {
      title: isFa ? "Atlas Engine" : "Atlas Engine",
      detail: isFa
        ? "موتور پیشنهاد هوشمند برای محتوا، UI state و مسیر مشتری."
        : "An AI recommendations engine for content, UI states, and customer journeys.",
    },
    {
      title: isFa ? "NOVA Compositor" : "NOVA Compositor",
      detail: isFa
        ? "سیستم تولید دارایی‌های بصری و موشن با کنترل دقیق سبک."
        : "Visual + motion generation system with fine-grained style controls.",
    },
  ];

  const projectsFromCMS = data?.portfolioHighlight || [];
  const projects: ProjectItem[] =
    projectsFromCMS.length > 0
      ? projectsFromCMS.map((p: any) => ({
          title: p.title || "Project",
          year: p.year || "2024",
          slug: p.slug?.current || "",
          image: p.coverImage
            ? urlFor(p.coverImage).width(1000).height(700).url()
            : null,
        }))
      : [
          { title: "Chromore", year: "2024", slug: "chromore", image: null },
          { title: "Lunaris", year: "2024", slug: "lunaris", image: null },
          { title: "Gareos", year: "2024", slug: "gareos", image: null },
        ];

  const process = [
    {
      title: isFa ? "آزمایشگاه کشف" : "Discovery Lab",
      detail: isFa
        ? "تحلیل داده، مصاحبه‌های عمیق و تعریف معماری تجربه."
        : "Research sprints, deep interviews, and experience architecture.",
    },
    {
      title: isFa ? "طراحی ژنراتیو" : "Generative Design",
      detail: isFa
        ? "ایجاد سیستم هویت، زبان بصری و پروتوتایپ‌های واکنشگرا."
        : "Building identity systems, design languages, and responsive prototypes.",
    },
    {
      title: isFa ? "هوش عملیاتی" : "Operational AI",
      detail: isFa
        ? "اتصال مدل‌ها، خودکارسازی تجربه و ایجاد لوپ‌های بازخورد."
        : "Connecting models, automating experiences, and feedback orchestration.",
    },
    {
      title: isFa ? "لانچ و رشد" : "Launch & Growth",
      detail: isFa
        ? "بالانس ظرافت برند و عملکرد؛ مستندسازی برای تیم شما."
        : "Balancing brand finesse with performance and codifying the system.",
    },
  ];

  return (
    <div className="flex flex-col gap-28 lg:gap-32" dir={direction}>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.25),_transparent),_#050510] px-6 py-20 lg:px-16 lg:py-28 shadow-[0_0_120px_rgba(99,102,241,0.15)]">
        <div className="absolute inset-0">
          <div className="absolute -top-32 right-0 w-80 h-80 bg-fuchsia-500/20 blur-3xl" />
          <div className="absolute -bottom-24 left-0 w-96 h-96 bg-sky-500/20 blur-[120px]" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
        <div className="relative z-10 grid items-center gap-16 lg:grid-cols-[3fr_2fr]">
          <div className="space-y-8">
            <SectionBadge label={heroContent.tagline} />
            <h1 className="text-4xl leading-[1.1] text-white sm:text-5xl lg:text-6xl font-semibold">
              {heroContent.heading}
            </h1>
            <p className="text-base lg:text-lg text-gray-300 max-w-2xl">
              {heroContent.subheading}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${lang}/request`}
                className="inline-flex items-center justify-center rounded-full bg-white text-[#050510] px-8 py-3 text-sm font-semibold transition hover:bg-gray-200"
              >
                {heroContent.primaryCta}
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-3 text-sm font-semibold text-white/90 hover:border-white hover:text-white transition"
              >
                {heroContent.secondaryCta}
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: "40+", label: isFa ? "لانچ هم‌زمان" : "Concurrent launches" },
                { value: "10x", label: isFa ? "رشد نرخ تبدیل" : "Conversion lift" },
                { value: "0.4s", label: isFa ? "درک اولیه کاربر" : "Cognitive resonance" },
              ].map((stat, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[28px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur flex flex-col justify-between p-8">
              <div>
                <p className="text-sm uppercase tracking-[0.5em] text-gray-400 mb-4">
                  {isFa ? "پروفایل تجربه" : "Experience Profile"}
                </p>
                <p className="text-2xl font-semibold text-white mb-2">
                  {isFa ? "Luxury Neural Interface" : "Luxury Neural Interface"}
                </p>
                <p className="text-sm text-gray-300">
                  {isFa ? "هم‌پوشانی دقیق هنر و الگوریتم." : "Where couture aesthetics meet algorithmic precision."}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-200">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-gray-400 text-xs mb-2">{isFa ? "حالت برند" : "Brand Mode"}</p>
                  <p>Couture Flux</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-gray-400 text-xs mb-2">{isFa ? "سیگنال‌ها" : "Signals"}</p>
                  <p>+82 / +97</p>
                </div>
                <div className="col-span-2 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <p className="text-gray-400 text-xs mb-2">{isFa ? "هوش همراه" : "AI Companion"}</p>
                  <p>{isFa ? "تحلیل احساسات لحظه‌ای، پیشنهاد حالت‌های تجربی." : "Real-time sentiment tracking & experiential cues."}</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur flex items-center gap-3 shadow-2xl shadow-purple-500/20">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs text-white/90">{isFa ? "جلسه استراتژی فعال شد" : "Strategy session engaged"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="space-y-12">
        <div className="text-center space-y-4">
          <SectionBadge label={isFa ? "طراحی + هوش" : "Design + Intelligence"} />
          <h2 className="text-3xl sm:text-4xl text-white font-semibold">
            {isFa ? "معماری تجربه با DNA لوکس" : "Experience architecture with a luxury DNA"}
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            {isFa
              ? "هر سرویس، ترکیبی از طراحی حسی و سیستم‌های خودآموز است تا برند شما در لحظه با مخاطب هم‌نفس شود."
              : "Each service merges sensorial design with adaptive systems to let your brand converse with every visitor in real time."}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service, idx) => (
            <div
              key={service.label}
              className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur hover:border-white/30 transition shadow-[0_20px_60px_rgba(5,5,16,0.35)]"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-[0.4em] text-gray-400">{String(idx + 1).padStart(2, "0")}</p>
                <span className="text-sm text-white/60">{isFa ? "ماژول" : "Module"}</span>
              </div>
              <h3 className="text-2xl text-white font-semibold mb-3">{service.label}</h3>
              <p className="text-gray-300">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Suite */}
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-[#07060f] to-[#05050c] p-10 lg:p-16 space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <SectionBadge label={isFa ? "پشته هوش اختصاصی" : "Private Intelligence Stack"} />
            <h2 className="mt-4 text-3xl text-white font-semibold">
              {isFa ? "AI بومی برند شما" : "AI that feels native to your brand"}
            </h2>
            <p className="mt-3 text-gray-300 max-w-2xl">
              {isFa
                ? "سه ابزار اختصاصی برای همگام‌سازی استراتژی برند، تجربه کاربر و تصمیم‌گیری تیم."
                : "Three proprietary tools that keep your brand, experience, and teams in perfect sync."}
            </p>
          </div>
          <Link
            href={`/${lang}/request`}
            className="self-start rounded-full border border-white/20 px-6 py-2 text-sm text-white hover:border-white transition"
          >
            {isFa ? "دموی زنده" : "Request Live Demo"}
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {aiSuite.map((suite) => (
            <div
              key={suite.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/90 backdrop-blur hover:border-white/25 transition"
            >
              <p className="text-sm text-gray-400 uppercase tracking-[0.3em] mb-3">{suite.title}</p>
              <p className="text-lg">{suite.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase */}
      <section className="space-y-8">
        <div className="flex flex-col gap-4">
          <SectionBadge label={isFa ? "نمونه کارهای اخیر" : "Selected Works"} />
          <h2 className="text-3xl text-white font-semibold">
            {isFa ? "تجربه‌هایی که استاندارد را دوباره تعریف کردند" : "Experiences that redefine standards"}
          </h2>
          <p className="text-gray-400 max-w-3xl">
            {isFa
              ? "از اپ‌های سرمایه‌گذاری هوشمند تا هویت‌های فیزیتال، هر پروژه یک موتور AI اختصاصی دارد."
              : "From adaptive wealth platforms to phygital brand systems, each launch ships with its own AI core."}
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <Link
              key={`${project.slug}-${idx}`}
              href={project.slug ? `/${lang}/work/${project.slug}` : "#"}
              className="group rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-purple-600/40 to-slate-900/80" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-80 group-hover:opacity-60 transition" />
                <span className="absolute top-4 right-4 rounded-full border border-white/30 px-3 py-1 text-xs text-white/80">
                  {project.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-xl text-white font-semibold">{project.title}</h3>
                <p className="text-sm text-gray-400">
                  {isFa
                    ? "موتور تجربه چندکاناله با شخصی‌سازی بلادرنگ."
                    : "Multichannel experience engine with real-time personalization."}
                </p>
                <div className="mt-auto flex items-center gap-2 text-sm text-white/70">
                  <span>{isFa ? "مطالعه موردی" : "View case study"}</span>
                  <span className="transition group-hover:translate-x-1">↗</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="space-y-8">
        <div className="flex flex-col gap-3 text-center">
          <SectionBadge label={isFa ? "پروتکل همکاری" : "Collaboration Protocol"} />
          <h2 className="text-3xl text-white font-semibold">
            {isFa ? "مسیر هم‌نویسی آینده با برند شما" : "Co-authoring the future with your brand"}
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-4">
          {process.map((step, idx) => (
            <div
              key={step.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:border-white/20 transition"
            >
              <p className="text-xs text-gray-400 uppercase tracking-[0.4em] mb-3">
                {String(idx + 1).padStart(2, "0")}
              </p>
              <h3 className="text-xl text-white font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-10 lg:p-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-4">
          <SectionBadge label={isFa ? "همکاری محدود" : "Limited Collaboration"} />
          <h2 className="text-3xl text-white font-semibold">
            {isFa ? "سه برند در هر فصل" : "Three brands per quarter"}
          </h2>
          <p className="text-gray-300 max-w-2xl">
            {isFa
              ? "برای تضمین کیفیت اجرایی، در هر فصل تنها با سه برند همکاری می‌کنیم. درخواست خود را ثبت کنید تا تیم ما یک نسخه‌ی هوشمند و منحصربه‌فرد از برند شما بسازد."
              : "We collaborate with three houses per quarter to guarantee obsessive execution. Submit your request and we’ll craft a bespoke intelligent system for your brand."}
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full max-w-sm">
          <Link
            href={`/${lang}/request`}
            className="inline-flex items-center justify-center rounded-full bg-white text-[#050510] px-8 py-3 text-sm font-semibold transition hover:bg-gray-200"
          >
            {isFa ? "درخواست همکاری" : "Request Partnership"}
          </Link>
          <Link
            href="mailto:info@ariostudio.net"
            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white/80 hover:text-white transition"
          >
            info@ariostudio.net
          </Link>
        </div>
      </section>
    </div>
  );
}

