'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function TiptapEditor({ 
  content, 
  onChange 
}: { 
  content: string, 
  onChange: (content: string) => void 
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none min-h-[300px] p-4 border rounded-b-md bg-white',
      },
    },
  })

  if (!editor) {
    return null
  }

  return (
    <div className="w-full">
      {/* Nástrojová lišta */}
      <div className="flex gap-2 border border-b-0 rounded-t-md p-2 bg-gray-50 flex-wrap">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded border ${editor.isActive('bold') ? 'bg-gray-200 font-bold' : 'bg-white font-bold'}`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded border ${editor.isActive('italic') ? 'bg-gray-200 italic' : 'bg-white italic'}`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'bg-white'}`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-2 py-1 rounded border ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'bg-white'}`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-2 py-1 rounded border ${editor.isActive('bulletList') ? 'bg-gray-200' : 'bg-white'}`}
        >
          Seznam
        </button>
      </div>
      
      {/* Samotný editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
