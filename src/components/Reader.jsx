import React, { useEffect, useRef, useState } from 'react'
import { ArrowUp, PanelRightClose, PanelRightOpen } from 'lucide-react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Reader({ storyId, onBack }) {
  const [entries, setEntries] = useState([])
  const [memory, setMemory] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebar, setSidebar] = useState(true)
  const viewportRef = useRef(null)

  async function load() {
    const [eRes, mRes] = await Promise.all([
      fetch(`${API}/stories/${storyId}/entries`),
      fetch(`${API}/stories/${storyId}/memory`)
    ])
    setEntries(await eRes.json())
    setMemory(await mRes.json())
  }

  useEffect(() => { load() }, [storyId])
  useEffect(() => { if (viewportRef.current) viewportRef.current.scrollTop = viewportRef.current.scrollHeight }, [entries])

  async function submit() {
    if (!input.trim()) return
    setLoading(true)
    try {
      await fetch(`${API}/stories/${storyId}/entries`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story_id: storyId, role: 'user', content: input })
      })
      setInput('')
      const gen = await fetch(`${API}/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story_id: storyId, prompt: input })
      }).then(r=>r.json())
      await load()
    } finally { setLoading(false) }
  }

  return (
    <section className="min-h-[80vh] bg-[#0b0b0c] text-white">
      <div className="mx-auto max-w-6xl px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className={`lg:col-span-${sidebar ? '8' : '12'} rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur overflow-hidden`}> 
          <div className="h-[65vh] md:h-[70vh] overflow-y-auto p-6" ref={viewportRef}>
            {entries.length === 0 ? (
              <div className="text-white/70">The page is blank. Begin the tale.</div>
            ) : (
              entries.map(e => (
                <div key={e.id} className="mb-6">
                  <div className="text-xs uppercase tracking-wide text-white/50 mb-2">{e.role === 'user' ? 'You' : 'TaleQuill'}</div>
                  <div className="prose prose-invert max-w-none leading-relaxed text-[17px]">
                    {e.content}
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <button onClick={()=>setSidebar(!sidebar)} className="hidden lg:inline-flex items-center rounded-lg bg-white/5 px-3 py-2 hover:bg-white/10 border border-white/10 text-white/80">
                {sidebar ? <PanelRightClose size={18}/> : <PanelRightOpen size={18}/>} <span className="ml-2 text-sm">{sidebar ? 'Hide' : 'Show'} memory</span>
              </button>
              <input
                value={input}
                onChange={e=>setInput(e.target.value)}
                onKeyDown={e=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); submit() } }}
                placeholder="Write an action or continue the scene..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 placeholder-white/40 focus:outline-none"
              />
              <button onClick={submit} disabled={loading} className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-3 font-medium hover:bg-white/90 disabled:opacity-50">
                <ArrowUp size={18}/> {loading ? 'Thinking…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
        {sidebar && (
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="text-sm font-semibold text-white/80">Memory</h3>
              <div className="mt-3 grid grid-cols-1 gap-3">
                {memory.length === 0 ? (
                  <div className="text-white/60 text-sm">No entities yet. As the story unfolds, characters, locations and facts appear here.</div>
                ) : memory.map(m => (
                  <div key={m.id} className="rounded-lg bg-white/[0.04] border border-white/10 p-3">
                    <div className="text-xs uppercase tracking-wide text-white/50">{m.kind}</div>
                    <div className="text-white font-medium">{m.name}</div>
                    {m.description && <div className="text-white/70 text-sm">{m.description}</div>}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  )
}
