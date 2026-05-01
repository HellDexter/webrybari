'use server'

import { requireAdmin } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function sendMessage(formData: FormData) {
  const { supabase, user } = await requireAdmin()

  const content = formData.get('content') as string
  const type = formData.get('type') as string || 'message'
  const metadataStr = formData.get('metadata') as string
  
  let metadata = {}
  try {
    if (metadataStr) metadata = JSON.parse(metadataStr)
  } catch (e) {
    console.error("Metadata parse error", e)
  }

  if (!content || content.trim() === '') {
    return { error: 'Zpráva nemůže být prázdná.' }
  }

  const { error } = await supabase
    .from('admin_messages')
    .insert({
      content: content.trim(),
      author_id: user.id,
      type: type,
      metadata: metadata
    })

  if (error) {
    console.error('Error sending message:', error)
    return { error: 'Nepodařilo se odeslat zprávu.' }
  }

  revalidatePath('/admin/komunikace')
  return { success: true }
}

export async function submitVote(messageId: string, voteType: 'yes' | 'no') {
  const { supabase, user } = await requireAdmin()

  // Nejprve získáme stávající zprávu, abychom mohli upravit metadata
  const { data: message, error: fetchError } = await supabase
    .from('admin_messages')
    .select('metadata')
    .eq('id', messageId)
    .single()

  if (fetchError || !message) {
    return { error: 'Zpráva nebyla nalezena.' }
  }

  let metadata = message.metadata || {}
  
  // Inicializace hlasování, pokud neexistuje
  if (!metadata.votes) {
    metadata.votes = { yes: [], no: [] }
  } else {
    // Odstranění předchozího hlasu tohoto uživatele
    metadata.votes.yes = (metadata.votes.yes || []).filter((id: string) => id !== user.id)
    metadata.votes.no = (metadata.votes.no || []).filter((id: string) => id !== user.id)
  }

  // Přidání nového hlasu
  if (voteType === 'yes') {
    metadata.votes.yes.push(user.id)
  } else {
    metadata.votes.no.push(user.id)
  }

  // Uložení zpět
  const { error: updateError } = await supabase
    .from('admin_messages')
    .update({ metadata })
    .eq('id', messageId)

  if (updateError) {
    return { error: 'Nepodařilo se uložit hlas.' }
  }

  revalidatePath('/admin/komunikace')
  return { success: true }
}
