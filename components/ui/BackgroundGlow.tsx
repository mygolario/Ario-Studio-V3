"use client";

export function BackgroundGlow() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[120px] animate-pulse-slow"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent-blue/10 rounded-full blur-[120px] animate-pulse-slower"
      />
    </div>
  );
}
