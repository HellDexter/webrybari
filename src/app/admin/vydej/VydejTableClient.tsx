'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Trash2, Plus, Loader2 } from 'lucide-react'
import { addScheduleEntry, deleteScheduleEntry } from './actions'

interface ScheduleEntry {
  id: string
  date: string
  start_time: string
  end_time: string
  location: string
}

export default function VydejAdminPage({ initialData }: { initialData: ScheduleEntry[] }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    try {
      await addScheduleEntry(formData)
      ;(e.target as HTMLFormElement).reset()
    } catch (err) {
      alert('Chyba při ukládání: ' + err)
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Opravdu chcete smazat tento termín?')) return
    setIsDeleting(id)
    try {
      await deleteScheduleEntry(id)
    } catch (err) {
      alert('Chyba při mazání: ' + err)
    } finally {
      setIsDeleting(null)
    }
  }

  // Seskupení podle měsíců pro lepší přehled
  const months: Record<string, ScheduleEntry[]> = {}
  initialData.sort((a, b) => a.date.localeCompare(b.date)).forEach(entry => {
    const month = new Date(entry.date).toLocaleString('cs-CZ', { month: 'long', year: 'numeric' })
    if (!months[month]) months[month] = []
    months[month].push(entry)
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Výdej povolenek - Harmonogram</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulář pro přidání */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Plus className="w-5 h-5 text-green-600" /> Přidat termín
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
                <input 
                  type="date" 
                  name="date" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Od</label>
                  <input 
                    type="time" 
                    name="start_time" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Do</label>
                  <input 
                    type="time" 
                    name="end_time" 
                    required 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Místo</label>
                <input 
                  type="text" 
                  name="location" 
                  defaultValue="Rybářská klubovna v Týně nad Vltavou"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Uložit termín'}
              </button>
            </form>
          </div>
        </div>

        {/* Seznam termínů */}
        <div className="lg:col-span-2 space-y-6">
          {Object.keys(months).length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Zatím nejsou naplánovány žádné termíny.</p>
            </div>
          ) : (
            Object.entries(months).map(([month, entries]) => (
              <div key={month} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 capitalize">{month}</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {entries.map((entry) => (
                    <div key={entry.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition group">
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-gray-700 font-medium min-w-[120px]">
                          <Calendar className="w-4 h-4 text-green-600" />
                          {new Date(entry.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'numeric', weekday: 'short' })}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="w-4 h-4 text-blue-500" />
                          {entry.start_time.slice(0, 5)} - {entry.end_time.slice(0, 5)}
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm">
                          <MapPin className="w-4 h-4" />
                          {entry.location}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(entry.id)}
                        disabled={isDeleting === entry.id}
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                        title="Smazat"
                      >
                        {isDeleting === entry.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
