import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  
  // Zjistíme, odkud byl požadavek přesměrován (tzv. next url, defaultně /)
  const next = requestUrl.searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Pokud se ověření podařilo, přesměrujeme uživatele na požadovanou stránku (např. na obnovu hesla)
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // V případě chyby přesměrujeme na login s chybovou hláškou
  return NextResponse.redirect(new URL('/login?error=Odkaz%20je%20neplatný%20nebo%20vypršel.', request.url))
}
