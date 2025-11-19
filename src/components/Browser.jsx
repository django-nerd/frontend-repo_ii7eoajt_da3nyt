import React, { useEffect, useState } from 'react'
import { Plus, ArrowRight } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Browser({ onOpen }) {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')

  async function fetchStories() {
    setLoading(true)
    try {
      const res = await fetch(`${API}/stories`)
      const data = await res.json()
      setStories(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchStories() }, [])

  async function createStory() {
    if (!title.trim()) return
    const res = await fetch(`${API}/stories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, synopsis })
    })
    const data = await res.json()
    setTitle(''); setSynopsis('')
    await fetchStories()
    if (data?.id) onOpen(data.id)
  }

  return (
    <section className="bg-black py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl text-white font-semibold">Your stories</h2>
            <p className="text-white/70 mt-1">Pick up where you left off or begin anew.</p>
          </div>
          <div className="flex gap-2">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="New story title" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none" />
            <input value={synopsis} onChange={e=>setSynopsis(e.target.value)} placeholder="Optional synopsis" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none w-80 hidden md:block" />
            <button onClick={createStory} className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 font-medium hover:bg-white/90"><Plus size={18}/>Create</button>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({length:6}).map((_,i)=> (
              <div key={i} className="h-40 rounded-xl bg-white/[0.06] animate-pulse" />
            ))
          ) : stories.length === 0 ? (
            <div className="col-span-full text-white/70">No stories yet. Create your first above.</div>
          ) : (
            stories.map(s => (
              <button key={s.id} onClick={()=>onOpen(s.id)} className="group text-left rounded-xl border border-white/10 bg-white/[0.03] p-5 hover:bg-white/[0.06] transition">
                <div className="h-10 w-10 rounded-lg" style={{ background: s.cover_color || 'linear-gradient(135deg,#f97316,#ef4444)'}} />
                <h3 className="mt-4 text-white font-semibold">{s.title}</h3>
                {s.synopsis && <p className="mt-1 text-sm text-white/70 line-clamp-2">{s.synopsis}</p>}
                <div className="mt-4 inline-flex items-center gap-1 text-sm text-white/80 group-hover:gap-2 transition-all">Open <ArrowRight size={16}/></div>
              </button>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
