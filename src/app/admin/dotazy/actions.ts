'use server'

import { requireAdmin } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateQuestion(id: string, answerText: string, status: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('questions')
    .update({ 
      answer: answerText, 
      status: status,
      answered_at: new Date().toISOString()
    })
    .eq('id', id)

  if (error) {
    console.error("Supabase Error Update:", error)
    return { error: 'Chyba při ukládání odpovědi.' }
  }

  revalidatePath('/admin/dotazy')
  revalidatePath('/dotazy') // Pro jistotu refreshneme i veřejnou stránku
}

export async function deleteQuestion(id: string) {
  const { supabase } = await requireAdmin()

  const { error } = await supabase
    .from('questions')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: 'Nelze smazat dotaz.' }
  }

  revalidatePath('/admin/dotazy')
}
