// Route segment config for Studio
// This ensures the Studio route is always dynamic and excluded from static optimization
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
