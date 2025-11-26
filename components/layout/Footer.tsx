import { Link } from "@/lib/navigation";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("common.footer");
  const tNav = useTranslations("common.navigation");

  return (
    <footer className="bg-page-elevated border-t border-border-subtle py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
            <p className="text-text-muted-custom max-w-sm">
              {t("description")}
            </p>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium text-text-main mb-1">{t("emailLabel")}</h4>
              <a 
                href="mailto:info@ariostudio.net" 
                className="text-text-muted-custom hover:text-text-main transition-colors border-b border-transparent hover:border-text-main pb-0.5"
              >
                info@ariostudio.net
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-text-main font-medium mb-6">{t("sitemap")}</h4>
            <ul className="space-y-4 text-sm text-text-muted-custom">
              <li>
                <Link href="/" className="hover:text-text-main transition-colors">
                  {tNav("home")}
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-text-main transition-colors"
                >
                  {tNav("projects")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-text-main transition-colors"
                >
                  {tNav("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-text-main font-medium mb-6">{t("social")}</h4>
            <ul className="space-y-4 text-sm text-text-muted-custom">
              <li>
                <a href="#" className="hover:text-text-main transition-colors">
                  Twitter / X
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-text-main transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-text-main transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted-custom/60">
          <p>{t("rights", { year: new Date().getFullYear() })}</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-text-main transition-colors">
              {t("privacy")}
            </Link>
            <Link href="#" className="hover:text-text-main transition-colors">
              {t("terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
