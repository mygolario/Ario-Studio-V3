import ProjectRequestForm from "@/components/ProjectRequestForm";

export const metadata = {
  title: "Project Request | Ariostudio",
  description: "Start your project with Ariostudio",
};

export default function RequestPage({ params }: { params: { lang: string } }) {
  const lang = params.lang as 'en' | 'fa';
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-20 px-6">
      <ProjectRequestForm lang={lang} />
    </div>
  );
}
