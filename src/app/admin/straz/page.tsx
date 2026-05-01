'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Shield, Plus, Trash2, Save, AlertTriangle, MessageSquare } from 'lucide-react'

export default function AdminStrazPage() {
  const [messages, setMessages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchMessages()
  }, [])

  async function fetchMessages() {
    const { data } = await supabase
      .from('guard_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setMessages(data)
    setLoading(false)
  }

  async function addMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const files = (e.currentTarget.querySelector('input[type="file"]') as HTMLInputElement).files
    
    let imageUrls: string[] = []

    // Nahrávání fotek, pokud jsou vybrány
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `messages/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('guard-images')
          .upload(filePath, file)

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('guard-images')
            .getPublicUrl(filePath)
          imageUrls.push(publicUrl)
        }
      }
    }

    const newMessage = {
      title: formData.get('title'),
      content: formData.get('content'),
      is_important: formData.get('is_important') === 'on',
      image_urls: imageUrls
    }

    const { error } = await supabase.from('guard_messages').insert([newMessage])
    if (error) {
      alert('Chyba při ukládání: ' + error.message)
    } else {
      fetchMessages()
      ;(e.target as HTMLFormElement).reset()
    }
  }

  async function deleteMessage(id: string) {
    if (!confirm('Opravdu smazat toto upozornění?')) return
    await supabase.from('guard_messages').delete().eq('id', id)
    fetchMessages()
  }

  return (
    <div className="text-slate-900">
      <h1 className="text-3xl font-extrabold mb-8 flex items-center gap-3 text-slate-900">
        <Shield className="w-8 h-8 text-red-600" /> Správa hlášení Rybářské stráže
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulář */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 h-fit">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-slate-800">
            <Plus className="w-5 h-5 text-red-500" /> Nové upozornění
          </h2>
          <form onSubmit={addMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Předmět zprávy</label>
              <input type="text" name="title" placeholder="např. Zvýšený výskyt nepořádku" required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-red-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Obsah hlášení</label>
              <textarea name="content" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-red-500 outline-none resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Přiložit fotografie (více souborů)</label>
              <input type="file" multiple accept="image/*" className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm" />
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-50 rounded-lg border border-red-100">
              <input type="checkbox" name="is_important" id="is_important" className="w-5 h-5 accent-red-600" />
              <label htmlFor="is_important" className="text-sm font-bold text-red-900 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Označit jako DŮLEŽITÉ
              </label>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 shadow-sm transition flex items-center justify-center gap-2">
              <Save className="w-5 h-5" /> Publikovat hlášení
            </button>
          </form>
        </div>

        {/* Seznam zpráv */}
        <div className="lg:col-span-2 space-y-4">
          {loading ? (
            <p className="text-gray-500 italic">Načítám hlášení...</p>
          ) : messages.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
              <MessageSquare className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-500">Zatím nebyla publikována žádná hlášení.</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${msg.is_important ? 'border-red-200 ring-1 ring-red-50' : 'border-gray-100'} flex justify-between items-start gap-4`}>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    {msg.is_important && <AlertTriangle className="w-4 h-4 text-red-600" />}
                    <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleDateString('cs-CZ')}</span>
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${msg.is_important ? 'text-red-900' : 'text-slate-900'}`}>{msg.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
                <button onClick={() => deleteMessage(msg.id)} className="text-red-400 hover:text-red-600 p-2 transition hover:bg-red-50 rounded-lg">
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
