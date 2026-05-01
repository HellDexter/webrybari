import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Calendar } from 'lucide-react'
import PhotoGrid from '@/components/PhotoGrid'
import { sanitizeHtml } from '@/utils/security'

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const supabase = await createClient()
  const resolvedParams = await params

  // Načteme článek podle slugu
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .maybeSingle()

  if (!article || !article.published) {
    notFound()
  }

  const rawContent = article.content ? article.content.replace(/&nbsp;|\u00A0/g, ' ') : ''
  const sanitizedContent = sanitizeHtml(rawContent)

  // Funkce pro opravu cest k obrázkům v textu (pokud chybí plná URL)
  const fixImagePaths = (html: string) => {
    const storageUrl = 'https://vgzxyaqqmjvyzedkrsvr.supabase.co/storage/v1/object/public/media/'
    return html.replace(/<img[^>]+src="([^">]+)"/g, (match, src) => {
      if (!src.startsWith('http') && !src.startsWith('data:')) {
        return match.replace(src, `${storageUrl}${src}`)
      }
      return match
    })
  }

  const finalContent = fixImagePaths(sanitizedContent)

  // Volitelně se pokusíme načíst autora (pokud selže kvůli RLS, nevadí to)
  let authorName = null
  if (article.author_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('first_name, last_name')
      .eq('id', article.author_id)
      .maybeSingle()
    
    if (profile) {
      authorName = `${profile.first_name} ${profile.last_name}`
    }
  }

  return (
    <article className="bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/aktuality" className="inline-flex items-center gap-2 text-sm text-green-600 hover:text-green-700 font-semibold mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Zpět na všechny aktuality
        </Link>
        
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center gap-x-4 text-sm text-gray-500 mb-6">
            <time dateTime={article.created_at} className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.created_at).toLocaleDateString('cs-CZ')}
            </time>
            {authorName && (
              <span className="flex items-center gap-1.5">
                • {authorName}
              </span>
            )}
          </div>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            {article.title}
          </h1>
        </header>

        {article.featured_image_url && (
          <div className="mb-14 overflow-hidden rounded-2xl bg-gray-100 w-full aspect-video shadow-md">
            <img 
              src={article.featured_image_url} 
              alt={article.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div 
          className="prose prose-green prose-img:rounded-xl mx-auto text-gray-700"
          dangerouslySetInnerHTML={{ __html: finalContent }}
        />

        {/* Galerie obrázků k článku */}
        {article.gallery_urls && article.gallery_urls.length > 0 && (
          <div className="mt-16 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Fotogalerie k článku</h3>
            <PhotoGrid 
              photos={article.gallery_urls.map((url: string, index: number) => ({
                id: `article-photo-${index}`,
                image_url: url,
                title: article.title
              }))} 
            />
          </div>
        )}
      </div>
    </article>
  )
}
