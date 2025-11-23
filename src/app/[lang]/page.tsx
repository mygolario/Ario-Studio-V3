import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import Hero from "@/components/home/Hero";
import Intro from "@/components/home/Intro";
import LogoWall from "@/components/home/LogoWall";
import ServicesDark from "@/components/home/ServicesDark";
import KeyStrengths from "@/components/home/KeyStrengths";
import Evolution from "@/components/home/Evolution";
import ServicesLight from "@/components/home/ServicesLight";
import IdentityHighlight from "@/components/home/IdentityHighlight";
import PortfolioGrid from "@/components/home/PortfolioGrid";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'en' | 'fa';
  
  // Fetch data from Sanity
  // If no project ID is configured, this might fail, so we handle it gracefully or let it be null
  let data = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      data = await client.fetch(homePageQuery);
    }
  } catch (error) {
    console.error("Sanity fetch failed:", error);
  }

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      <Hero data={data} lang={lang} />
      <Intro data={data} lang={lang} />
      <LogoWall lang={lang} />
      <ServicesDark data={data} lang={lang} />
      <KeyStrengths data={data} lang={lang} />
      <Evolution data={data} lang={lang} />
      <ServicesLight data={data} lang={lang} />
      <IdentityHighlight data={data} lang={lang} />
      <PortfolioGrid data={data} lang={lang} />
    </div>
  );
}
