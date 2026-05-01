'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addScheduleEntry(formData: FormData) {
  const supabase = await createClient()

  const date = formData.get('date') as string
  const start_time = formData.get('start_time') as string
  const end_time = formData.get('end_time') as string
  const location = formData.get('location') as string

  const { error } = await supabase
    .from('permit_schedule')
    .insert([{ date, start_time, end_time, location }])

  if (error) throw new Error(error.message)

  revalidatePath('/admin/vydej')
  revalidatePath('/clenstvi/ceny')
}

export async function deleteScheduleEntry(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('permit_schedule')
    .delete()
    .eq('id', id)

  if (error) throw new Error(error.message)

  revalidatePath('/admin/vydej')
  revalidatePath('/clenstvi/ceny')
}
