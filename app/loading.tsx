export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink animate-pulse blur-xl opacity-50" />
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-blue via-accent-purple to-accent-pink animate-spin-slow opacity-80" />
        <div className="absolute inset-1 bg-background rounded-full" />
      </div>
    </div>
  );
}
