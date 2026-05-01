'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'
import { sendMessage, submitVote } from './actions'
import { Send, CalendarPlus, CalendarCheck, CalendarX, Check, X, Clock, MessageSquare } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Profile = {
  id: string
  first_name: string
  last_name: string
  role: string
}

type MessageMetadata = {
  date?: string
  location?: string
  votes?: {
    yes: string[]
    no: string[]
  }
}

type Message = {
  id: string
  created_at: string
  content: string
  author_id: string
  type: string
  metadata: MessageMetadata
  author?: Profile
}

export default function ChatClient({ 
  initialMessages, 
  currentUser 
}: { 
  initialMessages: Message[]
  currentUser: Profile 
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  
  const [eventDate, setEventDate] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const router = useRouter()

  // Scroll dolů při nové zprávě
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Synchronizace s počátečními zprávami (pokud se změní zvenčí, např. router.refresh)
  useEffect(() => {
    setMessages(initialMessages)
  }, [initialMessages])

  // Nastavení Supabase Realtime
  useEffect(() => {
    const channel = supabase
      .channel('realtime_admin_messages')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'admin_messages' }, 
        () => {
          // Při jakékoliv změně v tabulce admin_messages řekneme Next.js, aby znovu načetl data ze serveru.
          // To zajistí, že se správně načtou i propojené profily autorů.
          router.refresh()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, router])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('content', inputValue)
    formData.append('type', 'message')
    
    await sendMessage(formData)
    
    setInputValue('')
    setIsSubmitting(false)
  }

  const handleSendEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || !eventDate || isSubmitting) return

    setIsSubmitting(true)
    const formData = new FormData()
    formData.append('content', inputValue)
    formData.append('type', 'event_proposal')
    
    const metadata = {
      date: eventDate,
      location: eventLocation,
      votes: { yes: [], no: [] }
    }
    formData.append('metadata', JSON.stringify(metadata))
    
    await sendMessage(formData)
    
    setInputValue('')
    setEventDate('')
    setEventLocation('')
    setShowEventForm(false)
    setIsSubmitting(false)
  }

  const handleVote = async (messageId: string, type: 'yes' | 'no') => {
    await submitVote(messageId, type)
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Hlavní oblast se zprávami */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
            <p>Zatím zde nejsou žádné zprávy.</p>
            <p className="text-sm">Napište první zprávu pro ostatní administrátory!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.author_id === currentUser?.id
            
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                {/* Jméno autora */}
                <div className={`text-xs text-gray-500 mb-1 px-1 flex gap-2 items-center ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                  <span className="font-semibold text-gray-700">
                    {isMe ? 'Vy' : `${msg.author?.first_name} ${msg.author?.last_name}`}
                  </span>
                  <span>{new Date(msg.created_at).toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' })}</span>
                  {msg.author?.role === 'superuser' && !isMe && (
                     <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded">Hlavní Admin</span>
                  )}
                </div>

                {/* Bublina zprávy */}
                {msg.type === 'message' ? (
                  <div className={`max-w-[85%] md:max-w-[70%] rounded-2xl px-4 py-2 ${
                    isMe 
                      ? 'bg-green-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ) : (
                  // Kartička pro Návrh akce (event_proposal)
                  <div className={`max-w-[95%] md:max-w-[80%] rounded-xl shadow-sm border ${
                    isMe ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                  }`}>
                    <div className="p-4 border-b border-gray-100/50">
                      <div className="flex items-center gap-2 mb-2 text-sm font-bold uppercase tracking-wider text-green-700">
                        <CalendarPlus className="w-4 h-4" /> Návrh akce
                      </div>
                      <p className={`whitespace-pre-wrap text-lg font-medium mb-3 ${isMe ? 'text-gray-900' : 'text-gray-900'}`}>
                        {msg.content}
                      </p>
                      
                      <div className="flex flex-col gap-1 text-sm text-gray-600">
                        {msg.metadata?.date && (
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <strong>Termín:</strong> {new Date(msg.metadata.date).toLocaleString('cs-CZ')}
                          </div>
                        )}
                        {msg.metadata?.location && (
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <strong>Místo:</strong> {msg.metadata.location}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Hlasování */}
                    <div className="p-3 bg-white/50 rounded-b-xl flex flex-wrap gap-4 items-center">
                      <button 
                        onClick={() => handleVote(msg.id, 'yes')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                          msg.metadata?.votes?.yes?.includes(currentUser.id) 
                            ? 'bg-green-100 text-green-800 border border-green-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                        }`}
                      >
                        <Check className="w-4 h-4" /> Zúčastním se ({msg.metadata?.votes?.yes?.length || 0})
                      </button>
                      <button 
                        onClick={() => handleVote(msg.id, 'no')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                          msg.metadata?.votes?.no?.includes(currentUser.id) 
                            ? 'bg-red-100 text-red-800 border border-red-200' 
                            : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700'
                        }`}
                      >
                        <X className="w-4 h-4" /> Nemůžu ({msg.metadata?.votes?.no?.length || 0})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Spodní panel pro psaní */}
      <div className="bg-white border-t border-gray-200 p-4">
        {showEventForm ? (
          <form onSubmit={handleSendEvent} className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-2 animate-in slide-in-from-bottom-2 fade-in">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2">
                <CalendarPlus className="w-5 h-5 text-green-600" /> Nový návrh akce / brigády
              </h4>
              <button type="button" onClick={() => setShowEventForm(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Popis akce (O co jde?)</label>
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Např: Podzimní výlov rybníku XY" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Navrhovaný termín a čas</label>
                  <input 
                    type="datetime-local" 
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">Místo (volitelné)</label>
                  <input 
                    type="text" 
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    placeholder="Kde se sejdeme..." 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit"
                  disabled={isSubmitting || !inputValue.trim() || !eventDate}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium disabled:opacity-50 transition"
                >
                  <Send className="w-4 h-4" /> Odeslat návrh do chatu
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSendMessage} className="flex gap-2 items-end">
            <button
              type="button"
              onClick={() => setShowEventForm(true)}
              className="p-3 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition shrink-0"
              title="Navrhnout akci (Plánování)"
            >
              <CalendarPlus className="w-6 h-6" />
            </button>
            
            <div className="relative flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="Napište zprávu ostatním..."
                className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-2xl text-gray-900 focus:ring-green-500 focus:border-green-500 resize-none overflow-hidden max-h-32 min-h-[50px] block"
                rows={1}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !inputValue.trim()}
              className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 transition shrink-0"
              title="Odeslat"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
