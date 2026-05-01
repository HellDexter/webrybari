/**
 * Sanitizuje HTML řetězec pro bezpečné vykreslení.
 * Na serveru (Vercel) se vyhýbáme těžkým knihovnám jako DOMPurify, 
 * které způsobují problémy s ESM/CJS moduly.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return ''
  
  // Odstraníme nebezpečné tagy a atributy pomocí regulárních výrazů
  // pro maximální stabilitu na Vercelu.
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Odstraní scripty
    .replace(/on\w+="[^"]*"/gi, '') // Odstraní event handlery jako onerror, onclick
    .replace(/javascript:/gi, '')   // Odstraní javascript: linky
    
  return sanitized
}
