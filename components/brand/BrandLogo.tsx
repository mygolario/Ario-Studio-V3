import Image from "next/image";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
}

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Image
        src="/brand/ario-studio-logo.png"
        alt="Ario Studio"
        width={40}
        height={40}
        className="object-contain w-auto h-full"
        priority
      />
    </div>
  );
}
