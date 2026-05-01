import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()
  const { data: page } = await supabase
    .from('pages')
    .select('title')
    .eq('slug', resolvedParams.slug)
    .single()

  return {
    title: page ? `${page.title} | ČRS MO Týn nad Vltavou` : 'Stránka nenalezena',
  }
}

import { sanitizeHtml } from '@/utils/security'

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()

  // Získání dat stránky podle slugu v URL
  const { data: page } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  // Pokud stránka neexistuje nebo není publikovaná (a nejsme přihlášení jako admin), vrátí 404
  if (!page || !page.published) {
    notFound()
  }

  const sanitizedContent = sanitizeHtml(page.content || '')

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10 border-b pb-4">
          {page.title}
        </h1>
        
        {/* Vykreslení obsahu z textového editoru. 
            Používáme prose z Tailwindu, aby HTML z TipTap vypadalo hezky. */}
        <div 
          className="prose prose-green prose-lg max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  )
}
