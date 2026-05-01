'use client'

import dynamic from 'next/dynamic'
import { useMemo, useRef } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import { createClient } from '@/utils/supabase/client'

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
  const quillRef = useRef<any>(null)
  const supabase = createClient()

  const imageHandler = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files ? input.files[0] : null
      if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `articles/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, file)

        if (uploadError) {
          alert('Chyba při nahrávání obrázku: ' + uploadError.message)
          return
        }

        const { data: { publicUrl } } = supabase.storage
          .from('media')
          .getPublicUrl(filePath)

        const quill = quillRef.current.getEditor()
        const range = quill.getSelection()
        quill.insertEmbed(range.index, 'image', publicUrl)
      }
    }
  }

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
  }), [])

  return (
    <div className="bg-white rounded-md text-gray-900">
      <QuillNoSSRWrapper 
        ref={quillRef}
        modules={modules} 
        theme="snow" 
        value={content} 
        onChange={onChange} 
        className="h-[400px] mb-12"
      />
    </div>
  )
}
