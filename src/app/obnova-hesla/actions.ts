'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  
  const password = formData.get('password') as string
  const passwordConfirm = formData.get('passwordConfirm') as string

  if (!password || !passwordConfirm) {
    redirect('/obnova-hesla?error=Vyplňte obě pole.')
  }

  if (password !== passwordConfirm) {
    redirect('/obnova-hesla?error=Zadaná hesla se neshodují.')
  }

  if (password.length < 6) {
    redirect('/obnova-hesla?error=Heslo musí mít alespoň 6 znaků.')
  }

  // Tímto se zaktualizuje heslo pro uživatele, jehož session právě máme
  // (session byla nastavena záchytným callbackem z odkazu v e-mailu)
  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    console.error('Update password error:', error.message)
    redirect('/obnova-hesla?error=Při ukládání hesla došlo k chybě. Odkaz mohl vypršet.')
  }

  // Pokud je heslo v pořádku změněno, odhlásíme ho (pro jistotu čerstvého přihlášení)
  // nebo ho přesměrujeme do administrace. Lepší je přesměrovat na login s úspěšnou zprávou.
  await supabase.auth.signOut()
  
  redirect('/login?message=Heslo bylo úspěšně změněno. Nyní se můžete přihlásit novým heslem.')
}
