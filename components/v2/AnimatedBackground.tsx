'use client'

import { useEffect, useRef } from 'react'

/**
 * Animated Background Component
 * 
 * Floating gradient orbs and grid pattern overlay
 */
export default function AnimatedBackground() {
  return (
    <>
      {/* Animated Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] -top-[200px] -left-[200px] rounded-full opacity-15 blur-[100px] animate-float-1"
          style={{
            background: 'radial-gradient(circle, #FF6B35, transparent)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] -bottom-[150px] -right-[150px] rounded-full opacity-15 blur-[100px] animate-float-2"
          style={{
            background: 'radial-gradient(circle, #FFA552, transparent)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15 blur-[100px] animate-float-3"
          style={{
            background: 'radial-gradient(circle, #FF8C42, transparent)',
          }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 53, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 53, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </>
  )
}

