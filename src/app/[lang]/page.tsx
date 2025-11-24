import { client } from "@/sanity/lib/client";
import { homePageQuery } from "@/sanity/lib/queries";
import LandingPage from "@/components/landing/LandingPage";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = params.lang as "en" | "fa";

  let data = null;
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      data = await client.fetch(homePageQuery);
    }
  } catch (error) {
    console.error("Sanity fetch failed:", error);
  }

  return (
    <main className="container mx-auto w-full max-w-6xl px-4 py-16 lg:py-24">
      <LandingPage data={data} lang={lang} />
    </main>
  );
}
