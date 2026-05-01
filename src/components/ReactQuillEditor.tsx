'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import 'react-quill-new/dist/quill.snow.css'

const QuillNoSSRWrapper = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <div className="h-64 bg-gray-50 flex items-center justify-center text-gray-400">Načítám editor...</div>,
})

export default function ReactQuillEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (val: string) => void 
}) {
  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
    ],
  }), [])

  return (
    <div className="bg-white rounded-md text-gray-900">
      <QuillNoSSRWrapper 
        modules={modules} 
        theme="snow" 
        value={content} 
        onChange={onChange} 
        className="h-[300px] mb-12" // mb-12 is needed because Quill toolbar + content causes overflow issues without margin
      />
    </div>
  )
}
