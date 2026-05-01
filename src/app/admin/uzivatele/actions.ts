'use server'

import { requireSuperuser } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function changeUserRole(userId: string, newRole: string) {
  const { supabase } = await requireSuperuser()

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', userId)

  if (error) {
    console.error(error)
    return { error: 'Chyba při změně role.' }
  }

  revalidatePath('/admin/uzivatele')
}
