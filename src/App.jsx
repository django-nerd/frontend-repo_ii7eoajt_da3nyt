import React, { useMemo, useState } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Browser from './components/Browser'
import Reader from './components/Reader'

export default function App() {
  const [view, setView] = useState('home') // home | browser | reader
  const [storyId, setStoryId] = useState(null)

  const goStart = () => setView('browser')
  const openStory = (id) => { setStoryId(id); setView('reader') }

  return (
    <div className="min-h-screen bg-black">
      {view === 'home' && (
        <>
          <Hero onStart={goStart} />
          <Features />
          <div className="bg-black py-16">
            <div className="mx-auto max-w-6xl px-6 text-center">
              <div className="text-white/60">Designed for long-form reading. Crisp type, quiet chrome, cinematic cadence.</div>
            </div>
          </div>
          <div className="bg-gradient-to-b from-black to-[#0b0b0c] py-16">
            <div className="mx-auto max-w-6xl px-6 flex justify-center">
              <button onClick={goStart} className="rounded-full bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">Start your first story</button>
            </div>
          </div>
        </>
      )}

      {view === 'browser' && (
        <Browser onOpen={openStory} />
      )}

      {view === 'reader' && storyId && (
        <Reader storyId={storyId} />
      )}

      <footer className="bg-black border-t border-white/10 py-10">
        <div className="mx-auto max-w-6xl px-6 text-white/60 text-sm">
          TaleQuill — literary AI, not gaming AI.
        </div>
      </footer>
    </div>
  )
}
