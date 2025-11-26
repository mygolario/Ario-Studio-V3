import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Orb Symbol */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B5CFF] via-[#4DA9FF] to-[#F15EFF] rounded-full opacity-90 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#7B5CFF] via-[#4DA9FF] to-[#F15EFF] rounded-full opacity-40 blur-[8px]" />
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <span className="font-sans font-semibold text-lg tracking-[0.04em] uppercase text-foreground">
          Ario Studio
        </span>
      )}
    </div>
  );
}
