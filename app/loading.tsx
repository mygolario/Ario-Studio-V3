export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-black">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-electric-blue/20 border-t-electric-blue rounded-full animate-spin" />
        <p className="text-body text-text-secondary">Loading...</p>
      </div>
    </div>
  )
}

