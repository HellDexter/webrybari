'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  if (!email) {
    redirect('/zapomenute-heslo?error=Zadejte prosím e-mail.')
  }

  // Posíláme link na náš callback s tím, že po ověření přesměrujeme na /obnova-hesla
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/obnova-hesla`,
  })

  if (error) {
    console.error('Reset password error:', error.message)
    redirect('/zapomenute-heslo?error=Nepodařilo se odeslat e-mail. Zkontrolujte, zda adresa existuje.')
  }

  // Odesláno úspěšně
  redirect('/zapomenute-heslo?message=E-mail s instrukcemi byl úspěšně odeslán. Zkontrolujte si schránku.')
}
