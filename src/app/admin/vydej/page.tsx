'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Calendar, Plus, Trash2, Clock, Save } from 'lucide-react'

export default function AdminVydejPage() {
  const [schedule, setSchedule] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchSchedule()
  }, [])

  async function fetchSchedule() {
    const { data } = await supabase
      .from('permit_schedule')
      .select('*')
      .order('date', { ascending: true })
    if (data) setSchedule(data)
    setLoading(false)
  }

  async function addEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const newEntry = {
      date: formData.get('date'),
      start_time: formData.get('start_time'),
      end_time: formData.get('end_time'),
    }

    const { error } = await supabase.from('permit_schedule').insert([newEntry])
    if (!error) {
      fetchSchedule()
      ;(e.target as HTMLFormElement).reset()
    }
  }

  async function deleteEntry(id: string) {
    if (!confirm('Opravdu smazat tento termín?')) return
    await supabase.from('permit_schedule').delete().eq('id', id)
    fetchSchedule()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 flex items-center gap-2">
        <Calendar className="w-8 h-8 text-green-600" /> Správa termínů výdeje
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulář pro přidání */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
            <Plus className="w-5 h-5 text-green-500" /> Přidat nový termín
          </h2>
          <form onSubmit={addEntry} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Datum</label>
              <input type="date" name="date" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Od</label>
                <input type="time" name="start_time" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Do</label>
                <input type="time" name="end_time" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
              </div>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> Uložit termín
            </button>
          </form>
        </div>

        {/* Seznam termínů */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-bold text-sm text-gray-700">Datum</th>
                <th className="px-6 py-4 font-bold text-sm text-gray-700">Čas</th>
                <th className="px-6 py-4 text-right">Akce</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">Načítám termíny...</td></tr>
              ) : schedule.length === 0 ? (
                <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500 italic">Žádné termíny nejsou vypsány.</td></tr>
              ) : (
                schedule.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {new Date(entry.date).toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'short' })}
                    </td>
                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {entry.start_time.slice(0, 5)} - {entry.end_time.slice(0, 5)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => deleteEntry(entry.id)} className="text-red-400 hover:text-red-600 p-2 transition">
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
