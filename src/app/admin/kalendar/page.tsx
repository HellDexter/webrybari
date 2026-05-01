'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Calendar, Plus, Trash2, MapPin, Clock, Save, Pencil, X } from 'lucide-react'

export default function AdminKalendarPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<any | null>(null)
  
  // States for form inputs to allow easy editing
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: ''
  })

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const startEdit = (event: any) => {
    const d = new Date(event.date)
    const dateStr = d.toISOString().split('T')[0]
    const timeStr = d.toTimeString().split(' ')[0].substring(0, 5)
    
    setEditingEvent(event)
    setFormData({
      title: event.title,
      date: dateStr,
      time: timeStr,
      location: event.location || '',
      description: event.description || ''
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingEvent(null)
    setFormData({ title: '', date: '', time: '', location: '', description: '' })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const combinedDate = new Date(`${formData.date}T${formData.time}`).toISOString()

    const eventToSave = {
      date: combinedDate,
      title: formData.title,
      location: formData.location,
      description: formData.description,
    }

    if (editingEvent) {
      // Update existing
      const { error } = await supabase
        .from('events')
        .update(eventToSave)
        .eq('id', editingEvent.id)
      
      if (error) alert('Chyba při aktualizaci: ' + error.message)
    } else {
      // Insert new
      const { error } = await supabase.from('events').insert([eventToSave])
      if (error) alert('Chyba při ukládání: ' + error.message)
    }

    fetchEvents()
    cancelEdit()
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
        {/* Formulář */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
            {editingEvent ? (
              <><Pencil className="w-5 h-5 text-amber-500" /> Upravit akci</>
            ) : (
              <><Plus className="w-5 h-5 text-blue-500" /> Přidat novou akci</>
            )}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Název akce</label>
              <input 
                type="text" name="title" value={formData.title} onChange={handleInputChange}
                placeholder="např. Výroční členská schůze" required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Datum</label>
                <input 
                  type="date" name="date" value={formData.date} onChange={handleInputChange}
                  required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Čas začátku</label>
                <input 
                  type="time" name="time" value={formData.time} onChange={handleInputChange}
                  required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Místo konání</label>
              <input 
                type="text" name="location" value={formData.location} onChange={handleInputChange}
                placeholder="např. Kulturní dům" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" 
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Popis (volitelně)</label>
              <textarea 
                name="description" value={formData.description} onChange={handleInputChange}
                rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              ></textarea>
            </div>
            <div className="flex gap-2">
              <button type="submit" className={`flex-grow ${editingEvent ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-lg font-bold shadow-sm transition flex items-center justify-center gap-2`}>
                <Save className="w-5 h-5" /> {editingEvent ? 'Uložit změny' : 'Uložit akci'}
              </button>
              {editingEvent && (
                <button type="button" onClick={cancelEdit} className="bg-gray-100 text-gray-600 px-4 py-3 rounded-lg hover:bg-gray-200 transition">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
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
                  <tr key={event.id} className={`hover:bg-slate-50 transition ${editingEvent?.id === event.id ? 'bg-amber-50' : ''}`}>
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
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(event)} className="text-amber-600 hover:text-amber-700 p-2 transition bg-amber-50 rounded-lg">
                          <Pencil className="w-5 h-5" />
                        </button>
                        <button onClick={() => deleteEvent(event.id)} className="text-red-500 hover:text-red-700 p-2 transition bg-red-50 rounded-lg">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
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
