'use server'

import { requireAdmin } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// --- KATEGORIE ---

export async function createCategory(name: string, slug: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('gallery_categories').insert({ name, slug })
  if (error) return { error: 'Nelze vytvořit kategorii. Slug už možná existuje.' }
  revalidatePath('/admin/fotogalerie/kategorie')
  revalidatePath('/fotogalerie')
}

export async function deleteCategory(id: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase.from('gallery_categories').delete().eq('id', id)
  if (error) return { error: 'Nelze smazat kategorii.' }
  revalidatePath('/admin/fotogalerie/kategorie')
  revalidatePath('/fotogalerie')
}

// --- ALBA ---

export async function createGallery(formData: FormData) {
  const { supabase } = await requireAdmin()
  
  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const category_id = formData.get('category_id') as string
  const event_date = formData.get('event_date') as string

  if (!name || !slug) return { error: 'Název a URL adresa jsou povinné.' }

  const { data, error } = await supabase.from('galleries').insert({
    name,
    slug,
    category_id: category_id || null,
    event_date: event_date || null
  }).select('id').single()

  if (error) {
    console.error(error)
    return { error: 'Nelze vytvořit album. URL už možná existuje.' }
  }

  revalidatePath('/admin/fotogalerie')
  revalidatePath('/fotogalerie')
  
  return { success: true, galleryId: data.id }
}

export async function deleteGallery(id: string) {
  const { supabase } = await requireAdmin()
  
  // 1. Nejprve musíme smazat soubory ze storage
  const { data: photos } = await supabase.from('photos').select('image_url').eq('gallery_id', id)
  
  if (photos && photos.length > 0) {
    const pathsToDelete = photos.map(p => {
      const parts = p.image_url.split('media/')
      return parts.length > 1 ? parts[1] : null
    }).filter(p => p !== null) as string[]

    if (pathsToDelete.length > 0) {
      await supabase.storage.from('media').remove(pathsToDelete)
    }
  }

  // 2. Smažeme album (díky CASCADE v DB se smažou i záznamy fotek)
  const { error } = await supabase.from('galleries').delete().eq('id', id)
  if (error) return { error: 'Nelze smazat album z databáze.' }
  
  revalidatePath('/admin/fotogalerie')
  revalidatePath('/fotogalerie')
  return { success: true }
}

// --- FOTOGRAFIE V ALBU ---

export async function uploadPhotoToGallery(galleryId: string, formData: FormData) {
  const { supabase, user } = await requireAdmin()

  const file = formData.get('file') as File
  const title = formData.get('title') as string

  if (!file || file.size === 0) return { error: 'Nebyl vybrán soubor.' }

  const fileExt = file.name.split('.').pop()
  const fileName = `${galleryId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

  const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file)
  if (uploadError) return { error: 'Chyba při nahrávání do cloudu.' }

  const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName)

  const { error: dbError } = await supabase.from('photos').insert({
    title: title || '',
    image_url: publicUrl,
    uploaded_by: user.id,
    gallery_id: galleryId
  })

  if (dbError) return { error: `Chyba při ukládání do DB: ${dbError.message}` }

  revalidatePath(`/admin/fotogalerie/alba/${galleryId}`)
  revalidatePath(`/fotogalerie/${galleryId}`) // nebo příslušná cesta na webu
}

export async function deletePhoto(photoId: string, imageUrl: string, galleryId: string) {
  const { supabase } = await requireAdmin()

  const { error: dbError } = await supabase.from('photos').delete().eq('id', photoId)
  if (dbError) return { error: 'Nelze smazat záznam z DB.' }

  const urlParts = imageUrl.split('media/')
  if (urlParts.length > 1) {
    const pathInBucket = urlParts[1]
    await supabase.storage.from('media').remove([pathInBucket])
  }

  revalidatePath(`/admin/fotogalerie/alba/${galleryId}`)
  revalidatePath('/fotogalerie')
}

export async function updatePhotoTitle(photoId: string, title: string, galleryId: string) {
  const { supabase } = await requireAdmin()
  const { error } = await supabase
    .from('photos')
    .update({ title })
    .eq('id', photoId)

  if (error) return { error: 'Nelze aktualizovat popisek.' }
  
  revalidatePath(`/admin/fotogalerie/alba/${galleryId}`)
  revalidatePath('/fotogalerie')
  return { success: true }
}
