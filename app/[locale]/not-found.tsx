import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BackgroundGlow } from "@/components/ui/BackgroundGlow";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <BackgroundGlow />
      
      <div className="relative z-10 text-center px-4">
        <h1 className="text-[12rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-text-main/20 to-transparent select-none">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-6 -mt-12 relative z-20">
          Page Not Found
        </h2>
        <p className="text-text-muted-custom max-w-md mx-auto mb-12 text-lg">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
