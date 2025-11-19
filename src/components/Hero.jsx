import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pt-28 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm text-white/80 backdrop-blur">
          Literary AI for long-form worlds
        </div>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-white">
          TaleQuill
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-white/80">
          An immersive storytelling studio with perfect memory. Collaborate with an AI that remembers every character, place, and thread—across thousands of turns.
        </p>
        <div className="mt-10 flex items-center gap-4">
          <button onClick={onStart} className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">
            Start a story
          </button>
          <a href="#features" className="text-white/80 hover:text-white transition">Learn more</a>
        </div>
      </div>
    </section>
  )
}
