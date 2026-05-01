'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Calendar, Plus, Trash2, MapPin, Tag, Save, Loader2, Info } from 'lucide-react'

export default function AdminKalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    const { data } = await supabase
      .from('events')
      .select('*')
      .order('date', { ascending: true })
    if (data) setEvents(data)
    setLoading(false)
  }

  async function addEvent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    
    const newEvent = {
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      location: formData.get('location'),
      type: formData.get('type'),
    }

    const { error } = await supabase.from('events').insert([newEvent])
    if (error) {
      alert('Chyba při ukládání: ' + error.message)
    } else {
      fetchEvents()
      ;(e.target as HTMLFormElement).reset()
    }
    setIsSubmitting(false)
  }

  async function deleteEvent(id: string) {
    if (!confirm('Opravdu smazat tuto akci?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      alert('Chyba při mazání: ' + error.message)
    }
    fetchEvents()
  }

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'zavody': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'brigada': return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'schuze': return 'bg-purple-100 text-purple-700 border-purple-200'
      default: return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  return (
    <div className="text-slate-900 pb-12">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3">
        <Calendar className="w-8 h-8 text-green-600" /> Kalendář akcí
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Formulář */}
        <div className="xl:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 sticky top-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
              <Plus className="w-5 h-5 text-green-500" /> Nová akce
            </h2>
            <form onSubmit={addEvent} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Název akce</label>
                <input type="text" name="title" required placeholder="Např. Jarní rybářské závody" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Datum a čas</label>
                  <input type="datetime-local" name="date" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Typ akce</label>
                  <select name="type" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none">
                    <option value="ostatni">Ostatní</option>
                    <option value="zavody">Závody</option>
                    <option value="brigada">Brigáda</option>
                    <option value="schuze">Schůze</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Místo konání</label>
                <input type="text" name="location" placeholder="Např. Revír Vltava 20" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Popis / Poznámka</label>
                <textarea name="description" rows={3} placeholder="Bližší informace o akci..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none resize-none" />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Uložit akci</>}
              </button>
            </form>
          </div>
        </div>

        {/* Seznam */}
        <div className="xl:col-span-2 space-y-4">
          {loading ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-200">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-green-600 mb-2" />
              <p className="text-slate-500">Načítám kalendář...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-gray-300">
              <Info className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-medium">V kalendáři zatím nejsou žádné akce.</p>
            </div>
          ) : (
            events.map((event) => (
              <div key={event.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold border uppercase ${getEventBadge(event.type)}`}>
                      {event.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">{event.title}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(event.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {event.location}
                      </div>
                    )}
                  </div>
                  {event.description && (
                    <p className="mt-2 text-sm text-slate-500 line-clamp-1">{event.description}</p>
                  )}
                </div>
                <button onClick={() => deleteEvent(event.id)} className="self-end md:self-center text-red-500 hover:text-red-700 p-2.5 transition bg-red-50 rounded-xl">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
