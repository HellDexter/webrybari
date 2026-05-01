'use client'

import { useState } from 'react'
import { updateQuestion, deleteQuestion } from './actions'
import { Trash2, Save, CheckCircle } from 'lucide-react'

type Question = {
  id: string
  author_name: string
  content: string
  answer: string | null
  status: string
  created_at: string
}

export default function QuestionItem({ question }: { question: Question }) {
  const [answerText, setAnswerText] = useState(question.answer || '')
  const [isPublished, setIsPublished] = useState(question.status === 'answered')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async (newStatus: string) => {
    setIsSaving(true)
    const result = await updateQuestion(question.id, answerText, newStatus)
    if (result?.error) {
      alert(result.error)
    } else {
      window.location.reload() // Natvrdo znovunačteme stránku, aby administrátor viděl 100% aktuální stav z DB
    }
    setIsSaving(false)
  }

  const handleDelete = async () => {
    if (confirm('Opravdu chcete tento dotaz trvale smazat?')) {
      const result = await deleteQuestion(question.id)
      if (result?.error) alert(result.error)
    }
  }

  return (
    <div className="pt-6 first:pt-0">
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className="font-bold text-gray-900">{question.author_name}</span>
          <span className="text-gray-400 text-sm ml-3">
            {new Date(question.created_at).toLocaleDateString('cs-CZ')}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold ${
            question.status === 'answered' 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            {question.status === 'answered' ? '✓ Zveřejněno na webu' : 'Nezveřejněno'}
          </div>
          <button onClick={handleDelete} className="text-red-500 hover:text-red-700" title="Smazat">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg text-gray-800 mb-4 border border-gray-100 whitespace-pre-wrap">
        {question.content}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Vaše odpověď:</label>
        <textarea
          rows={3}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="Napište odpověď za ČRS MO Týn nad Vltavou..."
          className="block w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
        />
        
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => handleSave('pending')}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-200 disabled:opacity-50 transition"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Ukládám...' : 'Uložit skrytě'}
          </button>

          <button
            onClick={() => handleSave('answered')}
            disabled={isSaving}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-50 transition"
          >
            <CheckCircle className="w-4 h-4" />
            {isSaving ? 'Ukládám...' : 'Uložit a ZVEŘEJNIT'}
          </button>
        </div>
      </div>
    </div>
  )
}
