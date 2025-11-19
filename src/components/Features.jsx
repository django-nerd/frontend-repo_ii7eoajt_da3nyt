import React from 'react'
import { BookOpen, Brain, Eye, Shield } from 'lucide-react'

export default function Features() {
  const items = [
    {
      icon: Brain,
      title: 'Perfect memory',
      desc: 'Retrieval-augmented generation keeps characters, lore and timelines coherent across unlimited length.'
    },
    {
      icon: BookOpen,
      title: 'Reader-first',
      desc: 'An elegant reading experience for 2,000+ word sessions—quiet UI, high contrast typography, focus mode.'
    },
    {
      icon: Eye,
      title: 'Cinematic pacing',
      desc: 'Scene-aware continuation tuned for long-form arcs rather than chatty back-and-forth.'
    },
    {
      icon: Shield,
      title: 'Creative freedom',
      desc: 'Minimal content restrictions. You control tone, boundaries and direction.'
    }
  ]

  return (
    <section id="features" className="relative bg-black py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition">
              <Icon className="h-6 w-6 text-white" />
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-white/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
