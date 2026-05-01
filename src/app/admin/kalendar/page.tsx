'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Calendar, Plus, Trash2, MapPin, Clock, Save, Info } from 'lucide-react'

export default function AdminKalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
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
    const formData = new FormData(e.currentTarget)
    
    // Kombinace data a času do jednoho ISO stringu
    const dateVal = formData.get('date')
    const timeVal = formData.get('time')
    const combinedDate = new Date(`${dateVal}T${timeVal}`).toISOString()

    const newEvent = {
      date: combinedDate,
      title: formData.get('title'),
      location: formData.get('location'),
      description: formData.get('description'),
    }

    const { error } = await supabase.from('events').insert([newEvent])
    if (error) {
      alert('Chyba při ukládání: ' + error.message)
    } else {
      fetchEvents()
      ;(e.target as HTMLFormElement).reset()
    }
  }

  async function deleteEvent(id: string) {
    if (!confirm('Opravdu smazat tuto akci?')) return
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      alert('Chyba při mazání: ' + error.message)
    }
    fetchEvents()
  }

  return (
    <div className="text-slate-900">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-slate-900">
        <Calendar className="w-8 h-8 text-blue-600" /> Správa kalendáře akcí
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulář pro přidání */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
            <Plus className="w-5 h-5 text-blue-500" /> Přidat novou akci
          </h2>
          <form onSubmit={addEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Název akce</label>
              <input type="text" name="title" placeholder="např. Výroční členská schůze" required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Datum</label>
                <input type="date" name="date" required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Čas začátku</label>
                <input type="time" name="time" required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Místo konání</label>
              <input type="text" name="location" placeholder="např. Kulturní dům" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Popis (volitelně)</label>
              <textarea name="description" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-sm transition flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> Uložit akci
            </button>
          </form>
        </div>

        {/* Seznam akcí */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-bold text-sm text-slate-800">Datum a název</th>
                <th className="px-6 py-4 font-bold text-sm text-slate-800">Místo</th>
                <th className="px-6 py-4 text-right font-bold text-sm text-slate-800">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500 italic">Načítám akce...</td></tr>
              ) : events.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-500 font-medium">Žádné akce nejsou v kalendáři.</td></tr>
              ) : (
                events.map((event) => (
                  <tr key={event.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div className="text-blue-600 font-bold text-xs uppercase mb-1">
                        {new Date(event.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="font-bold text-slate-900">{event.title}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                        <Clock className="w-3 h-3" /> {new Date(event.date).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">
                      {event.location ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-slate-400" /> {event.location}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:text-red-700 p-2 transition bg-red-50 rounded-lg">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
