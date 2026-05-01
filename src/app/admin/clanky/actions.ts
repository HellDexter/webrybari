'use server'

import { requireAdmin } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createArticle(formData: FormData) {
  const { supabase } = await requireAdmin()

  // Generování slug (URL)
  const title = formData.get('title') as string
  const slug = title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

  // Nahrávání úvodní fotky
  let featured_image_url = null
  const coverImage = formData.get('cover_image') as File
  if (coverImage && coverImage.size > 0) {
    const fileExt = coverImage.name.split('.').pop()
    const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const { error: uploadError } = await supabase.storage.from('media').upload(fileName, coverImage)
    if (!uploadError) {
      const { data } = supabase.storage.from('media').getPublicUrl(fileName)
      featured_image_url = data.publicUrl
    }
  }

  // Nahrávání galerie obrázků
  const gallery_urls: string[] = []
  const galleryImages = formData.getAll('gallery_images') as File[]
  for (const file of galleryImages) {
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `articles/gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file)
      if (!uploadError) {
        const { data } = supabase.storage.from('media').getPublicUrl(fileName)
        gallery_urls.push(data.publicUrl)
      }
    }
  }

  const article = {
    title,
    slug,
    content: formData.get('content') as string,
    published: formData.get('published') === 'on',
    category_id: formData.get('category_id') as string || null,
    featured_image_url,
    gallery_urls,
  }

  const { error } = await supabase.from('articles').insert(article)

  if (error) {
    console.error(error)
    return { error: `Chyba při ukládání článku: ${error.message}` }
  }

  revalidatePath('/admin/clanky')
  revalidatePath('/aktuality')
  redirect('/admin/clanky')
}

export async function updateArticle(id: string, formData: FormData) {
  const { supabase } = await requireAdmin()

  // Nahrávání úvodní fotky
  let featured_image_url = null
  const coverImage = formData.get('cover_image') as File
  if (coverImage && coverImage.size > 0) {
    const fileExt = coverImage.name.split('.').pop()
    const fileName = `articles/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const { error: uploadError } = await supabase.storage.from('media').upload(fileName, coverImage)
    if (!uploadError) {
      const { data } = supabase.storage.from('media').getPublicUrl(fileName)
      featured_image_url = data.publicUrl
    }
  }

  // Nahrávání galerie obrázků
  const new_gallery_urls: string[] = []
  const galleryImages = formData.getAll('gallery_images') as File[]
  for (const file of galleryImages) {
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop()
      const fileName = `articles/gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file)
      if (!uploadError) {
        const { data } = supabase.storage.from('media').getPublicUrl(fileName)
        new_gallery_urls.push(data.publicUrl)
      }
    }
  }

  const article: any = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    published: formData.get('published') === 'on',
    category_id: formData.get('category_id') as string || null,
    updated_at: new Date().toISOString()
  }

  if (featured_image_url) {
    article.featured_image_url = featured_image_url
  }

  // Přidáme nové fotky k existující galerii
  if (new_gallery_urls.length > 0) {
    // Získáme stávající článek pro galerii
    const { data: existingArticle } = await supabase.from('articles').select('gallery_urls').eq('id', id).single()
    const currentGallery = existingArticle?.gallery_urls || []
    article.gallery_urls = [...currentGallery, ...new_gallery_urls]
  }

  const { error } = await supabase.from('articles').update(article).eq('id', id)

  if (error) {
    console.error(error)
    return { error: `Chyba při úpravě článku: ${error.message}` }
  }

  revalidatePath('/admin/clanky')
  revalidatePath('/aktuality')
  return { success: true }
}

export async function deleteArticle(id: string) {
  const { supabase } = await requireAdmin()
  
  const { error } = await supabase.from('articles').delete().eq('id', id)

  if (error) {
    return { error: 'Chyba při mazání článku.' }
  }

  revalidatePath('/admin/clanky')
  revalidatePath('/aktuality')
}
